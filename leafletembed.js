var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

function onEachFeature(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties && feature.properties.prop) {
		layer.bindPopup(feature.properties.prop);
	}
}	

function initmap() {
	// set up the map
	
	var feature = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          5.997569561004638,
          50.99288103999011
        ]
      },
	  "properties" : {"prop" : "<b>foobar</b>: Fnord"}
    }
  ]
}
	
	map = new L.Map('map');
	var myLayer = L.geoJSON().addTo(map);
	myLayer.addData(feature);

	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 19, attribution: osmAttrib});		

	// start the map in South-East England
	map.setView(new L.LatLng(51, 6),15);
	map.addLayer(osm);
	L.geoJSON(feature, {
		onEachFeature: onEachFeature
	}).addTo(map);	
	map.fitBounds(myLayer.getBounds());
}