import { getAllGeoJson } from "../services/api";

export const GeoJsonRequest = () => ({
    type: 'FETCH_GEO_JSON_REQUEST',
});

export const GeoJsonSuccess = (data) => ({
    type: 'FETCH_GEO_JSON_SUCCESS',
    payload: data,
});

export const GeoJsonFailure = (data) => ({
    type: 'FETCH_GEO_JSON_FAILURE',
    payload: data,
});

export const fetchGeoJsons = (userId) => {
    return async (dispatch) => {
        try {
            let data_retries = 1;
            dispatch(GeoJsonSuccess([]));
            while (data_retries < 4) {
                dispatch(GeoJsonRequest());
                await getAllGeoJson(userId)
                    .then((response) => {
                        const geoJsons = response.data;
                        console.log(geoJsons);
                        if (geoJsons === null || geoJsons.length == 0) {
                            dispatch(GeoJsonSuccess([]));
                        } else {
                            dispatch(GeoJsonSuccess(geoJsons));
                        }
                        data_retries = 4;
                    }).catch((err) => {
                        data_retries++;
                    });
            }
        } catch (err) {
            dispatch(GeoJsonFailure(err));
        }
    };
};