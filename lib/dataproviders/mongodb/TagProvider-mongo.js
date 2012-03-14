var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var TagSchema = new Schema({
  'title': { type: String},
  'description': { type: String }
});

mongoose.model('Tag', TagSchema);

var Tag = exports.Tag = mongoose.model('Tag');

var TagProvider = function(){};

TagProvider.prototype.findAll = function(callback) {
  Tag.find({}, function(err, docs){
    callback(null, docs);
  });
};

TagProvider.prototype.findByTitle = function(title, callback) {
  Tag.find({title: title}, function(err, docs){
    callback(null, docs);
  });
};

TagProvider.prototype.findById = function(id, callback) {
  Tag.findById(id, function(err, doc){
    callback(null, doc);
  });
};

TagProvider.prototype.save = function(doc, callback) {
  doc.save(function(err){
    callback(err);
  });
};

TagProvider.prototype.remove = function(doc, callback){
  Tag.remove({_id: doc._id}, function(){
    callback();
  });
};


exports.TagProvider = TagProvider;
