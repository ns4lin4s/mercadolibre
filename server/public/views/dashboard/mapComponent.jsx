import React from 'react';
import MapboxClient from 'mapbox-gl'

export default class Map extends React.Component {

    constructor(props)
    {
        console.log("constructor...")
        super(props)
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
    }

    componentDidMount() 
    {
        console.log("componentDidMount..")
        
        let self = this;
        var map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [-70.6506, -33.4372], // starting position [lng, lat]
            zoom: 11 // starting zoom
        })

        //map.addControl(new mapboxgl.NavigationControl());
        
        // filters for classifying earthquakes into five categories based on magnitude
        var mag1 = ["<", ["get", "mag"], 1];
        var mag2 = ["all", [">=", ["get", "mag"], 1], ["<", ["get", "mag"], 5]];
        var mag3 = ["all", [">=", ["get", "mag"], 5], ["<", ["get", "mag"], 10]];
        var mag4 = ["all", [">=", ["get", "mag"], 10], ["<", ["get", "mag"], 15]];
        var mag5 = [">=", ["get", "mag"], 15];
        

        var colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];
 

        map.on('load',  () => { 
            console.log('loaded map..')
            console.log(self.props.data)
            map.addSource('earthquakes', {
                "type": "geojson",
                "data": self.props.data, //"https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
                "cluster": true,
                "clusterRadius": 10,
                "clusterProperties": { // keep separate counts for each magnitude category in a cluster
                "mag1": ["+", ["case", mag1, 1, 0]],
                "mag2": ["+", ["case", mag2, 1, 0]],
                "mag3": ["+", ["case", mag3, 1, 0]],
                "mag4": ["+", ["case", mag4, 1, 0]],
                "mag5": ["+", ["case", mag5, 1, 0]]
                }
            });

            map.addLayer({
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
            map.addLayer({
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
        })
        // let setupScript = document.createElement('script');
        // setupScript.type = 'text/javascript';
        // setupScript.async = true;
        // setupScript.innerHTML = ``

    }

    render() 
    {
        return (
        // <div className="card shadow mb-4">
        //     <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        //         <h6 class="m-0 font-weight-bold text-primary">Estaciones</h6>
        //     </div>
        //     <div className="card-body">
                <div >
                    <div id="map" />
                </div>
        //     </div>
        //   </div>
        );
    }

}