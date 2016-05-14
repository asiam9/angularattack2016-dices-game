import {fromJS} from 'immutable';
import {PLAYERS_PLAYER_JOIN, PLAYERS_PLAYER_LEAVE, PLAYERS_LIST} from '../constants/players';

const INITIAL_STATE = fromJS({
    playersList: []
});

function players(state = INITIAL_STATE, action: any = { type: '' }) {
    switch(action.type) {
        case PLAYERS_LIST: {
            return state.setIn(['playersList'], fromJS(action.payload));
        }
        case PLAYERS_PLAYER_JOIN: {
            return state.updateIn(['playersList'], playersList => playersList.push(action.payload));
        }
        case PLAYERS_PLAYER_LEAVE: {
            return state.setIn(['playersList'], state.get('playersList').filter(_ => _.id !== action.payload.id));
        }

        default: return state;
    }
}

export {players};
