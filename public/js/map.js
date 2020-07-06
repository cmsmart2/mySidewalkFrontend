//Leaving access token public for simplicity but have restricted URL access so you will need to go to Mapbox for your own token
mapboxgl.accessToken ='pk.eyJ1IjoiY21zbWFydDIiLCJhIjoiY2tjOWc0bWNyMDltajJ4b3k3NWFkcG91ZCJ9.GYrE44S67losP_k-ZaZohA';
//set up default map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-94.5786, 39.0997], // starting position [lng, lat]
    zoom: 9 // starting zoom
});
//function to load the map and add the layers from the JSON objects
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
//on click function that toggles the modal and displays the neighborhood and tract commute information 
map.on('click',  function(e) {
    let layers = map.queryRenderedFeatures(e.point, { layers: ['neighbor','tract'] });
    let neighborDrive =layers[0].properties["pop-commute-drive_alone"]
    let neighborCarpool = layers[0].properties["pop-commute-drive_carpool"]
    let neighborPublic = layers[0].properties["pop-commute-public_transit"]
    let neighborWalk = layers[0].properties["pop-commute-walk"]
    let title = layers[0].properties["shid"]
    let tractDrive =layers[1].properties["pop-commute-drive_alone"]
    let tractCarpool = layers[1].properties["pop-commute-drive_carpool"]
    let tractPublic = layers[1].properties["pop-commute-public_transit"]
    let tractWalk = layers[1].properties["pop-commute-walk"]
    //build the bar chart
    const myChart = Highcharts.chart('container', {
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
            data: [neighborDrive, neighborCarpool, neighborPublic, neighborWalk]
        }, {
            name: 'Tracts',
            data: [tractDrive, tractCarpool, tractPublic, tractWalk]
        }]
    });
    //toggle the modal
    $("#myModal").modal("toggle");
    });
    //exporting map to use in map.test.js
    // module.exports = map;