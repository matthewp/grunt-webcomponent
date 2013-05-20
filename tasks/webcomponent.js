/*
 * grunt-webcomponent
 * https://github.com/matthewp/grunt-webcomponent
 *
 * Copyright (c) 2013 Matthew Phillips
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs'),
    pack = require('wcpack');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('webcomponent', 'Your task description goes here.', function() {
    var done = this.async();

    var data = this.data,
        options = data.options,
        files = data.files.src,
        outFileName = options && options.out,
        minify = options && options.minify,
        indentSize = options && options.indent;

    var packer = pack(files).minify(minify);
    if(indentSize) {
      packer.indent(indentSize);
    }

    packer.end(function(output) {
      if(outFileName) {
        fs.writeFile(outFileName, output, 'utf8', function(err) {
          if(err) throw err;

          done();
        });
      }
    });
 
  });

};
