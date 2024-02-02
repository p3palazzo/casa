/****************
 * Filters {{{1 *
 ****************/
// First create variables that require() any packages we need
// const plugin = require('some-eleventy-plugin-package')
// const sassPlugin = require('eleventy-plugin-sass');
/********************************
 * eleventyConfig function {{{1 *
 ********************************/
// Use module.exports to export a configuration funcion.
// This is a standard function in Node.js projects
module.exports = function(eleventyConfig) {
  // Run any code needed including built-in 11ty methods
 /*************************
  * Passthrough copy {{{2 *
  *************************/
  // Copy assets/ to _site/assets
  eleventyConfig.addPassthroughCopy("assets");
  // emulate passthrough during --serve:
  //eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
 /*************************
  * Activate plugins {{{2 *
  *************************/
  /*
   *eleventyConfig.addPlugin(sassPlugin, {
   *  watch: ['assets/css/*.scss'],
   *  outputDir: '_site/assets/css',
   *});
   */
 /********************
  * Setup views {{{2 *
  ********************/
  /*
   *eleventyConfig.addCollection("obras", function(collection) {
   *  return collection.getFilteredByGlob("src/obra/*.md");
   *});
   */
 /*******************************************************
  * Return is the last instruction to be evaluated {{{2 *
  *******************************************************/
  // If needed, return an object configuration
  return {
    // Options here
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes'
    }
  }
}
// vim: foldmethod=marker shiftwidth=2 tabstop=2
