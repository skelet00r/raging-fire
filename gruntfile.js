'use strict';

module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    timeout: 3000,
                    clearRequireCache: true
                },
                src: ['api/**/*.spec.js']
            }
        },

        watch: {
            test: {
                options: {
                    spawn: false,
                },
                files: 'api/**/*.spec.js',
                tasks: ['mochaTest:test']
            }
        },

        mocha_istanbul: {
            coverage: {
                src: ['api/*/*/*.js'], // a folder works nicely 
                options: {
                    mask: '*.spec.js',
                    print: 'detail',
                    recursive: true,
                    excludes: ['api/**/*.spec.js']
                }
            }
        },

        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: './api',
                    themedir: 'node_modules/yuidoc-bootstrap-theme/',
                    helpers: ['node_modules/yuidoc-bootstrap-theme/helpers/helpers.js'],
                    outdir: './docs'
                }
            }
        }
    });

    grunt.event.on('coverage', function (lcovFileContents, done) {
        // Check below 
        done();
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-bump');
    
    grunt.registerTask('release', 'Build, bump and publish to NPM.', function (type) {
        return grunt.task.run(['npm-contributors', 'bump:' + (type || 'patch'), 'npm-publish']);
    });

    grunt.registerTask('coverage', ['mocha_istanbul:coverage']);

    grunt.registerTask('test', ['mochaTest:test']);
    grunt.registerTask('docs', ['yuidoc']);
    
    //purely for ease, runs postinstall 'npm install' and generates the coverage report and docs
    grunt.registerTask('makego', ['mocha_istanbul:coverage', 'yuidoc']);


};