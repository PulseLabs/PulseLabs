module.exports = function (grunt) {
  require('time-grunt')(grunt);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      public:{
        files:{
          'build/public/app.js': ['public/app/app.js']
        }
      }

    },

    uglify: {
      public:{

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
        files: 'public/**/*.js',
        tasks: ['newer:jshint:public']
      },
      server:{
        files: 'server/**/*.js',
        tasks: ['newer:jshint:server']
      }
    }
  });

  //load tasks
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //register tasks
  grunt.registerTask('heroku', 
  ['newer:uglify:all']);
  grunt.registerTask('testPublic',
    ['watch:public']);
  grunt.registerTask('testServer', 
    ['watch:server']);
}
