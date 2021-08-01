import axios from 'axios'

//inicialización constantes
const dataInicial = {
    cities: [],
    city: {id:3433955,name:"Ciudad Autónoma de Buenos Aires"}
}

const GET_CITIES_SUCCES = 'GET_CITIES_SUCCES';
const SET_CITY = 'SET_CITY';


//Reducer
export default function citiesReducer(state = dataInicial, action) {
    switch (action.type) {
        case GET_CITIES_SUCCES:
            return { ...state, cities: action.payload }
        case SET_CITY:
            return { ...state, city: action.payload }
        default:
            return state;
    }
}


//Acciones
export const getCities = () => async (dispatch) => {
    try {
        const res = await axios.get('city.list.json')
        dispatch({
            type: GET_CITIES_SUCCES,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const setContextCity = (city) => (dispatch) => {
    try {
        dispatch({
            type: SET_CITY,
            payload: city
        })
    } catch (error) {
        console.log(error)
    }
}

