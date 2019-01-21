const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

module.exports = function(grunt) {

    grunt.initConfig({
        nodeunit : {
            all : ['tests/**/*.js']
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'numeral.js',
                'languages/**/*.js'
            ],
            options: {
                'node': true,
                'browser': true,
                'curly': true,
                'devel': false,
                'eqeqeq': true,
                'eqnull': true,
                'newcap': true,
                'noarg': true,
                'onevar': true,
                'undef': true,
                'sub': true,
                'strict': false,
                'quotmark': 'single'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', [
        'test'
    ]);

    grunt.registerTask('test', [
        // 'jshint',
        'nodeunit'
    ]);

    grunt.registerTask('build-languages', function () {
      const langs = fs.readdirSync(path.resolve(__dirname, 'languages'))
        .map(filename => {
          const id = filename.split('.js')[0]
          const content = fs.readFileSync(path.resolve(__dirname, 'languages', filename), 'utf8');
          const name = content.match(/(?:\*|\/\/)\s*language\s*:\s*(.+)$/m)[1]

          const lines = content.split('\n');
          const start = lines.findIndex(line => line.match(/^\s{4}var\s+language\s+=\s+\{/))
          const end = lines.findIndex(line => line.match(/^\s{4}\};/))
          if (start === -1) {
            throw new Error('could not find start');
          }
          if (end === -1) {
            throw new Error('could not find end');
          }

          const code = lines.slice(start + 1, end);
          if (!code[0].match(/^\s{8}delimiters: {$/)) {
            throw new Error('code does not look right');
          }

          return `{
            id: '${id}',
            name: '${name}',
            lang: {
              ${code.join('\n')}
            },
          }`
        })
        .join(',\n');

      fs.writeFileSync(
        path.resolve(__dirname, './languages.js'),
        prettier.format(`module.exports = [${langs}]`, {
          singleQuote: true,
          printWidth: 120,
        })
      );
    });

    // Travis CI task.
    grunt.registerTask('travis', ['test']);
};
