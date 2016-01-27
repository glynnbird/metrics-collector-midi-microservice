var total = 0,
  crypto = require('crypto'),
  midi = require('midi');

// midi setup
output = new midi.output()
output.openVirtualPort("VP");

var changeKey = function() {
  var num = Math.floor(Math.random()*12);
  key = 48 + num;
  console.log("changing key to ", key);
};

var key = 64;
changeKey();



setInterval(changeKey, 20000);

var push = function(obj, callback) {
  obj.ts = Math.random();
  var str = JSON.stringify(obj);
  var hash = crypto.createHash('md5').update(str).digest('hex');
  console.log(hash);
  var numeric = parseInt(hash.replace(/[^0-9]/g,"").substr(0,6));
  console.log(numeric);
  numeric = numeric % 4;
  var chord = [0,4,7,12];
  var multiplier = numeric %3;
  var note = key + chord[numeric] +  12 * multiplier;
  console.log("playing note",numeric,note);
  output.sendMessage([144,note,50 + Math.floor(Math.random()*60)]);
  setTimeout(function() {
    console.log("done");
    output.sendMessage([128,note,40]);
    //output.sendMessage([144,69,0]);
    
  },Math.floor(Math.random()*5000))
  callback();
}


module.exports = {
  push: push
}