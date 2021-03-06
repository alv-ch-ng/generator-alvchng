;(function () {
    'use strict';

    module.exports = function (grunt) {
        require('load-grunt-tasks')(grunt, {
            pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
        });
        require('time-grunt')(grunt);

        // Project configuration.
        grunt.initConfig({

            // Metadata.
            pkg: grunt.file.readJSON('package.json'),
            alvchng: grunt.file.readJSON('.alvchngrc'),
             // Task configurations.
            clean: {
                all: ['dist', 'build'],
                dist: ['dist'],
                build: ['build']
            },
            ngtemplates:  {
              'alv-ch-ng.<%= answers.moduleName %>':  {
                cwd:      'src/',
                src:      'template/**/*.html',
                dest:     'src/js/<%= answers.moduleName %>.templates.js'
              }
            },
            uglify: {
                options: {
                    banner: '<%%= alvchng.banner %>'
                },
                prod: {
                    files: {
                        'dist/alv-ch-ng.<%= answers.moduleName %>.min.js': ['dist/alv-ch-ng.<%= answers.moduleName %>.js']
                    }
                },
                example: {
                  options: {
                    'mangle': false
                  },
                  files: {
                    'src/example/lib.min.js': [
                      'lib/jquery/dist/jquery.js',
                      'lib/bootstrap/dist/js/bootstrap.js',
                      'lib/angular/angular.js',
                      'lib/angular-aria/angular-aria.js',
                      'lib/angular-cookies/angular-cookies.js',
                      'lib/angular-route/angular-route.js',
                      'lib/angular-sanitize/angular-sanitize.js',
                      'lib/angular-resource/angular-resource.js',
                      'lib/angular-scroll/angular-scroll.js',
                      'lib/angular-translate/angular-translate.js',
                      'lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
                      'lib/angular-translate-storage-local/angular-translate-storage-local.js',
                      'lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                      'lib/ng-lodash/build/ng-lodash.js',
                      'lib/alv-ch-ng.core/dist/alv-ch-ng.core.js'<% if (answers.addExample == true) { %>,
                      'lib/ng-dev/dist/ng-dev.js',
                      'lib/highlightjs/highlight.pack.js'<% } %>
                    ]
                  }
                }
            },<% if (answers.addLess == true) { %>less: {
                prod: {
                    options: {
                        paths: ['src/less'],
                        compress: false,
                        cleancss: true,
                        ieCompat: true
                    },
                    files: {
                        'dist/css/<%= answers.moduleName %>.css': ['src/less/<%= answers.moduleName %>.less']
                    }
                }<% if (answers.addExample == true) { %>,
                example: {
                  options: {
                    paths: ['src/less'],
                    compress: false,
                    cleancss: true,
                    ieCompat: true
                  },
                  files: {
                    'src/example/styles/<%= answers.moduleName %>.css': ['src/less/<%= answers.moduleName %>.less']
                  }
                }<% } %>
            },<% } %>
            copy: {<% if (answers.addExample == true) { %>
              prod: {
                files: [
                  {
                    expand: true,
                    cwd: 'src/example/',
                    src: ['fonts/glyphicons*','images/**/*','locales/**/*','pages/**/*','styles/**/*','*.js','*.html'],
                    dest: 'dist/example'
                  }
                ]
              },<% } %>
              example: {
                files: [
                  {
                    expand: true,
                    cwd: 'lib/bootstrap/',
                    src: 'fonts/*',
                    dest: 'src/example'
                  },
                  {
                    expand: true,
                    cwd: 'lib/alv-ch-ng.style/dist/css/',
                    src: 'alv-ch-ng.bootstrap.css',
                    dest: 'src/example/styles'
                  }<% if (answers.addExample == true) { %>,
                  {
                    expand: true,
                    cwd: 'lib/ng-dev/dist/css/',
                    src: '*.min.css',
                    dest: 'src/example/styles'
                  }<% } if (answers.addFrutiger == true) { %>,
                  {
                    expand: true,
                    cwd: 'private/fonts/',
                    src: '**/*',
                    dest: 'src/example/fonts'
                  },
                  {
                    expand: true,
                    cwd: 'lib/alv-ch-ng.style/dist/css/',
                    src: '*.css',
                    dest: 'src/example/styles'
                  }<% } %>
                ]
              }
            },
            cssbeautifier: {
                options: {
                    banner: '<%%= alvchng.banner %>'
                },
                prod: {
                    files: {
                        'dist/css/<%= answers.moduleName %>.css': ['dist/css/<%= answers.moduleName %>.css']
                    }
                }
            },
            cssmin: {
                options: {
                    banner: '<%%= alvchng.banner %>'
                },
                prod: {
                    files: {
                        'dist/css/<%= answers.moduleName %>.min.css': ['dist/css/<%= answers.moduleName %>.css']
                    }
                }
            },
            compress: {
                main: {
                    options: {
                        mode: 'gzip'
                    },
                    files: [
                        { src: ['dist/css/<%= answers.moduleName %>.min.css'], dest: 'dist/css/<%= answers.moduleName %>.min.css' }
                    ]
                }
            },
            concat: {
              options: {
                separator: ';',
                banner: '<%%= alvchng.banner %>'
              },
              prod: {
                src: ['src/js/<%= answers.moduleName %>.js', 'src/js/<%= answers.moduleName %>.templates.js'],
                dest: 'dist/alv-ch-ng.<%= answers.moduleName %>.js'
              }
            },
            jasmine: {
                unit: {
                    src: [
                        'src/js/*.js'
                    ],
                    options: {
                        specs: ['test/unit/**/*.unit.spec.js'],
                        helpers: 'test/unit/helpers/*.helper.js',
                        vendor: [
                            'lib/jquery/dist/jquery.js',
                            'lib/jasmine-jquery/lib/jasmine-jquery.js',
                            'lib/bootstrap/dist/js/bootstrap.js',
                            'lib/angular/angular.js',
                            'lib/angular-mocks/angular-mocks.js',
                            'lib/angular-aria/angular-aria.js',
                            'lib/angular-cookies/angular-cookies.js',
                            'lib/angular-route/angular-route.js',
                            'lib/angular-sanitize/angular-sanitize.js',
                            'lib/angular-resource/angular-resource.js',
                            'lib/angular-scroll/angular-scroll.js',
                            'lib/angular-translate/angular-translate.js',
                            'lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
                            'lib/angular-translate-storage-local/angular-translate-storage-local.js',
                            'lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                            'lib/ng-lodash/build/ng-lodash.js',
                            'lib/alv-ch-ng.core/dist/alv-ch-ng.core.js',
                            'node_modules/grunt-contrib-jasmine/vendor/jasmine-2.0.0/jasmine.js'
                        ],
                        version: '2.0.0',
                        template: require('grunt-template-jasmine-istanbul'),
                        templateOptions: {
                            coverage: 'build/coverage/coverage.json',
                            report: [
                                {
                                    type: 'html',
                                    options: {
                                        dir: 'build/coverage/reports/html'
                                    }
                                },
                                {
                                    type: 'lcov',
                                    options: {
                                        dir: 'build/coverage/reports/lcov'
                                    }
                                },
                                {
                                    type: 'text-summary'
                                }
                            ]
                        }
                    }
                }
            },
            coveralls: {
                options: {
                    force: false
                },
                all: {
                    src: 'build/coverage/reports/lcov/lcov.info'
                }
            },
            push: {
                options: {
                    files: ['package.json'],
                    updateConfigs: [],
                    releaseBranch: 'master',
                    add: true,
                    addFiles: ['*.*', 'dist/**', 'src/**', 'test/**'], // '.' for all files except ignored files in .gitignore
                    commit: true,
                    commitMessage: 'Release v%VERSION%',
                    commitFiles: ['*.*', 'dist/**', 'src/**', 'test/**'], // '-a' for all files
                    createTag: true,
                    tagName: 'v%VERSION%',
                    tagMessage: 'Version %VERSION%',
                    push: false,
                    npm: false,
                    gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
                }
            },
            htmlhint: {
              options: {
                htmlhintrc: '.htmlhintrc'
              },
                templates: {
                src: ['src/template/**/*.html']
              }
            },
            jshint: {
                gruntfile: {
                    options: {
                        jshintrc: '.jshintrc'
                    },
                    src: 'Gruntfile.js'
                },
                src: {
                    options: {
                        jshintrc: '.jshintrc'
                    },
                    src: ['src/js/**/*.js']
                },
                test: {
                    options: {
                        jshintrc: 'test/.jshintrc'
                    },
                    src: ['test/**/*.js', '!test/dev/*.js', '!test/**/helpers/*.helper.js', '!test/e2e/**']
                }
            },
            lesslint: {
                options: {
                    csslint: {
                        csslintrc: '.csslintrc'
                    },
                    imports: ['src/less/**/*.less']
                },
                src: ['src/less/<%= answers.moduleName %>.less']
            },
            watch: {
              html: {
                files: 'src/template/**/*.html',
                tasks: ['htmlhint:templates', 'templates']
              },<% if (answers.addLess == true) { %>
              less: {
                files: 'src/less/**/*.less',
                tasks: ['lesslint'<% if (answers.addExample == true) { %>, 'less:example'<% } %>]
              },<% } %>
              jshint: {
                files: 'src/js/*.js',
                  tasks: ['jshint-test']
              },
              test: {
                  files: 'src/js/**/*.js',
                  tasks: ['unit-test']
              }
            },
            browserSync: {
              dev: {
                bsFiles: {
                  src : 'src/**/*'
                },
                options: {
                  server: {
                    baseDir: './src',
                    directory: false
                  },
                  watchTask: true
                }
              }
            }
        });

        // Tests
        grunt.registerTask('unit-test', ['jasmine']);
        grunt.registerTask('jshint-test', ['jshint']);
        <% if (answers.addLess == true) { %>grunt.registerTask('lesslint-test', ['lesslint']);<% } %>
        grunt.registerTask('all-test', [<% if (answers.addLess == true) { %>'lesslint-test',<% } %> 'htmlhint:templates', 'jshint-test', 'unit-test']);
        // CI
        grunt.registerTask('travis', ['jshint', 'clean:build', 'unit-test', 'coveralls']);

        // Templates
        grunt.registerTask('templates', ['ngtemplates']);

        // DEV
        grunt.registerTask('build', ['templates',<% if (answers.addLess == true) { %>'less:example',<% } %>'all-test','copy:example','uglify:example']);
        grunt.registerTask('dev', ['build', 'browserSync:dev', 'watch']);

        // Default task.
        grunt.registerTask('default', ['clean:all','templates','all-test',<% if (answers.addLess == true) { %>'less:prod','cssbeautifier','cssmin',<% } %> 'concat','uglify:prod'<% if (answers.addExample == true) { %>, 'copy:prod'<% } %>]);
    };


})();
