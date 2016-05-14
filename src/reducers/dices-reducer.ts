import {fromJS} from 'immutable';
import {DICES_SELECT_DICE} from '../constants/dices';

const INITIAL_STATE = fromJS({
    selectedDice: 0
});

function dices(state = INITIAL_STATE, action: any = { type: '' }) {
    switch(action.type) {
        case DICES_SELECT_DICE: {
            return state.merge({ selectedDice: action.payload.diceValue })
        }

        default: return state;
    }
}

export {dices};

