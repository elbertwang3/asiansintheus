

var mapboxAccessToken = 'pk.eyJ1IjoiZWxiZXJ0d2FuZyIsImEiOiJjajk3dmw4amUwYmV2MnFydzl3NDIyaGFpIn0.46xwSuceSuv2Fkeqyiy0JQ';
var countymap = L.map('countymap').setView([37.8, -96], 4);
console.log(countyData);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+mapboxAccessToken, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.light',
}).addTo(countymap);

 /*Papa.parse('assets/data/wellston_zone_codes.csv', {
 	 header: true,
    complete: function(results) {
	countyData.eachLayer(function(layer) {
		console.log(layer.feature.properties);
	  featureJoinByProperty(layer.feature.properties, results.data, "PARCELID");
	});*/

function style(feature) {
    return {
        fillColor: 'white',
        weight: 0.3,
        opacity: 1,
        color: 'black',
        fillOpacity: 0.3
    };
}
L.geoJson(countyData, {style: style}).addTo(countymap);