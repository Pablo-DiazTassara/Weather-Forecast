import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import weatherReducer from './weatherDuck'
import spinnerReducer from './spinnerDuck'
import modalReducer from './modalDuck'
import citiesReducer from './citiesDuck'

const rootReducer = combineReducers({
    weather: weatherReducer,
    spinner: spinnerReducer,
    modal:modalReducer,
    cities:citiesReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return store
}