import {fromJS} from 'immutable';
import {USER_LOGGED_IN} from '../constants/user';

const INITIAL_STATE = fromJS({
    userdata: {
        username: ''
    }
});

function user(state = INITIAL_STATE, action: any = { type: '' }) {
    switch(action.type) {
        case USER_LOGGED_IN: {
            return state.mergeDeep({ userdata: { username: action.payload.username }});
        }

        default: return state;
    }
}

export {user};
