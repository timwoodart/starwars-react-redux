import { combineReducers } from 'redux';
import { characterData } from './characterData';
import { UPDATE_PROFILE } from './StarWarsActions';

function characterReducer(state = {
    characterData
}, action) {
    switch (action.type) {
        default:
            return state
    }
}

function profileReducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_PROFILE:
            if (action.payload.error) {
                console.log('profile reducer received error data', action.payload.error)
                return state;
            } else {
                return {...state,
                    profileReducer: action.payload
                }
            }

        default:
            return state
    }
}


export default combineReducers({
  characterReducer,
  profileReducer
});