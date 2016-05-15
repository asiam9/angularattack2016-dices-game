import {combineReducers} from 'redux';
import {dices} from './dices-reducer';
import {chat} from './chat-reducer';
import {players} from './players-reducer';
import {user} from './user-reducer';
import {bank} from './bank-reducer';

export default combineReducers({dices, chat, players, user, bank});

