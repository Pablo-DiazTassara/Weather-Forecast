//constantes
const dataInicial = {    
    modal: { 
        flag: false, 
        msg: '',
        error: false,
        push: null 
    }
}


//types
const SET_MODAL = 'SET_MODAL';

//reducer
export default function modalReducer(state = dataInicial, action) {
    switch (action.type) {       
        case SET_MODAL:           
            return { ...state, modal: action.payload }
        default:
            return state
    }
}





export const setModalAction = (bool, msg, error, push) => (dispatch) => {

    console.log('modal ',msg)

    var modal =
    {
        flag: bool,
        msg: msg,
        push:push,
        error:error
    }

    //console.log('modal ',modal);

    dispatch({
        type: SET_MODAL,
        payload: modal
    })
}