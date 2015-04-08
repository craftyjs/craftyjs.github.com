var hljs = require('highlight.js');

module.exports = function(grunt) {
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

      }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('default', ['less', 'assemble']);



};