import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DailyForecas from '../dailyForecast/dailyForecas'
import { useDispatch, useSelector } from 'react-redux';

//import de acciones de redux
import { getWeatherByCityId, getWeatherByLatLong, getForecastByLatLong, getForecastByCityId } from '../../redux/weatherDuck';
import { getCities, setContextCity } from '../../redux/citiesDuck';

import Icons from "../utils/icons";

import './weatherForecast.css'

import cloud from '../../assets/images/cloud.jpg';
import clear from '../../assets/images/clear.jpg';
import rain from '../../assets/images/rain.jpg';
import thunderstorm from '../../assets/images/thunderstorm.jpg';
import smoke from '../../assets/images/smoke.jpg';



const WeatherForecast = () => {
    const [city, setCity] = useState({});
    const [geo, setGeo] = useState(true);
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');

    const dispatch = useDispatch();

    const currentWeather = useSelector(store => store.weather.currentWeather);
    console.log('currentWeather ', currentWeather)

    const cities = useSelector(store => store.cities.cities);
    const contextCity = useSelector(store => store.cities.city);

    // Nombre para las imagenes de fondo
    var weathericons = {
        "Clouds": cloud,
        "Clear": clear,
        "Drizzle": rain,
        "Rain": rain,
        "Thunderstorm": thunderstorm,
        "Smoke": smoke
    };

    const imageFile = weathericons[Object.keys(currentWeather).length > 0 ? currentWeather.weather[0].main : "Clear"];
    const style =
    {
        backgroundImage: `url('${imageFile}')`,
        backgroundSize: 'cover',
        borderRadius: '20px',
        boxShadow: '25px 25px 40px 0px rgba(0, 0, 0, 0.33)',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative'
    };



    useEffect(() => {
        if (geo) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });

            if (lat != '' && long != '') {
                dispatch(getWeatherByLatLong(lat, long));
                dispatch(getForecastByLatLong(lat, long));
            }


        } else {
            dispatch(getWeatherByCityId(contextCity.id));
            dispatch(getForecastByCityId(contextCity.id));

        }

        dispatch(getCities());

    }, [dispatch, lat, long, city])


    const handleChangeCity = (event, key) => {

        var selectedCity = { ...city };
        selectedCity['id'] = key.props.value;
        selectedCity['name'] = key.props.name;
        setCity(selectedCity);
        dispatch(setContextCity(selectedCity));
        setGeo(false);

    };

    var fecha = new Date();
    var options = { weekday: 'long', day: 'numeric', month: 'long' };
    var fechaFormato = fecha.toLocaleDateString("es-ES", options);


    return (
        <div >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={city.id}
                    onChange={handleChangeCity}
                >
                    {cities.length > 0 ? cities.map((city) =>
                        <MenuItem value={city.id} key={city.id} name={city.name}>{city.name}</MenuItem>
                    ) : null

                    }
                </Select>
            </FormControl>
            <Card className='main' style={style}>
                {Object.keys(currentWeather).length > 0 ? (
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justifyContent="space-around"
                        >
                            <Grid item xs={9} >
                                <Typography
                                    variant="h1"
                                    className="titleh1"
                                    align='left'
                                >
                                    {contextCity.name.substring(0, 16)}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography
                                    variant="h1"
                                    className="titleh2"
                                    align='right'
                                >
                                    {Math.round(currentWeather.main.temp)}°
                                </Typography>
                                <Typography
                                    variant="h5"
                                    className="titleh2"
                                    align='right'
                                >
                                    {Math.round(currentWeather.main.temp_min)}°/{Math.round(currentWeather.main.temp_max)}°
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justifyContent="space-around"
                        >
                            <Grid item xs={4} >
                                <Typography
                                    variant="h4"
                                    className="titleh2"
                                >
                                    {fechaFormato}
                                </Typography>
                            </Grid>
                            <Grid item xs={2} >
                                <Icons weatherMain={currentWeather.weather[0].main} />
                            </Grid>
                            <Grid item xs={4} >
                                <Typography
                                    variant="h2"
                                    className="titleh2"
                                    align='right'
                                >
                                    {currentWeather.weather[0].description}
                                </Typography>
                            </Grid>
                        </Grid>
                        <DailyForecas />
                    </CardContent>
                ) : (null)
                }
            </Card>
        </div>










    )
}

export default WeatherForecast