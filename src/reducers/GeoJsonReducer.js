//maintaing the initial states for jobData
const initialState = {
    loading: false,
    geojsons: [],
    error: '',
}

const GeoJsonReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_GEO_JSON_REQUEST':
            return {
                ...state,
                loading: true,
            };

        case 'FETCH_GEO_JSON_SUCCESS':
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                geojsons: action.payload,
            };

        case 'FETCH_GEO_JSON_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}

export default GeoJsonReducer;