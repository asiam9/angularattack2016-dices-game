import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';
import {SocketService} from '../services/socket-service';
import {PLAYERS_PLAYER_JOIN, PLAYERS_PLAYER_LEAVE, PLAYERS_LIST} from '../constants/players';

@Injectable()
export class PlayersService {
    private socketService;

    constructor(
        socketService: SocketService,
        ngRedux: NgRedux<IAppState>
    ) {
        socketService.socket.on('PLAYERS_LIST', payload => {
            ngRedux.dispatch({
                type: PLAYERS_LIST,
                payload
            })
        });

        socketService.socket.on('PLAYER_JOIN', payload => {
            ngRedux.dispatch({
                type: PLAYERS_PLAYER_JOIN,
                payload
            })
        });

        socketService.socket.on('PLAYER_LEAVE', payload => {
            ngRedux.dispatch({
                type: PLAYERS_PLAYER_LEAVE,
                payload
            })
        });
    }
}
