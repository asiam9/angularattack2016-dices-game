import {fromJS} from 'immutable';

const INITIAL_STATE = fromJS({
    foo: 'bar'
});

function dices(state = INITIAL_STATE, action = { type: ''}) {
    switch(action.type) {
        default: return state;
    }
}

export {dices};

