var hljs = require('highlight.js');

module.exports = function(grunt) {
  var generateApi = require("./source/api-gen/generate-api-docs.js");
  function buildStatic() {
      // last two arguments are input file and output directory
      generateApi(grunt, "./source/api-gen/api.json", "./source/api");
  }

  grunt.initConfig({
  // ...
   
    assemble: {
      options: {
        layout: 'default',
        layoutdir: './source/_layouts',
        marked:{
          highlight: function  (code, lang)  { 
            if (lang)
              return  hljs.highlight(lang, code).value;
            else
              return hljs.highlightAuto(code, ["javascript", "html"]).value;
          }
        }
      },
      posts: {
        files: [{
          cwd: './source',
          dest: './',
          expand: true,
          src: ['index.html', 'documentation/*', 'cookbook/**/*.md', 'getting-started/*', 'api/**/*.*', 'components/*.html'] //'api/**/*.*', 
        }]  
      }
    },
    connect: {
      dev: {
        options: {
          open: true,
          port: 8000,
          base: './',
          keepalive: true
        }
      }
    },

    less: {
      default: {
        files: {
          "craftyjs-site.css":"source/less/craftyjs-site.less",
        }
      }
    },
    watch: {
        less: {
          files: 'source/less/*.less',
          tasks: ['less'],
        },
        templates: {
          files: ['source/**/*', '!source/less/*.less'],
          tasks: ['assemble'],
        },

    },
    linkChecker: {
      includeApi: {
        site: 'localhost',
        options: {
          initialPort: 8000,
          callback: function (crawler) {
            crawler.addFetchCondition(function (url) {
              if (url.path.indexOf("glyphicon") >= 0)
                return false
              return true;
            });
          }
        }
      },
      ignoreApi: {
        site: 'localhost',
        options: {
          initialPort: 8000,
          callback: function (crawler) {
            crawler.addFetchCondition(function (url) {
              if (url.path.indexOf("glyphicon") >= 0)
                return false
              else if (url.path.indexOf("api") >= 0)
                return false;
              return true;
            });
          }
        }
      }
    }

  });

  grunt.loadNpmTasks('assemble');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-link-checker');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('default', ['api', 'less', 'assemble']);

  grunt.registerTask('api', "Generate api documentation", buildStatic);
  grunt.registerTask('fast-check', 'linkChecker:ignoreApi');
  grunt.registerTask('full-check', 'linkChecker:includeApi');




};