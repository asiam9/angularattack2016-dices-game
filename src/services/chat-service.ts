import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';
import {CHAT_MESSAGE_IN} from '../constants/chat';

@Injectable()
export class ChatService {
    socket: any;

    constructor(ngRedux: NgRedux<IAppState>) {
        this.socket = require('socket.io-client')('http://localhost:1337');

        this.socket.on('CHAT_MESSAGE_IN', payload => {
            ngRedux.dispatch({
                type: CHAT_MESSAGE_IN,
                payload
            });
        });
    }

    sendMessage(body) {
        this.socket.emit('CHAT_MESSAGE_OUT', {
            body
        });
    }
}
