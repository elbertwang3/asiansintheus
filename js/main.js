

var mapboxAccessToken = 'pk.eyJ1IjoiZWxiZXJ0d2FuZyIsImEiOiJjajk3dmw4amUwYmV2MnFydzl3NDIyaGFpIn0.46xwSuceSuv2Fkeqyiy0JQ';
var countymap = L.map('countymap').setView([39.8283, -98.5795], 4);
console.log(countyData);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+mapboxAccessToken, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.light',
}).addTo(countymap);

var LAcountymap = L.map('lacountymap').setView([34.05, -118.24], 10);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+mapboxAccessToken, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
}).addTo(LAcountymap);

 /*Papa.parse('assets/data/wellston_zone_codes.csv', {
 	 header: true,
    complete: function(results) {
	countyData.eachLayer(function(layer) {
		console.log(layer.feature.properties);
	  featureJoinByProperty(layer.feature.properties, results.data, "PARCELID");
	});*/
var getColor = chroma.scale(['#451A53','#40968B','#FDE733']).domain([0,110000])
function style(feature) {
    return {
       fillColor: getColor(feature.properties['2009']),
       //fillColor:'white',
           color: 'white',
    weight: 0,
    opacity: 0,
       fillOpacity: 1

    };
}



console.log(lacounty);
L.geoJson(countyData, {style: style}).addTo(countymap);
L.geoJson(lacounty, {style: style}).addTo(LAcountymap);
















