



const dataInicial = { 
    loading: true
}


const SET_LOADING = 'SET_LOADING';


export default function spinnerReducer(state = dataInicial, action) {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: action.payload }
        
        default:
            return state
    }
}




export const loadingAction = (datos) => (dispatch) => {

    //console.log('loadingAction ',datos);

    dispatch({
        type: SET_LOADING,
        payload: datos
    })
}