// This file configures a web server for testing the production build
// on your local machine.
import {chalkProcessing} from './chalkConfig';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';

/* eslint-disable no-console */

console.log(chalkProcessing('Opening production build...'));

// Run Browsersync
browserSync({
  'port': 3000,
  'ui': {
    'port': 3001
  },
  'server': {
    'baseDir': 'dist'
  },

  'files': [
    'src/*.html'
  ],

  'middleware': [historyApiFallback()]
});
