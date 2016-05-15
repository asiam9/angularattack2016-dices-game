import {fromJS} from 'immutable';
import {PLAYERS_PLAYER_JOIN, PLAYERS_PLAYER_LEAVE, PLAYERS_LIST} from '../constants/players';

const INITIAL_STATE = fromJS([]);

function players(state = INITIAL_STATE, action: any = { type: '' }) {
    switch(action.type) {
        case PLAYERS_LIST: {
            return fromJS(action.payload);
        }
        case PLAYERS_PLAYER_JOIN: {
            return state.push(action.payload);
        }

        case PLAYERS_PLAYER_LEAVE: {
            return state.filter(player => player.id !== action.payload.id);
        }

        default: return state;
    }
}

export {players};
