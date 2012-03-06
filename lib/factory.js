Factory = function(dependency){
  this._dependency = dependency;
  var factory = {};

  factory.print = function() {
      console.log('test');
    }
  };
  return factory;
}

exports.Factory = Factory;