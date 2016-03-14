module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: 'templates/*',
                dest: 'dist/'
            }
        },
        stylus: {
            main: {
                options: {
                    compress: false
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: 'resources/*',
                    dest: 'dist/',
                    ext: '.css'
                }]
            }
        },
        ts: {
            main: {
                tsconfig: true
            }
        },
        watch: {
            options: { livereload: true },
            ts: {
                files: 'src/**/*.ts',
                tasks: ['ts'],
            },
            copy: {
                files: 'src/**/*.html',
                tasks: ['copy']
            },
            tests: {
                files: 'tests/**'
            },
            stylus: {
                files: 'src/**/*.styl',
                tasks: ['stylus']
            }
        }
    });

    grunt.registerTask('default', [
        'copy',
        'stylus',
        'ts',
        'watch'
    ]);
};
