# Nesting Tiles!

##Features:

* A system of tiles that can be created and nested ad infinitum
* Hover over a tile to quickly bring up controls to 'Insert' content into a tile, to 'Delete' a tile, or to add a new pane via 'Split Vertical' or 'Split Horizontal'
* Right click on a tile to bring the context menu
    * Insert a new tile in any specific direction
    * If a tile already has a Youtube video, Website, or Photo in the background, you can delete the content without deleting the tile
    * If a tile is not the root tile, you can also delete the tile using this menu
* Click on the insert icon to add a Youtube video, Photo (from the internet or your local filesystem), or a Website
    * Files from your local filesystem should begin with 'file://'
* Click and drag on the edges of the tiles to resize them


## Known Issues

* If you add a Youtube Video or website to a Tile component, then in order to remove the content, you have to hover over that tile and right-click on one of the icons that appear in the middle of the Tile (aka the HoverMenu). Ideally, you should be allowed to right click anywhere in the Tile.
* If you try to insert content into a tile that is near the very bottom or the very right side of the page, in some circumstances this will cause the page width and/or height to grow a little. So, the user may have to scroll in order to see the whole popup. This is not a breaking feature, just a minor nuisance. To fix this, you might have to modify the <Popover /> component (from 'react-bootstrap/lib/Overlay').


## Roadmap

* Make it mobile friendly
    * Instead of showing the HoverMenu on hover, it should be shown onClick for the Tile component
    * In addition to showing the context menu on right click events, you should show the context menu on two finger tags
* Support dragging and dropping panes to reorganize them easily


# How to Build

##Install dependences
 * Install node v4.x or greater
 * Type `npm install` to install node modules


##Basic Commands
 * Type `npm start` to start development in your default browser.
    files matching '**/*.spec.js' in your project
 * Type `npm run build` to build for production

## How to run pre-built files in dist/ directory
 * Make sure you have python installed
 * Go to the dist directory inside this project: `cd dist/`
 * Start a webserver: `python -m SimpleHTTPServer`
 * On OSX you will see a prompt asking you allow Python.app to accept incoming connections. Click 'Allow'
 * Navigate to [http://localhost:8000/index.html](http://localhost:8000/index.html) in your favorite browser



For more info on this development setup, see the exerpted README from https://github.com/coryhouse/react-slingshot below

...


Built using the React Slingshot skeleton (https://github.com/coryhouse/react-slingshot). The following is copied from the React Slingshot project's README

# React Slingshot!

[![Build status: Linux](https://img.shields.io/travis/coryhouse/react-slingshot.svg?style=flat-square)](https://travis-ci.org/coryhouse/react-slingshot)
[![Build status: Windows](https://ci.appveyor.com/api/projects/status/ky0npqkot20ieiak?svg=true)](https://ci.appveyor.com/project/coryhouse/react-slingshot/branch/master)
[![Dependency Status](https://david-dm.org/coryhouse/react-slingshot.svg?style=flat-square)](https://david-dm.org/coryhouse/react-slingshot)
[![Coverage Status](https://coveralls.io/repos/github/coryhouse/react-slingshot/badge.svg?branch=master)](https://coveralls.io/github/coryhouse/react-slingshot?branch=master)

React Slingshot is a comprehensive starter kit for rapid application development using React. 

Why Slingshot?

1. **One command to get started** - Type `npm start` to start development in your default browser.
2. **Rapid feedback** - Each time you hit save, changes hot reload and linting and automated tests run.
3. **One command line to check** - All feedback is displayed on a single command line.
4. **No more JavaScript fatigue** - Slingshot uses the most popular and powerful libraries for working with React.
5. **Working example app** - The included example app shows how this all works together.
6. **Automated production build** - Type `npm run build` to do all this:

[![React Slingshot Production Build](https://img.youtube.com/vi/qlfDLsX-J0U/0.jpg)](https://www.youtube.com/watch?v=qlfDLsX-J0U)

##Initial Machine Setup
1. **Install [Node 4.0.0 or greater](https://nodejs.org)** - (5.0 or greater is recommended for optimal build performance). Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm).
2. **Install [Git](https://git-scm.com/downloads)**. 
3. On a Mac? You're all set. If you're on Linux or Windows, complete the steps for your OS below.  
 
**On Linux:**  

 * Run this to [increase the limit](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) on the number of files Linux will watch. [Here's why](https://github.com/coryhouse/react-slingshot/issues/6).    
`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p` 

**On Windows:** 
 
* **Install [Python 2.7](https://www.python.org/downloads/)**. Some node modules may rely on node-gyp, which requires Python on Windows.
* **Install C++ Compiler**. Browser-sync requires a C++ compiler on Windows. [Visual Studio Express](https://www.visualstudio.com/en-US/products/visual-studio-express-vs) comes bundled with a free C++ compiler. Or, if you already have Visual Studio installed: Open Visual Studio and go to File -> New -> Project -> Visual C++ -> Install Visual C++ Tools for Windows Desktop. The C++ compiler is used to compile browser-sync (and perhaps other Node modules).

##Technologies
Slingshot offers a rich development experience using the following technologies:

| **Tech** | **Description** |**Learn More**|
|----------|-------|---|
|  [React](https://facebook.github.io/react/)  |   Fast, composable client-side components.    | [Pluralsight Course](https://www.pluralsight.com/courses/react-flux-building-applications)  |
|  [Redux](http://redux.js.org) |  Enforces unidirectional data flows and immutable, hot reloadable store. Supports time-travel debugging. Lean alternative to [Facebook's Flux](https://facebook.github.io/flux/docs/overview.html).| [Pluralsight Course](http://www.pluralsight.com/courses/react-redux-react-router-es6)    |
|  [React Router](https://github.com/reactjs/react-router) | A complete routing library for React | [Pluralsight Course](https://www.pluralsight.com/courses/react-flux-building-applications) |
|  [Babel](http://babeljs.io) |  Compiles ES6 to ES5. Enjoy the new version of JavaScript today.     | [ES6 REPL](https://babeljs.io/repl/), [ES6 vs ES5](http://es6-features.org), [ES6 Katas](http://es6katas.org), [Pluralsight course](https://www.pluralsight.com/courses/javascript-fundamentals-es6)    |
| [Webpack](http://webpack.github.io) | Bundles npm packages and our JS into a single file. Includes hot reloading via [react-transform-hmr](https://www.npmjs.com/package/react-transform-hmr). | [Quick Webpack How-to](https://github.com/petehunt/webpack-howto) [Pluralsight Course](https://www.pluralsight.com/courses/webpack-fundamentals)|
| [Browsersync](https://www.browsersync.io/) | Lightweight development HTTP server that supports synchronized testing and debugging on multiple devices. | [Intro vid](https://www.youtube.com/watch?time_continue=1&v=heNWfzc7ufQ)|
| [Mocha](http://mochajs.org) | Automated tests with [Chai](http://chaijs.com/) for assertions and [Enzyme](https://github.com/airbnb/enzyme) for DOM testing without a browser using Node. | [Pluralsight Course](https://www.pluralsight.com/courses/testing-javascript) |
| [Isparta](https://github.com/douglasduteil/isparta) | Code coverage tool for ES6 code transpiled by Babel. | 
| [TrackJS](https://trackjs.com/) | JavaScript error tracking. | [Free trial](https://my.trackjs.com/signup)|  
| [ESLint](http://eslint.org/)| Lint JS. Reports syntax and style issues. Using [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) for additional React specific linting rules. | |
| [SASS](http://sass-lang.com/) | Compiled CSS styles with variables, functions, and more. | [Pluralsight Course](https://www.pluralsight.com/courses/better-css)|
| [PostCSS](https://github.com/postcss/postcss) | Transform styles with JS plugins. Used to autoprefix CSS |
| [Editor Config](http://editorconfig.org) | Enforce consistent editor settings (spaces vs tabs, etc). | [IDE Plugins](http://editorconfig.org/#download) |
| [npm Scripts](https://docs.npmjs.com/misc/scripts)| Glues all this together in a handy automated build. | [Pluralsight course](https://www.pluralsight.com/courses/npm-build-tool-introduction), [Why not Gulp?](https://medium.com/@housecor/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.vtaziro8n)  |
