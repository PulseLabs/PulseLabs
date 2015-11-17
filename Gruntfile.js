module.exports = function (grunt) {
  require('time-grunt')(grunt);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options:{
        sourceMap: true
      },
      public:{
        files:{
          'build/public/app.js': ['public/app/app.js']
        }
      }

    },

    html2js:{
      options:{
        base: 'public',
        module: 'app.templates',
        singleModule: true,
        useStrict: true
        // htmlmin: {
        //   collapseBooleanAttributes: true,
        //   collapseWhitespace: true,
        //   removeAttributeQuotes: true,
        //   removeComments: true,
        //   removeEmptyAttributes: true,
        //   removeRedundantAttributes: true,
        //   removeScriptTypeAttributes: true,
        //   removeStyleLinkTypeAttributes: true
        // }
      },
      public:{
        src: 'public/app/**/*.html',
        dest: 'build/html2js/template.js'
      }
    },

    ngAnnotate: {
      options:{
        singleQuotes: true
      },
      public:{
        files: [{
          expand: true,
          cwd: 'public/app/',
          src: ['**/*.js'],
          dest: 'build/ngAnnotate'
        }]
      }
    },

    uglify: {
      options:{
        sourceMap: true
      },
      public:{
        src: 'build/ngAnnotate/**/*.js',
        dest: 'public/app.min.js'
      }
    },

    jshint: {
      public:{
        src: 'public/app/**/*.js'
      },
      server:{
        src: 'server/**/*.js'
      }
    },

    watch:{
      public:{
        files: ['public/**/*.js','public/**/*.html'],
        tasks: ['jshint:public', 'htmllint']
      },
      server:{
        files: 'server/**/*.js',
        tasks: ['jshint:server']
      },
      build:{
        files: 'public/**/*.js',
        tasks: ['ngAnnotate:public', 'uglify:public']
      }
    },

    htmllint:{
      options:{
        force: false
      },
      files: ['public/app/**/*.html', 'public/*.html']
    }

  });

  //load tasks
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-htmllint');
  grunt.loadNpmTasks('grunt-force-task');


  //register tasks
  grunt.registerTask('heroku', 
  ['ngAnnotate:public', 'uglify:public']);

  grunt.registerTask('testPublic',
    ['force:htmllint',  'force:jshint:public', 'watch:public']);

  grunt.registerTask('testServer', 
    ['jshint:server','watch:server']);

  grunt.registerTask('html2js', 
    ['html2js:public']);

  grunt.registerTask('build', 
    ['ngAnnotate:public', 'uglify:public', 'watch:build']);
};

