'use strict';

module.exports = function(grunt) {

        var paths = {
        js: ['!bower_components/**','packages/**/*.js' , 'packages/**/**/*.js', 'app/**/*.js'],
        jsPublic:['!bower_components/**','packages/**/*.js'],
        jade: ['app/views/**'],
        html:['packages/views/**'],
        css: ['!bower_components/**','packages/**/*.css']
      };


    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assets: grunt.file.readJSON('config/assets.json'),
        clean: ['bower_components/build', 'packages/bundle'],
        watch: {
            jade: {
                files: paths.jade,
                options: {
                    livereload: true,
                },
            },
            js: {
                files: paths.js,
                tasks: ['jshint'],
                options: {
                    livereload: true,
                },
            },
            html: {
                files: paths.html,
                options: {
                    livereload: true,
                },
            },
            css: {
                files: paths.css,
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
          options: {
                   jshintrc:true // relative to Gruntfile
                },
            all: paths.js
        },
        uglify: {
         core: {
              options: {
                 mangle: false
               },
             files: '<%= assets.core.js %>'
           },
          terget: {
               options: {
                 compress: true,
                 mangle: true,
                 sourceMap: true,
                  quoteStyle:1
                },
              files: {'packages/bundle/bundle.min.js': paths.jsPublic}
            }
       },
       csslint: {
           options: {
               csslintrc: '.csslintrc'
           },
           src: paths.css
       },
       cssmin: {
           core: {
               files: '<%= assets.core.css %>'
             },
           target:{
                  files: {'packages/bundle/bundle.min.css': paths.css}
            }
      },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    ignore: ['README.md', 'node_modules/**', '.DS_Store'],
                    ext: 'js',
                    watch: ['app', 'config'],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['test/mocha/**/*.js']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma/karma.conf.js'
            }
        }
    });

    //Load NPM tasks
    require('load-grunt-tasks')(grunt);

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);
    //Default task(s).
      if (process.env.NODE_ENV === 'production') {
          grunt.registerTask('default', ['clean','uglify','cssmin', 'concurrent']);
      }else{
          grunt.registerTask('default', ['clean','csslint','jshint', 'concurrent']);
      }

    //Test task.
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};
