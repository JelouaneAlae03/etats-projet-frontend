const INITIAL_STATE = {
    isShow: false,
    currentEtat: null,
    data: [],
    selectedOptions: {},
    distinctValues: [],
    isLoading: false
}

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'MODAL_SHOW':
            return{...state, isShow: action.payload.show};
        case 'CURRENT_ETAT':
            return{...state, currentEtat: action.payload.current_etat};
        case 'ADD_DATA':
            return{...state, data: action.payload.data};
        case 'ADD_SELECTED':
            return{...state, selectedOptions: {...state.selectedOptions, [action.payload.key]: action.payload.value}};
        case 'EMPTY_SELECTED':
            return{...state, selectedOptions: {}};
        case 'LOADING':
            return{...state, isLoading: action.payload.value};
        case 'DISTINCT_VALUES':
            const distinctValues = action.payload.keys.reduce((acc, key) => {
                const seen = new Set();
                const distinctObjects = action.payload.array.filter(item => {
                    const value = item[key];
                    if(value === null){
                        return false;
                    }
                    if (seen.has(value)) {
                        return false;
                    }
                    seen.add(value);
                    return true;
                });
                acc[key] = distinctObjects;
                return acc;
            }, {});
            return{...state, distinctValues: distinctValues};
        default:
            return state;
    }
}