import {fromJS} from 'immutable';
import {BANK_UPDATE, BANK_POT_UPDATE} from '../constants/bank';

const INITIAL_STATE = fromJS({
    bank: 0,
    pot: 0
});

function bank(state = INITIAL_STATE, action: any = { type: '' }) {
    switch(action.type) {
        case BANK_UPDATE: {
            return state.merge(action.payload);
        }

        case BANK_POT_UPDATE: {
            return state.merge(action.payload);
        }

        default: return state;
    }
}

export {bank};

