var DataProvider = require('./dataprovider-memory').DataProvider;

var Custom = function(){
  
};

Custom.prototype = DataProvider.prototype;

exports.Custom = Custom;

exports.create = function(){
  return new Custom();
}