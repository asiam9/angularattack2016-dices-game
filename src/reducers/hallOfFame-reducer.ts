import {fromJS} from 'immutable';
import {HALL_OF_FAME_UPDATE} from '../constants/hallOfFame';

const INITIAL_STATE = fromJS([]);

function hallOfFame(state = INITIAL_STATE, action: any = { type: '' }) {
    switch(action.type) {
        case HALL_OF_FAME_UPDATE: {
            return state.merge(action.payload);
        }

        default: return state;
    }
}

export {hallOfFame};
