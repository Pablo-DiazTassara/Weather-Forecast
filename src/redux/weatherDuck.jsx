import axios from 'axios'
import { setContextCity } from './citiesDuck';

//inicialización constantes
const dataInicial = {
    currentWeather: {},
    forecastWeather: []
}

const GET_WEATHER_SUCCES = 'GET_WEATHER_SUCCES';
const GET_FORECAST_SUCCES = 'GET_FORECAST_SUCCES';



const URL_WEATHER = process.env.REACT_APP_URL_WEATHER;
const API_KEY = process.env.REACT_APP_API_KEY;
const LANG = process.env.REACT_APP_LANG;
const UNIT = process.env.REACT_APP_UNIT;

//Reducer
export default function weatherReducer(state = dataInicial, action) {
    switch (action.type) {
        case GET_WEATHER_SUCCES:
            return { ...state, currentWeather: action.payload }
        case GET_FORECAST_SUCCES:
            return { ...state, forecastWeather: action.payload }
        default:
            return state;
    }
}


//Acciones

/*
*Obtiene el pronostico del día para una ciudad
*parameters: id de la ciudad.
*/
export const getWeatherByCityId = (cityId) => async (dispatch, getState) => {

    try {
        const res = await axios.get(URL_WEATHER + 'weather?id=' + cityId + '&appid=' + API_KEY + '&lang=' + LANG + '&units=' + UNIT)
        dispatch({
            type: GET_WEATHER_SUCCES,
            payload: res.data
        })

    } catch (error) {
        console.log(error)
    }


}

/*
*Obtiene el pronostico del día para una ciudad
*parameters: latitud y longitud.
*/
export const getWeatherByLatLong = (lat, long) => async (dispatch, getState) => {

    try {
        const res = await axios.get(URL_WEATHER + 'weather?lat=' + lat + '&lon=' + long + '&appid=' + API_KEY + '&lang=' + LANG + '&units=' + UNIT)
        dispatch({
            type: GET_WEATHER_SUCCES,
            payload: res.data
        })

        //pongo la ciudad en contexto
        dispatch(dispatch(setContextCity({ id: '', name: res.data.name })));

    } catch (error) {
        console.log(error)
    }


}


/*
*Obtiene el pronostico de 5 días para una ciudad
*parameters: id de la ciudad.
*/
export const getForecastByCityId = (cityId) => async (dispatch, getState) => {

    try {
        const res = await axios.get(URL_WEATHER + 'forecast?id=' + cityId + '&appid=' + API_KEY + '&lang=' + LANG + '&units=' + UNIT)

        var i;
        var days = [];
        var list = res.data.list;

        for (i = 0; i < list.length; i += 8) {

            var fecha = new Date(list[i + 5].dt_txt);
            var options = { weekday: 'long', day: 'numeric' };
            var fechaFormato = fecha.toLocaleDateString("es-ES", options);
            var maxTemp = findMax(list, i);
            var minTemp = findMin(list, i, maxTemp);

            var temp = {
                fecha: fechaFormato,
                minTemp: Math.round(minTemp),
                maxTemp: Math.round(maxTemp),
                main: list[i].weather[0].main,
                description: list[i + 3].weather[0].description,
                icon: list[i].weather[0].icon
            };            
            days.push(temp);
        }

        dispatch({
            type: GET_FORECAST_SUCCES,
            payload: days
        })

    } catch (error) {
        console.log(error)
    }


}

/*
*Obtiene el pronostico de 5 días para una ciudad
*parameters: latitud y longitud.
*/
export const getForecastByLatLong = (lat, long) => async (dispatch, getState) => {

    try {
        const res = await axios.get(URL_WEATHER + 'forecast?lat=' + lat + '&lon=' + long + '&appid=' + API_KEY + '&lang=' + LANG + '&units=' + UNIT)

        var i;
        var days = [];
        var list = res.data.list;

        for (i = 0; i < list.length; i += 8) {
            var fecha = new Date(list[i + 5].dt_txt);
            var options = { weekday: 'long', day: 'numeric' };
            var fechaFormato = fecha.toLocaleDateString("es-ES", options);
            var maxTemp = findMax(list, i);
            var minTemp = findMin(list, i, maxTemp);

            var temp = {
                fecha: fechaFormato,
                minTemp: Math.round(minTemp),
                maxTemp: Math.round(maxTemp),
                main: list[i].weather[0].main,
                description: list[i + 3].weather[0].description,
                icon: list[i].weather[0].icon
            };            
            days.push(temp);
        }

        dispatch({
            type: GET_FORECAST_SUCCES,
            payload: days
        })

    } catch (error) {
        console.log(error)
    }


}


// Busca la temperatura máxima del día
const findMax = (weatherList, start) => {
    var i;
    var max = -20;
    for (i = start; i < start + 8; i++) {
        max = Math.max(max, weatherList[i].main.feels_like);
    }
    //max = ((max * 9/5) - 459.67).toFixed(1);
    return max;
}

// Busca la temperatura mínima del día
const findMin = (weatherList, start, maxTemp) => {
    var i;
    var min = maxTemp;
    for (i = start; i < start + 8; i++) {
        min = Math.min(min, weatherList[i].main.feels_like);
    }
    //min = ((min * 9/5) - 459.67).toFixed(1);
    return min;
}