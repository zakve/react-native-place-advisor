import { ADD_PLACE, SET_PLACES } from "./places-actions";
import Place from "../models/place";

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACES:
            const rows = action.places;
            let places = []
            for (let i = 0; i < rows.length; i++) {
                var place = rows.item(i);
                places.push(new Place(place.id.toString(), place.title, place.imageUri, place.lat, place.lng))
            }
            return {
                places: places
            }
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.image,
                action.placeData.coords.lat,
                action.placeData.coords.lng,
            );
            return {
                places: state.places.concat(newPlace)
            }
        default:
            return state;
    }
}
