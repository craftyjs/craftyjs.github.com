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
        //partials: './src/bonnet/partials/**/*.hbs'
      },
      posts: {
        files: [{
          cwd: './source',
          dest: './',
          expand: true,
          src: ['index.html', 'documentation/*', 'cookbook/**/*.md', 'api/**/*.*', 'getting-started/*', 'components/*.html']
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
    }
  });

  grunt.loadNpmTasks('assemble');

  grunt.loadNpmTasks('grunt-contrib-connect');



};