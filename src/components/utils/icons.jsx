import React from 'react'
import { CardMedia } from '@material-ui/core'

import suncon from '../../assets/images/suncon.png';
import cloudcon from '../../assets/images/cloudycon.png';
import lightraincon from '../../assets/images/lightraincon.png';
import lightningcon from '../../assets/images/lightningcon.png';
import heavyraincon from '../../assets/images/heavyraincon.png';
import smokecon from '../../assets/images/smokecon.png';

export default function Icons(porps) {

    // Nombre para los weather icons
    var weathericons = {
        "Clouds": cloudcon,
        "Clear": suncon,
        "Drizzle": lightraincon,
        "Rain": heavyraincon,
        "Thunderstorm": lightningcon,
        "Smoke": smokecon,
        "Snow": lightraincon

    };

    return (
        <CardMedia
            className='image'
            component="img"
            alt="Sun"
            image={weathericons[porps.weatherMain]}

        />
    )
}