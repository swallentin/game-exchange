var MemberCounter = 0;

MemberProvider = function(){};
MemberProvider.prototype.dummyData = [];

MemberProvider.prototype.findAll = function(callback) {
  callback(null, this.dummyData);
};

MemberProvider.prototype.findById = function(id, callback) {
  var result = null;
  for (var i=0; i < this.dummyData.length; i++) {
    var item = this.dummyData[i];
    if( item._id == id) {
      result = item;
      break;
    }
  };
  callback(null, result);
};

MemberProvider.prototype.delete = function(id, callback) {
  var item = null;
  for (var i=0; i < this.dummyData.length; i++) {
    item = this.dummyData[i];
    if(item_i._id == id) {
      item = dummyData.splice(i, 1);
      break;
    }
    if(item == null)
      callback(new Error('Item does not exist.'), item);
    return callback(null, item);
  };
};
 
MemberProvider.prototype.save = function(Members, callback) {
  var Member = null;
  var test = undefined;
  
  if( typeof(Members.length) == "undefined" ){
    Members = [Members];
  }
  
  var isNotExistingMember;
  for (var i=0; i < Members.length; i++) {
    Member = Members[i];

    isNotExistingMember = Member._id === undefined;
    if( isNotExistingMember ) {
      Member._id = MemberCounter++;
    }
    
    Member.created_at = new Date();
    
    if(Members.comments === undefined){
      Members.comments = [];
    }
    
    for (var j=0; j < Members.comments.length; j++) {
      Members.comments[j].created_at = new Date();
    }
    var index = isNotExistingMember ? this.dummyData.length : Member._id;
    this.dummyData[index] = Member;
  }
  callback(null, Members);
};

var Members = [
  {
    name: "ps3"
  },
  {
    name: "action"
  }
];

exports.MemberProvider = MemberProvider;
exports.create = function(){
  return new MemberProvider();
};
