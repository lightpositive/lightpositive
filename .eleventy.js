// jshint esversion: 6
const yaml = require("js-yaml");
const { DateTime } = require("luxon");

// Access Eleventy configuration object
module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
  });

  // Copy CSS Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/css");

  // Copy js Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/js");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");

  // Copy all *.jpf files keeping the same directory structure
  eleventyConfig.addPassthroughCopy("./src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("./src/**/*.jpeg");
  eleventyConfig.addPassthroughCopy("./src/**/*.png");
  eleventyConfig.addPassthroughCopy("./src/**/*.svg");
  eleventyConfig.addPassthroughCopy("./src/**/*.gif");
  eleventyConfig.addPassthroughCopy("./src/**/*.webp");
  eleventyConfig.addPassthroughCopy("./src/**/*.bmp");
  eleventyConfig.addPassthroughCopy("./src/**/*.tiff");

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};
