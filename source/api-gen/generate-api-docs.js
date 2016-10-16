var React = require('react');
require('node-jsx').install({extension: '.jsx'});
var StaticPage = require('./server-side'); // React component
var ReactDOMServer = require('react-dom/server');
var createIndex = require("./index-docs");
var cleanName = require("./clean-name");


// Wraps the raw html in the expected syntax
function yaml(raw, title) {
	var partial =  
		"---\n"
		+ "title: " + title + "\n"
		+ "layout: api\n"
		+ "---\n\n" 
		+ raw;
	// escape any instances of {{ int he text with \{{
	return partial.replace("{{", "\\{{")
}

function generateApiDocs(grunt, input, outputDir) {
	// input = "./api.json";
	// outputDir = "./public/api_pages";

	// Load api, process it into an index
	var api = grunt.file.readJSON(input),
		index = createIndex(api),
		pages = index.pages,
		props = {data: api, index: index};

	// Setupt output directory
	if (grunt.file.isDir(outputDir))
		grunt.file.delete(outputDir);
	grunt.file.mkdir(outputDir);


	//generate and write a single page to disk
	function createPage(selector, filename) {
		filename = filename || cleanName(selector) + ".html";
		props.selector = selector;
		var page = React.createElement(StaticPage, props);
		var raw = ReactDOMServer.renderToStaticMarkup(page);
		if (pages[selector]) {
			var title = pages[selector].main.name;
		} else {
			var title = selector || filename;
		}
		grunt.file.write(outputDir + "/" + filename, yaml(raw, title) );
	}

	// Create pages for the index, events, and every page in the api list
	createPage("", "index.html");
	createPage("events");
	// Create each api page
	for (var p in pages) {
		createPage(p);
		grunt.log.write(".");
	}
}

 module.exports = generateApiDocs;