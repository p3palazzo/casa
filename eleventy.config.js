/****************
 * Filters {{{1 *
 ****************/
// First create variables that require() any packages we need
// const plugin = require('some-eleventy-plugin-package')
const Image = require("@11ty/eleventy-img");
const EleventyFetch = require("@11ty/eleventy-fetch");
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');
const path = require('path');
const Pandoc = require("markdown-it-pandoc");
const eleventyCiteproc = require("eleventy-plugin-citeproc");
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const htmlmin = require("html-minifier");
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
	/*
	 *eleventyConfig.addPassthroughCopy({ "node_modules/bootstrap/dist/css": "assets/css" });
	 *eleventyConfig.addPassthroughCopy({ "node_modules/bootstrap/dist/js": "assets/bootstrap/js" });
	 *eleventyConfig.addPassthroughCopy({ "node_modules/jquery/dist": "assets/jquery/js" });
	 */
  // emulate passthrough during --serve:
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
 /*****************
	* Markdown {{{2 *
	*****************/
	eleventyConfig.setLibrary(
		'md',
		require('markdown-it')({
			html: true,
			linkify: true,
			typographer: true,
			katex: false,
			mathjax: true,
		}).use(require('markdown-it-pandoc'))
	);
 /*************************
  * Activate plugins {{{2 *
  *************************/
	// Call filters defined outside this function
	eleventyConfig.addFilter('dateFilter', dateFilter);
	eleventyConfig.addFilter('w3DateFilter', w3DateFilter);
	// Call plugins
	eleventyConfig.addPlugin(rssPlugin);
  //eleventyConfig.setQuietMode(true);
	// https://github.com/Myllaume/eleventy-plugin-citeproc/
	/*
	 *eleventyConfig.addPlugin(eleventyCiteproc, {
	 *  bibliographicStylePath: path.join(__dirname, 'assets/biblio/chicago-note-bibliography.csl'),
	 *  bibliographicLocalizationPath: path.join(__dirname, 'assets/biblio/locales-pt-BR.xml'),
	 *  bibliographicDataPath: path.join(__dirname, '_data/biblio.json')
	 *});
	 */
	eleventyConfig.addTransform("htmlmin", function(content) {
		// Prior to Eleventy 2.0: use this.outputPath instead
		if( this.page.outputPath && this.page.outputPath.endsWith(".html") ) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true
			});
			return minified;
		}
		return content;
	});
 /********************
  * Setup views {{{2 *
  ********************/
  eleventyConfig.addCollection("obras", function(collection) {
    return sortByDisplayOrder(collection.getFilteredByGlob("src/obra/*.md"));
  });
	eleventyConfig.addCollection('destaques', function(collection) {
    return sortByDisplayOrder(collection.getFilteredByGlob("src/obra/*.md")).filter(
			x => x.data.featured
		);
	});
 /*******************************************************
  * Return is the last instruction to be evaluated {{{2 *
  *******************************************************/
  // If needed, return an object configuration
  return {
    dir: {
			htmlTemplateEngine: "liquid",
			templateFormats: ["html", "liquid", "njk"],
      input: 'src',
      output: '_site',
      includes: '_includes'
    }
  }
};
// vim: foldmethod=marker shiftwidth=2 tabstop=2
