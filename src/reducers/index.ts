import {combineReducers} from 'redux';
import {dices} from './dices-reducer';
import {chat} from './chat-reducer';

export default combineReducers({dices, chat});
