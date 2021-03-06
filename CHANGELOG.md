<a name="1.6.4"></a>
# [1.6.4](https://github.com/getbeyond/beyond-cli/compare/v1.6.3...v1.6.4) (2021-01-27)

### Features
* Updated dependencies
* Removed eslint config - external module will provide default rules
* Updates required to run cli in docker

<a name="1.6.3"></a>
# [1.6.3](https://github.com/getbeyond/beyond-cli/compare/v1.6.2...v1.6.3) (2021-01-19)

### Bug Fixes
* Fixed issues with running apps local ng script on windows.

<a name="1.6.2"></a>
# [1.6.2](https://github.com/getbeyond/beyond-cli/compare/v1.6.1...v1.6.2) (2021-01-11)

### Bug Fixes
* Fixed problem with modules not found by webpack for web2 app

<a name="1.6.1"></a>
# [1.6.1](https://github.com/getbeyond/beyond-cli/compare/v1.6.0...v1.6.1) (2021-01-07)

### Bug Fixes
* Dev command fixes

<a name="1.6.0"></a>
# [1.6.0](https://github.com/getbeyond/beyond-cli/compare/v1.5.17...v1.6.0) (2021-01-07)

### Features
* New param for dev/serve commands --dist-dir;
* New param for test command --coverage-dir;
* Updated to webpack v5 - now supports node v12 and node v14

### Bug Fixes
* Dev command --dev-port param fixed

<a name="1.5.17"></a>
# [1.5.17](https://github.com/getbeyond/beyond-cli/compare/v1.5.16...v1.5.17) (2020-09-25)

### Features
* New param for dev/serve commands --external-configs;
* Defaults for seller accounts and seller demo accounts.

<a name="1.5.16"></a>
# [1.5.16](https://github.com/getbeyond/beyond-cli/compare/v1.5.15...v1.5.16) (2020-09-22)

### Features
* Updated dependencies, new param for dev/serve commands --checkout-function-url

<a name="1.5.15"></a>
# [1.5.15](https://github.com/getbeyond/beyond-cli/compare/v1.5.14...v1.5.15) (2020-09-16)

### Features
* Updated Cordova libs to support Beyond One IOS app v1.2.7;

<a name="1.5.14"></a>
# [1.5.14](https://github.com/getbeyond/beyond-cli/compare/v1.5.13...v1.5.14) (2020-08-25)

### Features
* Added `--payroll-api-url [value]` option for `beyond serve`, `beyond dev` and `beyond report` commands
* app-runner v1.2.9, web-router v1.2.8

<a name="1.5.13"></a>
# [1.5.13](https://github.com/getbeyond/beyond-cli/compare/v1.5.12...v1.5.13) (2020-08-13)

### Features
* Updated `beyond report` command params - can pass checkout api/store urls

<a name="1.5.12"></a>
# [1.5.12](https://github.com/getbeyond/beyond-cli/compare/v1.5.11...v1.5.12) (2020-08-12)

### Bug Fixes
* Fixed issues with marketplace directive

<a name="1.5.11"></a>
# [1.5.11](https://github.com/getbeyond/beyond-cli/compare/v1.5.10...v1.5.11) (2020-07-30)

### Features
* Added `--checkout-api-url [value]`, `--checkout-client-url [value]` and `--hub-url [value]` option for `beyond serve` and `beyond dev` commands
* app-runner v1.2.7, web-router v1.2.7

<a name="1.5.10"></a>
# [1.5.10](https://github.com/getbeyond/beyond-cli/compare/v1.5.9...v1.5.10) (2020-06-19)

### Features
* Added Cordova support and mobile detection (correct value on `beyond.session.mobileApp`);
* Added a favicon.

<a name="1.5.9"></a>
# [1.5.9](https://github.com/getbeyond/beyond-cli/compare/v1.5.8...v1.5.9) (2020-01-21)

### Features
* Added `--segment-key [value]` option for `beyond serve` and `beyond dev` for tracking Segment events
* app-runner v1.2.1, web-router v1.2.1

<a name="1.5.8"></a>
# [1.5.8](https://github.com/getbeyond/beyond-cli/compare/v1.5.7...v1.5.8) (2019-12-12)

### Features
* app-runner v1.1.28, web-router v1.1.17

<a name="1.5.7"></a>
# [1.5.7](https://github.com/getbeyond/beyond-cli/compare/v1.5.6...v1.5.7) (2019-11-04)

### Features
* Add 'track' method to fake Analytics object.

<a name="1.5.6"></a>
# [1.5.6](https://github.com/getbeyond/beyond-cli/compare/v1.5.5...v1.5.6) (2019-10-31)

### Features
* app-runner v1.1.27, web-router v1.1.16

<a name="1.5.5"></a>
# [1.5.5](https://github.com/getbeyond/beyond-cli/compare/v1.5.4...v1.5.5) (2019-07-23)

### Breaking Changes
* Updated impersonation - removed support for `-t [refresh_token]` option

<a name="1.5.4"></a>
# [1.5.4](https://github.com/getbeyond/beyond-cli/compare/v1.5.3...v1.5.4) (2019-07-18)

### Features
* beyond-js-web-router v1.1.13 for angular 2+

<a name="1.5.3"></a>
# [1.5.3](https://github.com/getbeyond/beyond-cli/compare/v1.5.2...v1.5.3) (2019-06-05)

### Bug Fixes
* Setting all required cookie names in runner template

<a name="1.5.2"></a>
# [1.5.2](https://github.com/getbeyond/beyond-cli/compare/v1.5.1...v1.5.2) (2019-06-05)

### Features
* Updated core libraries
* Listening for history.replaceState calls form ng5+ apps and propagating it to parent frame using custom event

<a name="1.5.1"></a>
# [1.5.1](https://github.com/getbeyond/beyond-cli/compare/v1.5.0...v1.5.1) (2019-04-17)

### Features
* Updated libraries

<a name="1.5.0"></a>
# [1.5.0](https://github.com/getbeyond/beyond-cli/compare/v1.4.10...v1.5.0) (2019-04-05)

### Features
* beyond query
* beyond imp and --imp


<a name="1.4.10"></a>
# [1.4.10](https://github.com/getbeyond/beyond-cli/compare/v1.4.9...v1.4.10) (2019-03-15)

### Features
* Updated libraries

<a name="1.4.9"></a>
# [1.4.9](https://github.com/getbeyond/beyond-cli/compare/v1.4.8...v1.4.9) (2019-03-11)

### Features
* Updated libs

<a name="1.4.8"></a>
# [1.4.8](https://github.com/getbeyond/beyond-cli/compare/v1.4.7...v1.4.8) (2019-02-12)

### Features
* Fixed the tokens issue with the `proxy` command

<a name="1.4.7"></a>
# [1.4.7](https://github.com/getbeyond/beyond-cli/compare/v1.4.6...v1.4.7) (2019-02-01)

### Features
* Full Core Launch app support - updated app runner
* Session autorefresh - updated web router
* Ng5 apps builds will from now on produce additional vendor and common chunks (if needed)

<a name="1.4.6"></a>
# [1.4.6](https://github.com/getbeyond/beyond-cli/compare/v1.4.5...v1.4.6) (2019-01-07)

 ### Features
* New command `proxy` which you can develop apps using the standard tool with, as shown [here](https://github.com/getbeyond/beyond-cli/pull/5#issuecomment-438664560)

<a name="1.4.5"></a>
# [1.4.5](https://github.com/getbeyond/beyond-cli/compare/v1.4.5-beta.0...v1.4.5) (2018-11-28)

### Features
* Added support for node debugger in reports

<a name="1.4.5-beta.0"></a>
# [1.4.5-beta.0](https://github.com/getbeyond/beyond-cli/compare/v1.4.4...v1.4.5-beta.0) (2018-11-27)

### Features
* Added Core Launch app support

<a name="1.4.4"></a>
# [1.4.4](https://github.com/getbeyond/beyond-cli/compare/v1.4.3...v1.4.4) (2018-11-19)

### Features
* Change --output-hashing to media

<a name="1.4.3"></a>
# [1.4.3](https://github.com/getbeyond/beyond-cli/compare/v1.4.2...v1.4.3) (2018-10-19)

### Features
* beyond-js-web-router v1.0.16, beyond-css v1.0.17, ng-js-beyond-app-runner v1.0.22, updated deps

<a name="1.4.2"></a>
# [1.4.2](https://github.com/getbeyond/beyond-cli/compare/v1.4.1...v1.4.2) (2018-09-17)

### Features
* beyond-js-web-router v1.0.8, beyond-css v1.0.9, ng-js-beyond-app-runner v1.0.14

<a name="1.4.1"></a>
# [1.4.1](https://github.com/getbeyond/beyond-cli/compare/v1.4.0...v1.4.1) (2018-09-13)

### Features
* beyond-js-web-router v1.0.7, beyond-css v1.0.8, ng-js-beyond-app-runner v1.0.12

<a name="1.4.0"></a>
# [1.4.0](https://github.com/getbeyond/beyond-cli/compare/v1.3.0...v1.4.0) (2018-09-12)

### Features
* Added full support of v3 core apps and updated with latest versions of app runner, web router and beyond-css

<a name="1.3.0"></a>
# [1.3.0](https://github.com/getbeyond/beyond-cli/compare/v1.2.1...v1.3.0) (2018-08-17)

### Features
* Added config class, showing used env when running a server - staging env is now default for customer mode

<a name="1.2.1"></a>
# [1.2.1](https://github.com/getbeyond/beyond-cli/compare/v1.2.0...v1.2.1) (2018-08-10)

### Breaking Changes
* web-beyond-js-web-router v1.0.3

<a name="1.2.0"></a>
# [1.2.0](https://github.com/getbeyond/beyond-cli/compare/v1.1.0...v1.2.0) (2018-07-27)

### Features
* Added support for legacy apps development (ngPeach based ngJs 1.4 apps)

<a name="1.1.0"></a>
# [1.1.0](https://github.com/getbeyond/beyond-cli/compare/v1.0.5...v1.1.0) (2018-07-16)

### Features
* Added ability to use environment variable (BEYOND_KEY) to pass Beyond key file

### Breaking Changes
* No changes

### Bug Fixes
* Beyond key file path now supports `~` as home dir

<a name="1.0.5"></a>
# [1.0.5](https://github.com/getbeyond/beyond-cli/compare/v1.0.4...v1.0.5) (2018-07-06)

### Features
* No new features

### Breaking Changes
* ng-js-beyond-app-runner v1.0.3
* web-beyond-js-web-router v1.0.1

### Bug Fixes
* No fixes

<a name="1.0.4"></a>
# [1.0.4] (2018-07-06)

### Features
* No new features

### Breaking Changes
* No changes

### Bug Fixes
* Fixed: recognize properly provided params for report

<a name="1.0.3"></a>
# [1.0.3](https://github.com/getbeyond/beyond-cli/compare/v1.0.2...v1.0.3) (2018-07-02)

### Features
* No new features

### Breaking Changes
* ng-js-beyond-app-runner v1.0.2

### Bug Fixes
* Fixed issues with dependancies auto-check for `beyond build` command

<a name="1.0.2"></a>
# [1.0.2](https://github.com/getbeyond/beyond-cli/compare/v1.0.1...v1.0.2) (2018-06-28)

### Features
* No new features

### Breaking Changes
* No breaking changes

### Bug Fixes
* Fixed CORS issue in `beyond dev` mode

<a name="1.0.1"></a>
# [1.0.1](https://github.com/getbeyond/beyond-cli/compare/v1.0.0...v1.0.1) (2018-06-26)

### Features
* No new features

### Breaking Changes
* Rebranding step 2

### Bug Fixes
* No bug fixes

<a name="1.0.0"></a>
# 1.0.0 (2018-06-20)

### Features
* **initial-release:** Created package from Peach-CLI v1.3.12, rebranded for Beyond
