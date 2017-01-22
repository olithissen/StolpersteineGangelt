var map;
var markers;
var ajaxRequest;
var plotlist;
var plotlayers = [];
var feature = {}

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.text) {
        layer.bindPopup(`<div class="engraving">${feature.properties.text}</div>`);
    }
}

function loadData() {
    var layer = L.geoJSON(data, {
        onEachFeature: onEachFeature
    });
		markers.addLayer(layer);
		map.addLayer(markers);
    map.fitBounds(layer.getBounds(), {padding: [50, 50]});
}

function initmap() {
    // set up the map

    map = new L.Map('map');
 		markers = L.markerClusterGroup({spiderfyDistanceMultiplier: 2});

    // create the tile layer with correct attribution
    var osmAttrib = "foobar Openstreetmap";
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osm = new L.TileLayer(osmUrl, {
        minZoom: 8,
        maxZoom: 19,
        attribution: osmAttrib
    });

    // start the map in South-East England
    map.setView(new L.LatLng(51, 6), 15);
    map.addLayer(osm);

    loadData(map);
}
