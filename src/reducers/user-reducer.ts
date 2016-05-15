import {fromJS} from 'immutable';
import {USER_LOGGED_IN} from '../constants/user';

const INITIAL_STATE = fromJS({
    username: ''
});

function user(state = INITIAL_STATE, action: any = { type: '' }) {
    switch(action.type) {
        case USER_LOGGED_IN: {
            return state.merge({
                id: action.payload.id,
                username: action.payload.username,
                socket: action.payload.socket
            });
        }

        default: return state;
    }
}

export {user};
