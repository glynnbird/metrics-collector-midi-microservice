var total = 0,
  crypto = require('crypto'),
  midi = require('midi'),
  chords = [ 
            [0,4,7,12], // major
            [0,3,7,12], // minor
            [0,4,7,11], // major 7th
            [0,3,7,10], // minor 7th
            [0,3,7,10], // 7th
            [0,4,7,8] // 6th
         ];
         
// midi setup
output = new midi.output()
output.openVirtualPort("VP");

var changeKey = function() {
  var num = Math.floor(Math.random()*12);
  key = 48 + num;
  var i = Math.floor(chords.length * Math.random())
  chord = chords[i];
  console.log("changing key to ", key, "chord", chord);
};

var key = 64;
var chord = chords[0]
changeKey();

// http://www.music.mcgill.ca/~gary/rtmidi/
// https://www.midi.org/specifications/item/table-1-summary-of-midi-message

setInterval(changeKey, 12000);

var push = function(obj, callback) {
  obj.ts = Math.random();
  var str = JSON.stringify(obj);
  var hash = crypto.createHash('md5').update(str).digest('hex');
  var numeric = parseInt(hash.replace(/[^0-9]/g,"").substr(0,6));
  numeric = numeric % chord.length;
  var multiplier = numeric %3;
  var note = key + chord[numeric] +  12 * multiplier;
  console.log("playing note",numeric,note);
  output.sendMessage([144,note,50 + Math.floor(Math.random()*60)]);
  setTimeout(function() {
    output.sendMessage([128,note,0]);
  },Math.floor(Math.random()*5000))
  callback();
}


module.exports = {
  push: push
}