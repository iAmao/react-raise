# react-raise
[![Coverage Status](https://coveralls.io/repos/github/andela-iamao/react-raise/badge.svg)](https://coveralls.io/github/andela-iamao/react-raise) [![Build Status](https://travis-ci.org/andela-iamao/react-raise.svg?branch=master)](https://travis-ci.org/andela-iamao/react-raise) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/andela-iamao/react-raise/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/andela-iamao/react-raise/?branch=master) [![npm version](https://badge.fury.io/js/react-raise.svg)](https://badge.fury.io/js/react-raise)

A cli kit for creating react applications

### Why use this?
---
react-raise takes away the stress of setting up a react project by bootstraping files and directories you need to get started.

react-raise,
- Initializes your project with es6
- Creates a package.json file and installs all required dependencies
- Creates a webpack file and configures it to:
    - Transpile and compile es6 to es5
    - Compile .js/.jsx
    - Compile .scss/.css
    - Compile .less
- Configures your app such that you are able to use the @ decorators and spread operators
- Set up your react app with the redux architecture
- Uses react-router to setup your app routing
- Configures your test environment

So basically, you can get up an running on your react project in about 10 seconds.

### How to install
---
Open your terminal and type the following
```
$ npm install -g react-raise
$ #test installation
$ raise new <app-name>
$ npm install
$ npm run test:frontend
$ # If you initialized with express
$ node <entry.js>
$ # Else
$ npm run start-dev
```

### Contributing
---

The main purpose of this project is to automate creation of react applicatons to some extent and reduce development time
If you feel that you can add value or fix bugs that may pop up in this project, then react-raise would be forever
grateful for your contribution.
Read on below to learn how you can take part in improving react-raise

#### Code of Conduct

react-raise has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](CONTRIBUTOR_CONVENANT.md) so that you can understand what actions will and will not be tolerated.

#### Contributing Guide

Read our [contributing guide](CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to react-raise.


#### LICENSE
---

react-raise is licensed under the [MIT](LICENSE) license.