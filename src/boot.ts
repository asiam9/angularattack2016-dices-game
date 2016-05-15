import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');
import 'ts-helpers';

import {enableProdMode} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {createStore, applyMiddleware} from 'redux';
import {provider} from 'ng2-redux';
import {Iterable} from 'immutable';
import rootReducer from './reducers';
const thunk = require('redux-thunk').default;
import {SocketService} from './services/socket-service';
import {ChatService} from './services/chat-service';
import {UserService} from './services/user-service';
import {PlayersService} from './services/players-service';
import {DicesService} from './services/dices-service';
import {BankService} from './services/bank-service';
import {HallOfFameService} from './services/hallOfFame-service';

const stateTransformer = (state) => {
    const newState = {};
    for (let i of Object.keys(state)) {
        newState[i] = Iterable.isIterable(state[i]) ? state[i].toJS() : state[i];
    }
    return newState;
};

/*const logger = require('redux-logger')({
    level: 'info',
    collapsed: true,
    stateTransformer
});*/

const store = applyMiddleware(thunk/*, logger*/)(createStore)(rootReducer, {});

import {AppComponent} from './app';

enableProdMode();

bootstrap(AppComponent, [
    provider(store),
    SocketService,
    ChatService,
    UserService,
    PlayersService,
    DicesService,
    BankService,
    HallOfFameService
]);
