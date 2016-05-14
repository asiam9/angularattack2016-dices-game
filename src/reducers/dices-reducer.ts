import {fromJS} from 'immutable';
import {DICES_SELECT_DICE, DICES_DICE_BET, DICES_RESULTS, DICES_STATUS_WIN, DICES_STATUS_LOST, DICES_STATUS_WAITING,
    DICES_RESET, DICES_STATUS_MISSED, DICES_STATUS_WAITING_FOR_NEXT_ROUND} from '../constants/dices';

const INITIAL_STATE = fromJS({
    selectedDice: 0,
    diceBet: 0,
    status: 'NONE',
    results: {
        winners: [],
        correctDices: []
    }
});

function dices(state = INITIAL_STATE, action: any = { type: '' }) {
    switch(action.type) {
        case DICES_SELECT_DICE: {
            return state.merge({ status: 'SELECTED', selectedDice: action.payload.diceValue });
        }

        case DICES_DICE_BET: {
            return state.merge({ status: 'WAITING', diceBet: action.payload.diceValue });
        }

        case DICES_RESULTS: {
            return state.merge({ results: action.payload.results });
        }

        case DICES_STATUS_WIN: {
            return state.merge({ status: 'WIN'});
        }

        case DICES_STATUS_LOST: {
            return state.merge({ status: 'LOST'});
        }

        case DICES_STATUS_WAITING: {
            return state.merge({ status: 'WAITING'});
        }

        case DICES_STATUS_MISSED: {
            return state.merge({ status: 'MISSED'});
        }

        case DICES_RESET: {
            return state.merge({ diceBet: 0, selectedDice: 0 });
        }
        case DICES_STATUS_WAITING_FOR_NEXT_ROUND: {
            return state.merge({ status: 'WAITING_FOR_NEXT_ROUND'});
        }

        default: return state;
    }
}

export {dices};
