import {fromJS} from 'immutable';
import {PLAYERS_PLAYER_JOIN} from '../constants/players';

const INITIAL_STATE = fromJS({
    players_list: []
});

function players(state = INITIAL_STATE, action = { type: '', payload: {}}) {
    switch(action.type) {
        case PLAYERS_PLAYER_JOIN: {
            return state.updateIn(['players_list'], players_list => players_list.push(action.payload));
        }

        default: return state;
    }
}

export {players};
