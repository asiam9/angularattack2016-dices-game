import {Injectable} from '@angular/core';
import {SocketService} from './socket-service';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';
import {USER_LOGGED_IN} from '../constants/user';

@Injectable()
export class UserService {
    constructor(
        private socketService: SocketService,
        private ngRedux: NgRedux<IAppState>
    ){
        this.socketService.socket.on('USER_LOGGED_IN', userdata => {
            this.ngRedux.dispatch({
                type: USER_LOGGED_IN,
                payload: userdata
            });
        });
    }

    login(username) {
        this.socketService.socket.emit('USER_LOGIN', {
            username
        });
    }
}
