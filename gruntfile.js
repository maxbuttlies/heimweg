module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {                              
      dist: {                            
        options: {                      
          style: 'expanded'
        },                         
        files: {'dest/css/all.css': 'src/css/*.sass'}

      }
    },
    slim: {                              
      dist: {                            
        files:  [{
          expand: true,
          cwd: 'src',
          src: ['**/*.slim'],
          dest: './dest',
          ext: '.html'
        }]          
      }
    },
    coffee: {
      compile: {  
        files: {'dest/js/game.js': 'src/js/*.coffee'}
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'dest'
        }
      }
    },
    watch: {
      options: {
        livereload: 3000,
        nospawn: true
      },
      css: {
        files: '**/*.sass',
        tasks: ['sass']
      },
      html: {
        files: '**/*.slim',
        tasks: ['slim']
      },
      coffeescript:{
        files: '**/*.coffee',
        tasks: ['coffee']
      }
    }
  });

grunt.loadNpmTasks('grunt-slim');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-coffee');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.registerTask('default', ['slim','coffee','sass','connect','watch']);
} 