import { insertPlace, fetchPlaces } from "../helpers/db";

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image) => {
    return async dispatch => {
        try {
            const dbResult = await insertPlace(title, image, 'Dummy address', 15.6, 12.3)
            dispatch({ type: ADD_PLACE, placeData: { id: dbResult.insertId, title: title, image: image } });
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces()
            dispatch({ type: SET_PLACES, places: dbResult.rows })
        } catch (error) {
            throw error
        }
    }
}