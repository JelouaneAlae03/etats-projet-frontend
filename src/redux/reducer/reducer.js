const INITIAL_STATE = {
    isShow: false,
    currentEtat: null,
    data: [],
    selectedOptions: {},
    distinctValues: [],
    isLoading: false,
    selectedFields: {},
    searchTerm: '',
    filteredData: [],
    processedData: [],
    columns: [],
    visibleColumns: []
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
        case 'ADD_SELECTED_FIELDS':
            const initialVisibilityState = {};
            const fields = action.payload.fields;

            // Check if fields is an object
            if (typeof fields === 'object' && fields !== null) {
                Object.keys(fields).forEach((attribute, x) => {
                    if (x > 9) {
                        initialVisibilityState[attribute] = false;
                    } else {
                        initialVisibilityState[attribute] = true;
                    }
                });
            } else {
                console.error("action.payload.fields is not an object:", fields);
            }
            return{...state, selectedFields: initialVisibilityState};
        case 'CHANGE_SELECTED_FIELDS':
            return{...state, selectedFields: {...state.selectedFields, [action.payload.key]: !state.selectedFields[action.payload.key]}};
        case 'FALSE_SELECTED_FIELDS':
            const resetSelectedFields = Object.keys(state.selectedFields).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {});
            return{...state, selectedFields: resetSelectedFields};
        case 'TRUE_SELECTED_FIELDS':
            const trueSelectedFields = Object.keys(state.selectedFields).reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {});
            return{...state, selectedFields: trueSelectedFields};
        case 'CHANGE_SEARCH_TERM':
            return{...state, searchTerm: action.payload.value};
        case 'ADD_FILTERED_DATA':
            return{...state, filteredData: action.payload.value};
        case 'ADD_PROCESSED_DATA':
            return{...state, processedData: action.payload.data};
        case 'ADD_COLUMNS':
            return{...state, columns: action.payload.data};
        case 'ADD_VISIBLE_COLUMNS':
            return{...state, visibleColumns: action.payload.data};
        default:
            return state;
    }
}