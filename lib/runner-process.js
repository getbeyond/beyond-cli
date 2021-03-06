'use strict';

let BaseProcess    = require('./base-process');
let bodyParser     = require('body-parser');
let CLIConfig      = require('../lib/config');
let constants      = require('./const');
let cookieParser   = require('cookie-parser');
let express        = require('express');
let fs             = require('fs');
let helmet         = require('helmet');
let http           = require('http');
let https          = require('https');
let methodOverride = require('method-override');
let path           = require('path');
let swig           = require('swig-templates');
let _              = require('lodash');

class RunnerProcess extends BaseProcess {

  constructor(config) {

    super(config);

    this.accessToken = (!!this.config.tokens && !!this.config.tokens.access_token) ?
      this.config.tokens.access_token :
      '';
    this.angularAppData = {
      accountModules : [],
      moduleName     : '',
      ngStrictDi     : false,
      ngController   : ''
    };

    this.appKey = RunnerProcess._parseAppKey(this.rcFile.key);
    this.appTokens = (!!this.config.tokens && !!this.config.tokens.app_tokens) ?
      encodeURIComponent(JSON.stringify(this.config.tokens.app_tokens)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent) :
      '';
    this.expiryToken = (!!this.config.tokens && !!this.config.tokens.expires_in) ?
      this.config.tokens.expires_in :
      '';
    this.httpsOptions = this.config.ssl ?
      {
        cacert : fs.readFileSync(path.join(__dirname, '/ssl/wild.cli.getbeyond.com.cacert')),
        cert   : fs.readFileSync(path.join(__dirname, '/ssl/wild.cli.getbeyond.com.cert')),
        key    : fs.readFileSync(path.join(__dirname, '/ssl/wild.cli.getbeyond.com.key')),
      } :
      null;
    this.isCoreApp = RunnerProcess._isCoreApp(this.appKey);
    this.refreshToken = (!!this.config.tokens && !!this.config.tokens.refresh_token) ?
      this.config.tokens.refresh_token :
      '';
    this.refreshTokenTime = Math.round(new Date().getTime() / 1000);
    this.runAsDev     = this.config.accountType !== constants.ACCT_TYPE_CUSTOMER;
    this.renderConfig = {
      BeyondApp     : {
        accountId         : this.config.accountId
          || (
            this.config.accounts.length &&
            this.config.accounts[0] &&
            this.config.accounts[0].id
          ) || null,
        angular           : this.angularAppData,
        appPath           : (!this.isCoreApp ? 'apps/' : '') + this.appKey,
        api               : {
          checkoutApiUrl    : this.config.checkoutApiUrl, // !!! deprecated
          checkoutClientUrl : this.config.checkoutClientUrl, // !!! deprecated
          hubURL            : this.config.hubUrl, // !!! deprecated
          payrollApiUrl     : this.config.payrollApiUrl, // !!! deprecated
          url               : this.config.apiBaseUrl,
          version           : 'v1'
        },
        // externalConfigs are exposed 1:1 on FE, they shouldn't contain any private keys etc
        externalConfigs: Object.assign({
          // segment key is not private
          analytics: {
            segment: {
              key: this.config.segmentApiKey
            }
          },
          checkoutApi: {
            functionUrl: this.config.checkoutFunctionUrl,
            url: this.config.checkoutApiUrl,
            storeUrl: this.config.checkoutClientUrl
          },
          payrollApi: {
            url: this.config.payrollApiUrl
          },
          posApi: {
            url: this.config.hubUrl
          },
          sellerDemoAccounts: [6156],
          sellerAccounts: [6139]
        }, this.config.externalConfigs),
        session           : {
          development                  : this.runAsDev,
          adminCookieName              : 'beyond_admin_sid',
          adminRefreshCookieName       : 'beyond_admin_refresh_sid',
          adminExpiryCookieName        : 'beyond_admin_expiry_sid',
          cookieName                   : 'beyond_sid',
          refreshCookieName            : 'beyond_sid_ref',
          expiryCookieName             : 'beyond_sid_expiry',
          sessionRefreshTimeCookieName : 'beyond_sid_ref_time',
          sessionAppKeysCookieName     : 'beyond_app_keys',
          sessionAppTokenCookieName    : 'beyond_app_token',
          sessionAppTokensCookieName   : 'beyond_app_tokens',
          userSaveCookieName           : 'beyond_user',
          devCookieName                : 'beyond_dev_sid',
          sessionRefreshTimeout        : 7200,
          // payments, schedule, team, log, inventory, recipes, forecast, pos hub, acct sync, netchex, analytics
          defaultAppsOrder             : [235, 181, 62, 163, 203, 204, 180, 64, 284, 220, 205],
          mobileApp                    : null, // Mobile app info will be populated in buildConfig()
          segmentApiKey                : this.config.segmentApiKey // !!! deprecated
        }
      },
      accounts          : this.config.accounts,
      appKey            : this.appKey,
      host              : this.config.host,
      port              : this.config.port,
      protocol          : this.config.ssl ? 'https' : 'http',
      serveDist         : this.config.serveDist,
      watchSocket       : this.framework === constants.ANGULAR && this.config.watch,
      tokenAccess       : this.accessToken,
      tokenApps         : this.appTokens,
      tokenExpiry       : this.expiryToken,
      tokenRefresh      : this.refreshToken,
      tokenRefreshTime  : this.refreshTokenTime
    };

    switch (this.framework) {
      case constants.ANGULARJS :
        this.angularAppData.moduleName = _.get(this.rcFile.framework, ['angular', 'module']);
        break;
      case constants.ANGULAR :
        this.angularAppData = {
          accountModules : [],
          moduleName     : _.get(this.rcFile.framework, ['angular5', 'module']),
          rootSelector   : _.get(this.rcFile.framework, ['angular5', 'root_selector'])
        };
        break;
      default:
        break;
    };

    this.renderConfig.BeyondApp.angular = this.angularAppData;

  }

  createCommonExpressApp() {
    const expressApp = express();

    expressApp.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    // Set swig as the template engine
	  expressApp.engine('html', swig.renderFile);

    // Set views path and view engine
  	expressApp.set('view engine', 'html');
  	expressApp.set('views', __dirname + '/templates');
    expressApp.set('view cache', false);

    // Request body parsing middleware should be above methodOverride
  	expressApp.use(bodyParser.urlencoded({extended: true}));
  	expressApp.use(bodyParser.json());
    expressApp.use(methodOverride());

    // Use helmet to secure Express headers
    // loosen csp as much as possible - simply turn off
    // expressApp.use(helmet.contentSecurityPolicy());
    expressApp.use(helmet.dnsPrefetchControl());
    expressApp.use(helmet.expectCt());
    expressApp.use(helmet.frameguard());
    expressApp.use(helmet.hidePoweredBy());
    expressApp.use(helmet.hsts());
    expressApp.use(helmet.ieNoOpen());
    expressApp.use(helmet.noSniff());
    expressApp.use(helmet.permittedCrossDomainPolicies());
    expressApp.use(helmet.referrerPolicy());
    expressApp.use(helmet.xssFilter());

    expressApp.disable('x-powered-by');

    // CookieParser should be above session
    expressApp.use(cookieParser());

    return expressApp;
  }

  createExpressRunnerApp() {

    const expressApp = this.createCommonExpressApp();

    swig.setDefaults({ cache: false });

    if (this.runAsDev && this.framework === constants.ANGULAR) {

      expressApp.use(
        `/preview/accounts/:accountId${!this.isCoreApp ? '/apps' : ''}`,
        express.static(path.resolve(process.cwd() + '/' + this.config.distDir))
      );

    } else if (this.framework === constants.ANGULAR) {

      expressApp.use(
        `/accounts/:accountId${!this.isCoreApp ? '/apps' : ''}`,
        express.static(path.resolve(process.cwd() + '/' + this.config.distDir))
      );

    }

    // Setup Routes
    expressApp.get('/', (req, res) => { res.render('runner', this.buildConfig(this.renderConfig, req)); });

    expressApp.get('/accounts/:accountId', (req, res) => {
      res.render('runner', this.buildConfig(this.renderConfig, req));
    });

    expressApp.get('/accounts/:accountId/*', (req, res) => {
      res.render('runner', this.buildConfig(this.renderConfig, req));
    });

    expressApp.get('/preview/accounts/:accountId', (req, res) => {
      res.render('runner', this.buildConfig(this.renderConfig, req));
    });

    expressApp.get('/preview/accounts/:accountId/*', (req, res) => {
      res.render('runner', this.buildConfig(this.renderConfig, req));
    });

    expressApp.get('/marketing/links', (req, res) => {
      res.send([]);
    });

    expressApp.use(express.static(path.resolve(__dirname + '/public')));

    // in serve dist mode we serve static, already built app files
    // from dist folder, so we need to set up couple additional routes
    // in runner express app
    if (this.config.serveDist) {

      let renderConfigClone = _.cloneDeep(this.renderConfig);
      let view = this.appKey === constants.APP_KEY_ANALYTICS ?
        constants.TEMPLATE_IFRAME_ANALYTICS :
        (this.framework === constants.ANGULAR ? constants.TEMPLATE_IFRAME_ANGULAR : constants.TEMPLATE_IFRAME_ANGULARJS);

      expressApp.get(`/runner/accounts/:accountId${!this.isCoreApp ? '/apps' : ''}/:appKey`, (req, res) => {
        res.render(view, this.buildConfig(renderConfigClone, req));
      });

      expressApp.get(`/runner/preview/accounts/:accountId${!this.isCoreApp ? '/apps' : ''}/:appKey`, (req, res) => {
        res.render(view, this.buildConfig(renderConfigClone, req));
      });

      expressApp.use(express.static(path.resolve(process.cwd() + '/' + this.config.distDir)));

    }

    return expressApp;

  }

  createWebpackDevServer(parentExpressRunnerApp = null) {

    const DevProcess = require('./dev-process'),
      findPort   = require('find-port');

    return new Promise((resolve) => {
      if (this.config.devPort) {
        return resolve([this.config.devPort]);
      }

      return findPort(
        this.config.host,
        this.config.port + 1,
        this.config.port + 100,
        resolve
      );
    })
      .then((ports) => {
        this.config.setDevPort(ports[0]);

        // set up proxy on parent express app (if any)
        // all requests for the app assets will be forwarded to
        // webpack dev server
        if (parentExpressRunnerApp) {

          const httpProxy = require('http-proxy'),
            proxy = httpProxy.createProxyServer(),
            runnerPath = `/runner${this.runAsDev ? '/preview' : ''}` +
              `/accounts/:accountId${!this.isCoreApp ? '/apps' : ''}/:appKey`;

          parentExpressRunnerApp.get(runnerPath, (req, res) => {
            proxy.web(req, res, {
              secure : false,
              ssl    : this.config.ssl ?
                {
                  key    : this.httpsOptions.key,
                  cert   : this.httpsOptions.cert
                }:
                null,
              target : `http${this.config.ssl ? 's': ''}://${this.config.host}:${this.config.devPort}`
            });
          });

          proxy.on('error', function(e) {
            console.error(e);
            console.error('Could not connect to proxy, please try again...');
          });

        }

        const devConfig = new CLIConfig(this.config.originalParams);

        devConfig.setDevPort(ports[0]);
        devConfig.setAccounts(this.config.accounts);
        devConfig.setTokens(this.config.tokens);

        // create dev server
        return new DevProcess(devConfig);
      });

  }

  start() {

    let expressApp = null;
    let optionalWebpackDevServerPromise = Promise.resolve.bind(Promise, null);

    // all apps, besides special web2 app, need top frame server,
    // so set up express app for these
    if (this.appKey !== constants.APP_KEY_WEB2) {
      expressApp = this.createExpressRunnerApp();
    }

    // if not in serve mode, we need to set up webpack dev server too
    if (!this.config.serveDist) {
      optionalWebpackDevServerPromise = this.createWebpackDevServer.bind(this, expressApp)
    }

    return optionalWebpackDevServerPromise()
      .then((devServer) => {
        let server = null;

        // if top frame server is required (express app exists), set it up
        // and run
        if (expressApp) {
          server = this.config.ssl ?
            https.createServer(this.httpsOptions, expressApp) :
            http.createServer(expressApp);

          server.listen(this.config.port, this.config.host);
        }

        // if webpack dev server is required (devServer instance exists),
        // run it (pass optional top frame server instance to it)
        // dev server shows on start message on its own
        if (devServer) {
          devServer.start(server);
        // otherwise we only show on start message
        } else {
          RunnerProcess._onStartMessage(
            `Distribution Server: http${this.config.ssl ? 's': ''}://` +
              `${this.config.requestedHost}:${this.config.port} ` +
              `(Environment: ${this.config.env})`
          );
        }

        return [server, devServer];
      });
  }

  static _isCoreApp(appKey = '') {
    return constants.CORE_APP_KEYS.indexOf(appKey) !== -1;
  }

  static _onStartMessage(message = '') {

    console.info('--------------------------------------------------------------------');
    console.info(message);
    console.info('--------------------------------------------------------------------');

  }

  /**
   * Has to check if given app key doesnt stand for v3 core app, if so - return app key without 'core_'
   * @param {string} [originalAppKey='']
   */
  static _parseAppKey(originalAppKey = '') {

    if (
      originalAppKey.startsWith(constants.V3_CORE_APP_KEY_PREFIX) &&
      constants.CORE_APP_KEYS.indexOf(originalAppKey.replace(constants.V3_CORE_APP_KEY_PREFIX, '')) !== -1
    ) {
      return originalAppKey.replace(constants.V3_CORE_APP_KEY_PREFIX, '');
    }

    return originalAppKey;

  }

  buildConfig(config, req){
    config.isCordova = req.get('User-Agent').includes('Beyond');
    config.cordovaPlatform = req.get('User-Agent').includes('ios') ? 'ios' : 'android';
    config.BeyondApp.session.mobileApp = config.isCordova ?
      {branding: 'PeachWorks', system: config.cordovaPlatform} :
      null;
    return config;
  }

}

module.exports = RunnerProcess;
