

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
function getColor(d) {
	 return d > 0.3 ? '#ffffcc' :
           d > 0.1  ? '#c7e9b4' :
           d > 0.05 ? '#7fcdbb' :
           d > 0.02  ? '#41b6c4' :
           d > 0.01  ? '#2c7fb8' :
                      '#253494';
}

function style(feature) {
    return {
    	fillColor: getColor(feature.properties['2015']),
        color: '#fff', // border color 
        weight: 0.3,
        fillOpacity: 1
    }
}



console.log();
var geojson;
//L.geoJson(countyData, {style: style}).addTo(countymap);
/*geojson = L.choropleth(percentData, {
    valueProperty: '2015', // which property in the features to use 
    scale: chroma.scale(['#2A4858','#fafa6e']).mode('lch').colors(5), // chroma.js scale - include as many as you like 
    steps: 6, // number of breaks or steps in range 
    mode: 'e', // q for quantile, e for equidistant, k for k-means 
    style: {
        color: '#fff', // border color 
        weight: 0.3,
        fillOpacity: 1
    },
    onEachFeature: function(feature, layer) {
 
        layer.on({
	        mouseover: highlightFeature,
	        mouseout: resetHighlight,
	        click: zoomToFeature
	    });
    }
}).addTo(countymap)*/
geojson = L.geoJson(percentData, {
    style: style,
    onEachFeature: function(feature, layer) {
 
        layer.on({
	        mouseover: highlightFeature,
	        mouseout: resetHighlight,
	        click: zoomToFeature
	    });
    }
}).addTo(countymap)
L.geoJson(lacounty, {style: style}).addTo(LAcountymap);




function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2.5,
        color: '#666',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function zoomToFeature(e) {
    countymap.fitBounds(e.target.getBounds());
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Asian population percentage</h4>' +  (props ?
        '<b>' + props['NAME'] + ' County' + '</b><br />' + props['2015'] * 100 + '% '
        : 'Hover over a county');
};

info.addTo(countymap);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 0.01, 0.02, 0.05, 0.1, 0.3],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]+0.0001) + '"></i> ' +
            grades[i] * 100 + "%" + (grades[i + 1] * 100 ? ' &ndash; ' + grades[i + 1] * 100 + "%" + '<br>' : '+');
    }

    return div;
};

legend.addTo(countymap);
















