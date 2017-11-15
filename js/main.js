

var mapboxAccessToken = 'pk.eyJ1IjoiZWxiZXJ0d2FuZyIsImEiOiJjajk3dmw4amUwYmV2MnFydzl3NDIyaGFpIn0.46xwSuceSuv2Fkeqyiy0JQ';

var countymap = L.map('countymap').setView([39.8283, -98.5795], 4);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+mapboxAccessToken, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.light',
}).addTo(countymap);

var LAcountymap = L.map('lacountymap').setView([34.05, -118.24], 11);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+mapboxAccessToken, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.light',
}).addTo(LAcountymap);

var SFcountymap = L.map('sfcountymap').setView([37.7639, -122.4312], 11.5);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+mapboxAccessToken, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.light',
}).addTo(SFcountymap);


var NYcountymap = L.map('nycountymap').setView([40.720610, -73.885242], 11);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+mapboxAccessToken, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.light',
}).addTo(NYcountymap);

var currentyear = 2015;



 /*Papa.parse('assets/data/wellston_zone_codes.csv', {
 	 header: true,
    complete: function(results) {
	countyData.eachLayer(function(layer) {
		console.log(layer.feature.properties);
	  featureJoinByProperty(layer.feature.properties, results.data, "PARCELID");
	});*/
function getColor(d) {
	 return d > 0.75 ? '#ffffd9' :
	 		d > 0.50 ? '#edf8b1' :
	 		d > 0.25 ? '#c7e9b4' :
           d > 0.1  ? '#7fcdbb' :
           d > 0.05 ? '#41b6c4' :
           d > 0.02  ? '#1d91c0' :
           d > 0.01  ? '#225ea8' :
                      '#0c2c84';
}



function style(feature) {
    return {
    	fillColor: getColor(feature.properties['2015']),
        color: '#fff', // border color 
        weight: 0.3,
        fillOpacity: 1
    }
}

function style2(feature) {
    return {
    	fillColor: getColor(feature.properties['2015']),
        color: '#fff', // border color 
        weight: 0.3,
        fillOpacity: 0.7
    }
}

function style3(feature) {
    return {
    	fillColor: getColor(feature.properties['2010']),
        color: 'black', // border color 
        weight: 0.2,
        fillOpacity: 0.5
    }
}


function style4(feature) {
    return {
    	fillColor: getColor(feature.properties['2010']),
        color: '#fff', // border color 
        weight: 0.3,
        fillOpacity: 0.7
    }
}


console.log();
var geojson;
var geojson2;
var geojson3;
var geojson4;

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

geojson2 = L.geoJson(lacountypercent, {
	style: style2,
	onEachFeature: function(feature, layer) {
 
        layer.on({
	        mouseover: highlightFeature2,
	        mouseout: resetHighlight2,
	        click: zoomToFeature2
	    });
    }
}).addTo(LAcountymap);


geojson3 = L.geoJson(sfcountypercent, {
	style: style3,
	onEachFeature: function(feature, layer) {
 
        layer.on({
	        mouseover: highlightFeature3,
	        mouseout: resetHighlight3,
	        click: zoomToFeature3
	    });
    }
}).addTo(SFcountymap);


geojson4 = L.geoJson(nycountypercent, {
	style: style4,
	onEachFeature: function(feature, layer) {
 
        layer.on({
	        mouseover: highlightFeature4,
	        mouseout: resetHighlight4,
	        click: zoomToFeature4
	    });
    }
}).addTo(NYcountymap);


var slider1 = L.control.slider(function(value) { 
	currentyear = value;
	geojson.eachLayer(function(layer) {
		 layer.setStyle({fillColor: getColor(layer.feature.properties[value.toString()]),})
	});
	
}, {
																	min: 2010, 
																	max: 2015, 
																	step: 1, 
																	size: '235px',
																	collapsed: false,
																	width: 10,
																	value: 2010,
																	id: 'slider1', 
																	position: 'bottomleft',
																	orientation: 'horizontal'});

slider1.addTo(countymap);

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

function highlightFeature2(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2.5,
        color: '#666',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info2.update(layer.feature.properties);
}

function zoomToFeature2(e) {
    LAcountymap.fitBounds(e.target.getBounds());
}

function resetHighlight2(e) {
    geojson2.resetStyle(e.target);
    info2.update();
}

function highlightFeature3(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2.5,
        color: '#666',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info3.update(layer.feature.properties);
}

function zoomToFeature3(e) {
    SFcountymap.fitBounds(e.target.getBounds());
}

function resetHighlight3(e) {
    geojson3.resetStyle(e.target);
    info3.update();
}

function highlightFeature4(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2.5,
        color: '#666',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info4.update(layer.feature.properties);
}

function zoomToFeature4(e) {
    NYcountymap.fitBounds(e.target.getBounds());
}

function resetHighlight4(e) {
    geojson3.resetStyle(e.target);
    info4.update();
}

var info = L.control();
var info2 = L.control();
var info3 = L.control();
var info4 = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
	console.log(props);
    this._div.innerHTML = '<h4>Asian population percentage</h4>' +  (props ?
        '<b>' + props['NAME'] + ' County' + '</b><br />' + props[currentyear.toString()] * 100 + '% '
        : 'Hover over a county');
};

info2.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info2.update = function (props) {
    this._div.innerHTML = '<h4>Asian population percentage</h4>' +  (props ?
        '<b>' + props['metadata']['NAMELSAD'] + '</b><br />' + props['2015'] * 100 + '% '
        : 'Hover over a tract');
};

info3.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info3.update = function (props) {
	console.log(props);
    this._div.innerHTML = '<h4>Asian population percentage</h4>' +  (props ?
        '<b>' + props['namelsad10'] + '</b><br />' + props['2010'] * 100 + '% '
        : 'Hover over a tract');
};

info4.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info4.update = function (props) {
	console.log(props);
    this._div.innerHTML = '<h4>Asian population percentage</h4>' +  (props ?
        '<b>' + props['NTAName'] + '</b><br />' + props['2010'] * 100 + '% '
        : 'Hover over a tract');
};

info.addTo(countymap);
info2.addTo(LAcountymap);
info3.addTo(SFcountymap);
info4.addTo(NYcountymap);


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 0.01, 0.02, 0.05, 0.1, 0.25, 0.5, 0.75],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]+0.0001) + '"></i> ' +
            grades[i] * 100 + "%" + (grades[i + 1] * 100 ? ' &ndash; ' + grades[i + 1] * 100 + "%" + '<br>' : '+');
    }

    return div;
};
var legend2 = L.control({position: 'bottomright'});

legend2.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 0.01, 0.02, 0.05, 0.1, 0.25, 0.5, 0.75],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]+0.0001) + '"></i> ' +
            grades[i] * 100 + "%" + (grades[i + 1] * 100 ? ' &ndash; ' + grades[i + 1] * 100 + "%" + '<br>' : '+');
    }

    return div;
};
var legend3 = L.control({position: 'bottomright'});

legend3.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 0.01, 0.02, 0.05, 0.1, 0.25, 0.5, 0.75],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]+0.0001) + '"></i> ' +
            grades[i] * 100 + "%" + (grades[i + 1] * 100 ? ' &ndash; ' + grades[i + 1] * 100 + "%" + '<br>' : '+');
    }

    return div;
};

var legend4 = L.control({position: 'bottomright'});

legend4.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 0.01, 0.02, 0.05, 0.1, 0.25, 0.5, 0.75],
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
legend2.addTo(LAcountymap);
legend3.addTo(SFcountymap);
legend4.addTo(NYcountymap);














