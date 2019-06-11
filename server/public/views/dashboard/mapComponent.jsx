import React from 'react';
import MapboxClient from 'mapbox-gl'

export default class Map extends React.Component {

    constructor(props)
    {   
        super(props)

        this.state = {
            map: null
        }

        mapboxgl.accessToken = 'pk.eyJ1IjoibnM0bGluNHMiLCJhIjoiY2prZWVxcXdwNGJ6aTNzbnQ5M3hjNnQ5eSJ9.ffyXxE-KAav6Ftof4TwY0Q'
    }


    componentDidMount() 
    {   
        let self = this;
        this.setState({
            map : new mapboxgl.Map({
                container: 'map', // container id
                style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
                center: [-70.6506, -33.4372], // starting position [lng, lat]
                zoom: 10 // starting zoom
            })
        },() =>{

            var mag1 = ["<", ["get", "mag"], 1];
            var mag2 = ["all", [">=", ["get", "mag"], 1], ["<", ["get", "mag"], 5]];
            var mag3 = ["all", [">=", ["get", "mag"], 5], ["<", ["get", "mag"], 10]];
            var mag4 = ["all", [">=", ["get", "mag"], 10], ["<", ["get", "mag"], 15]];
            var mag5 = [">=", ["get", "mag"], 15];
        

            var colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];
 

            this.state.map.on('load',  () => { 
                
                self.state.map.addSource('earthquakes', {
                    "type": "geojson",
                    "data": self.props.data, //"https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
                    "cluster": true,
                    "clusterMaxZoom": 16,
                    "clusterRadius": 50,
                    // "clusterProperties": { // keep separate counts for each magnitude category in a cluster
                    // "mag1": ["+", ["case", mag1, 1, 0]],
                    // "mag2": ["+", ["case", mag2, 1, 0]],
                    // "mag3": ["+", ["case", mag3, 1, 0]],
                    // "mag4": ["+", ["case", mag4, 1, 0]],
                    // "mag5": ["+", ["case", mag5, 1, 0]]
                    // }
                });

                self.state.map.addLayer({
                    id: "clusters",
                    type: "circle",
                    source: "earthquakes",
                    filter: ["has", "point_count"],
                    paint: {
                    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                    // with three steps to implement three types of circles:
                    //   * Blue, 20px circles when point count is less than 100
                    //   * Yellow, 30px circles when point count is between 100 and 750
                    //   * Pink, 40px circles when point count is greater than or equal to 750
                        "circle-color": [
                            "step",
                            ["get", "point_count"],
                            "#51bbd6",
                            100,
                            "#f1f075",
                            750,
                            "#f28cb1"
                        ],
                        "circle-radius": [
                            "step",
                            ["get", "point_count"],
                            20,
                            100,
                            30,
                            750,
                            40
                        ],
                        "circle-opacity": 0.6
                    }
                });
                     
                self.state.map.addLayer({
                    id: "cluster-count",
                    type: "symbol",
                    source: "earthquakes",
                    filter: ["has", "point_count"],
                    
                    layout: {
                        
                    "text-field": "+",
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-size": 12
                    },
                    paint: {
                        "text-color": "white"
                    }
                });

                self.state.map.addLayer({
                    "id": "earthquake_circle",
                    "type": "circle",
                    "source": "earthquakes",
                    "filter": ["!=", "cluster", true],
                    "paint": {
                        "circle-color": ["case",
                        mag1, colors[0],
                        mag2, colors[1],
                        mag3, colors[2],
                        mag4, colors[3], colors[4]],
                        "circle-opacity": 0.6,
                        "circle-radius": 20
                    }
                });

                self.state.map.addLayer({
                    "id": "earthquake_label",
                    "type": "symbol",
                    "source": "earthquakes",
                    "filter": ["!=", "cluster", true],
                    "layout": {
                    "text-field": ["number-format", ["get", "mag"], {"min-fraction-digits": 0, "max-fraction-digits": 0}],
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-size": 10
                    },
                    "paint": {
                    "text-color": ["case", ["<", ["get", "mag"], 10], "black", "white"]
                    }
                });
                     
                // inspect a cluster on click
                self.state.map.on('click', 'clusters', function (e) {
                    var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
                    var clusterId = features[0].properties.cluster_id;
                    self.state.map.getSource('earthquakes').getClusterExpansionZoom(clusterId, function (err, zoom) {
                        if (err)
                            return;
                        
                        self.state.map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    });
                });
                    
                self.state.map.on('mouseenter', 'clusters', function () {
                    self.state.map.getCanvas().style.cursor = 'pointer';
                });
                
                self.state.map.on('mouseleave', 'clusters', function () {
                    self.state.map.getCanvas().style.cursor = '';
                });
            })
            

        }) 
    }

    render() 
    {
        return (
        
            <div >
                <div id="map" />
            </div>
        
        );
    }

}