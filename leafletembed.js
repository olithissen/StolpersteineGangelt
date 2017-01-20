var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

var feature = {}

function onEachFeature(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties && feature.properties.prop) {
		layer.bindPopup(feature.properties.prop);
	}
}	

function reloadData(map) {
	$.getJSON( "https://raw.githubusercontent.com/olithissen/StolpersteineGangelt/master/map2.geojson", function(data) {
		var myLayer = L.geoJSON().addTo(map);
		myLayer.addData(data);
		L.geoJSON(data, {
			onEachFeature: onEachFeature
		}).addTo(map);	
		map.fitBounds(myLayer.getBounds());
	});
}

function initmap() {
	// set up the map
	
	map = new L.Map('map');
	reloadData(map);

	// create the tile layer with correct attribution
	var osmAttrib = "foobar Openstreetmap";
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 19, attribution: osmAttrib});		

	// start the map in South-East England
	map.setView(new L.LatLng(51, 6),15);
	map.addLayer(osm);
}
