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
        
        
        var map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [-70.6506, -33.4372], // starting position [lng, lat]
            zoom: 11 // starting zoom
        })

        map.on('load',  () => { 
            console.log('loaded map..')
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
                <div style={{height:250+ 'px'}}>
                    <div id="map" />
                </div>
        //     </div>
        //   </div>
        );
    }

}