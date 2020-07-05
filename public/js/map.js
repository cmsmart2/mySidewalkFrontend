mapboxgl.accessToken ='pk.eyJ1IjoiY21zbWFydDIiLCJhIjoiY2tjOWc0bWNyMDltajJ4b3k3NWFkcG91ZCJ9.GYrE44S67losP_k-ZaZohA';
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
map.on('click', 'neighbor', function(e) {
    // The event object (e) contains information like the
    // coordinates of the point on the map that was clicked.
    console.log('A click event has occurred at ' + e.lngLat);
    console.log(e.features[0])
    let drive =e.features[0].properties["pop-commute-drive_alone"]
    let carpool = e.features[0].properties["pop-commute-drive_carpool"]
    let public = e.features[0].properties["pop-commute-public_transit"]
    let walk = e.features[0].properties["pop-commute-walk"]
    let title = e.features[0].properties["shid"]


    var myChart = Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: title.split("neighborhood:")[1].replace(/_/g, " ")
        },
        xAxis: {
            categories: ['Drive-Alone', 'Drive-Carpool', 'Public Transit', 'Walk']
        },
        yAxis: {
            title: {
                text: 'Population'
            }
        },
        series: [{
            name: 'Neighboorhoods',
            data: [drive, carpool, public, walk]
        }]
    });
    
    $("#myModal").modal("toggle");
    });