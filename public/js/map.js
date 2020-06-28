mapboxgl.accessToken = 'pk.eyJ1IjoiY21zbWFydDIiLCJhIjoiY2tieWQyZGd3MDE4ZTJ4bXhvM2FsamN2OSJ9.u3AtY3ut632MTKYp9d-izw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-94.5786, 39.0997], // starting position [lng, lat]
    zoom: 9 // starting zoom
});


map.on("load", (function(){
    map.addSource('tracts', {
        type: 'geojson',
        data: "../data/tracts.json"
    });
    map.addLayer({
        id: 'tract',
        source: 'tracts',
        type: 'fill',
        paint: {
            'fill-opacity': 0.8,
            'fill-color': '#a3b9ff',
            'fill-outline-color': '#155ca3'
        }
    });
    map.addSource('neighborhoods', {
        type: 'geojson',
        data: "../data/neighborhoods.json"
    });
    map.addLayer({
        id: 'neighbor',
        source: 'neighborhoods',
        type: 'fill',
        paint: {
            'fill-opacity': 0.5,
            'fill-color': '#d1eef5',
            'fill-outline-color': '#36485a'
        }
    });  
}));
map.on('click', function(e) {
    // The event object (e) contains information like the
    // coordinates of the point on the map that was clicked.
    console.log('A click event has occurred at ' + e.lngLat);
    $("#myModal").modal("toggle");
    });