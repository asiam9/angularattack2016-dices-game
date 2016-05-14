import {fromJS} from 'immutable';
import {DICES_SELECT_DICE, DICES_DICE_BET, DICES_RESULTS, DICES_WIN, DICES_LOST} from '../constants/dices';

const INITIAL_STATE = fromJS({
    selectedDice: 0,
    diceBet: 0,
    status: 'none',
    results: {
        winners: [],
        correctDices: []
    }
});

function dices(state = INITIAL_STATE, action: any = { type: '' }) {
    switch(action.type) {
        case DICES_SELECT_DICE: {
            return state.merge({ selectedDice: action.payload.diceValue })
        }

        case DICES_DICE_BET: {
            return state.merge({ diceBet: action.payload.diceValue })
        }

        case DICES_RESULTS: {
            return state.merge({ selectedDice: 0, diceBet: 0, results: action.payload.results });
        }

        case DICES_WIN: {
            return state.merge({ status: 'WIN'});
        }

        case DICES_LOST: {
            return state.merge({ status: 'LOST'});
        }

        default: return state;
    }
}

export {dices};
