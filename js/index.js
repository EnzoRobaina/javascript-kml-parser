// const tgj = require('togeojson')
// const electron = require('electron')
const $ = require('jquery')
// DOMParser = require('xmldom').DOMParser;

// $.ajax('https://raw.githubusercontent.com/EnzoRobaina/Javascript-busu/master/ciclovias.kml').done(function(xml) {
  
// var kml = new DOMParser().parseFromString(xml)
// console.log(kml)
// var asdf = tgj.kml(kml)
// //console.log(tgj.kml(xml));
// });
// $.getScript("../js/togeojson.js", function() {
//     alert("sucess")
// })

// var tj = require('togeojson'),
//     fs = require('fs'),
//     // node doesn't have xml parsing or a dom. use xmldom
//     DOMParser = require('xmldom').DOMParser;
var tj = require('togeojson'),
    fs = require('fs'),
    // node doesn't have xml parsing or a dom. use xmldom
    DOMParser = require('xmldom').DOMParser;
var path = require('path');
var relpath = path.join(__dirname, '../a.kml')
//     console.log(relpath)
    
var kmlfile = fs.readFileSync(relpath, 'utf-8')
//     console.log(kmlfile)

//     var Akml = new DOMParser().parseFromString(kmlfile)



//     console.log(Akml)
//     var converted = tj.gpx(Akml,{ styles: true })

//     console.log(JSON.stringify(converted))


 
// var kml = new DOMParser().parseFromString(fs.readFileSync(relpath, 'utf8'));
 
// var converted = tj.gpx(kml);
 
// var convertedWithStyles = tj.gpx(kml, { styles: true });
// console.log(converted)
$.ajax({
    type: "GET",
    url: 'https://raw.githubusercontent.com/EnzoRobaina/Javascript-busu/master/ciclovias.kml',
    async: false,})
    
    .done(function(xml) {
    console.log(xml)
    // console.log(stringed)
    // var ccc = tj.kml((new DOMParser()).parseFromString(stringed, 'text/xml'))
}) 
// var kml = new DOMParser().parseFromString(xml)
// console.log(kml)
// var asdf = tgj.kml(kml)
// //console.log(tgj.kml(xml));
// });

// var converted = JSON.stringify( tj.kml((new DOMParser()).parseFromString(kmlfile, 'text/xml') ), null, 4);
// console.log(converted)