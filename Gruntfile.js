module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {                              // Task
      dist: {                            // Target
        files: {
          './build/main.css': './scss/main.scss'
        }
      }
    },
    browserSync: {
      bsFiles: {
        src : ['./**/*.css', './*.js', './*.html']
      },
      options: {
        server: {
          baseDir: "./"
        }
      }
    },
    watch: {
      scripts: {
        files: ['./**/*.scss'],
        tasks: ['sass'],
        options: {}
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default',['sass, watch']);

}
