var assign = require('./util/assign');

var fse = {};
var gfs = require('fs');

// attach fs methods to fse
Object.keys(gfs).forEach(function (key) {
  fse[key] = gfs[key];
});

var fs = fse;

assign(fs, require('./copy'));
assign(fs, require('./copy-sync'));
assign(fs, require('./mkdirs'));
assign(fs, require('./remove'));
assign(fs, require('./json'));
assign(fs, require('./move'));
assign(fs, require('./empty'));
assign(fs, require('./ensure'));
assign(fs, require('./output'));
assign(fs, require('./walk'));

module.exports = fs;

// maintain backwards compatibility for awhile
var jsonfile = {};
Object.defineProperty(jsonfile, 'spaces', {
  get: function () {
    return fs.spaces; // found in ./json
  },
  set: function (val) {
    fs.spaces = val;
  }
});

module.exports.jsonfile = jsonfile; // so users of fs-extra can modify jsonFile.spaces

//var bundle = function(obj) {
//  var type = typeof obj;
//  if(type === 'string') return '\'' + obj + '\'';
//  if(type === 'boolean' || type === 'number') return obj;
//  if(type === 'function') return "~~function~~";
//  var ret = [];
//  for(var prop in obj) {
//    ret.push(prop + ': ' + bundle(obj[prop]));
//  }
//  return '{' + ret.join(',') + '}';
//};
//
//console.log(bundle(module.exports));