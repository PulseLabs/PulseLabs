module.exports = function (grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {

    },

    uglify: {

    },

    dist: {

    }
  });

  //load tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  //register tasks
  grunt.registerTask('heroku', 
  []);
}
