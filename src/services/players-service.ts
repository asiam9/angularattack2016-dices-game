import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';
import {SocketService} from '../services/socket-service';
import {PLAYERS_PLAYER_JOIN, PLAYERS_PLAYER_LEAVE, PLAYERS_LIST} from '../constants/players';
import {BANK_POT_UPDATE} from '../constants/bank';

@Injectable()
export class PlayersService {
    private socket;

    constructor(
        socketService: SocketService,
        ngRedux: NgRedux<IAppState>
    ) {
        ngRedux.select(n => n.user.get('socket'))
            .subscribe(socket => {
                this.socket = socket;
            });

        socketService.socket.on('PLAYERS_LIST', payload => {
            ngRedux.dispatch({
                type: PLAYERS_LIST,
                payload
            });

            const player = payload.filter(_ => _.socket == this.socket);

            if(player.length) {
                ngRedux.dispatch({
                    type: BANK_POT_UPDATE,
                    payload: {
                        pot: player[0].pot
                    }
                });
            }
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
