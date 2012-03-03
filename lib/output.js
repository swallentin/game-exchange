/*

  Purpose, a wrapper/proxy/facade to collect common output methods.
  Basically it just gather different named output methods into on common one
*/s

var output = exports = module.exports = {};

var output = {
  var outputImplementation = [];
  var index = 0;
};
  
output.register = function(implementation, delegate) {
  var impl = outputImplementation[index++];
  impl.write = delegate;
};

output.write = function (output) {
  for (var i = outputImplementatio.length - 1; i >= 0; i--){
    outputImplementatio[i].write(output);
  };
};
  
output.unregister = function(implementation) {
};
var req_c = req;
var res_c = res;
output.register(res, res.send);
output

output.register(gameProvider);
