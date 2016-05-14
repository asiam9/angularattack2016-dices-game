import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';
import {CHAT_MESSAGE_IN} from '../constants/chat';
import {SocketService} from '../services/socket-service';

@Injectable()
export class ChatService {
    constructor(
        private socketService: SocketService,
        ngRedux: NgRedux<IAppState>
    ) {
        socketService.socket.on('CHAT_MESSAGE_IN', payload => {
            ngRedux.dispatch({
                type: CHAT_MESSAGE_IN,
                payload
            });
        });
    }

    sendMessage(body) {
        this.socketService.socket.emit('CHAT_MESSAGE_OUT', {
            body
        });
    }
}
