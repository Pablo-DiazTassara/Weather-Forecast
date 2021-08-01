import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, Grid } from '@material-ui/core/';
import Icons from "../utils/icons";


import './dailyForecas.css';

const DailyForecas = () => {

  const forecastWeather = useSelector(store => store.weather.forecastWeather);

  console.log('forecastWeather ', forecastWeather);



  return (

    <div>
      {forecastWeather.length > 0 ?
        (
          <Grid container direction="row" justify="center" alignItems="center" className='container'>

            {forecastWeather.map((day) => (              
              <Grid item component={Card} className='card weather'>
                <CardContent>
                  <Icons weatherMain={day.main}/>
                  <Typography gutterBottom variant="h5" component="h2" align="center">
                    {day.minTemp + "°/" + day.maxTemp + "°"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center" component="p">
                    {day.fecha}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center">
                    {day.description}
                  </Typography>
                </CardContent>
              </Grid>
            ))}

          </Grid>

        ) : null}
    </div>

  );
}
export default DailyForecas;

