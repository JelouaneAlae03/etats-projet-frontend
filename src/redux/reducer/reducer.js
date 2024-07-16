const INITIAL_STATE = {
    isShow: false,
    currentEtat: null
}

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'MODAL_SHOW':
            return{...state, isShow: action.payload.show};
        case 'CURRENT_ETAT':
            return{...state, currentEtat: action.payload.current_etat};
        default:
            return state;
    }
}