document.addEventListener('DOMContentLoaded', function () {
    var myChart = Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Commuter Population Attributes'
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
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
});