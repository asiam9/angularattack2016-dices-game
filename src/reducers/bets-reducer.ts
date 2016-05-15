import {fromJS} from 'immutable';
import {BETS_UPDATE} from '../constants/bets';

const INITIAL_STATE = fromJS([]);

function bets(state = INITIAL_STATE, action: any = { type: '' }) {
    switch(action.type) {
        case BETS_UPDATE: {
            return state.merge(action.payload);
        }

        default: return state;
    }
}

export {bets};
