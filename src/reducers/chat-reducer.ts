import {fromJS} from 'immutable';
import {CHAT_MESSAGE_IN} from '../constants/chat';

const INITIAL_STATE = fromJS({
    messages: []
});

function chat(state = INITIAL_STATE, action = { type: '', payload: {}}) {
    switch(action.type) {
        case CHAT_MESSAGE_IN: {
            return state.updateIn(['messages'], messages => messages.push(action.payload));
        }

        default: return state;
    }   
}

export {chat};
