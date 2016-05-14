import {Injectable} from '@angular/core';
import {SocketService} from './socket-service';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';
import {DICES_DICE_BET, DICES_RESULTS, DICES_WIN, DICES_LOST} from '../constants/dices';

@Injectable()
export class DicesService {
    private socket;

    constructor(
        private socketService: SocketService,
        private ngRedux: NgRedux<IAppState>
    ){
        this.socketService.socket.on('RESULTS', results => {
            this.ngRedux.dispatch({
                type: DICES_RESULTS,
                payload: {
                    results
                }
            });
        });

        ngRedux.select(n => n.user.getIn(['userdata','socket']))
            .subscribe(socket => {
                this.socket = socket;
            });

        ngRedux.select(n => n.dices.getIn(['results', 'winners']))
            .subscribe(winners => {
                if (winners.toJS().indexOf(this.socket) !== -1) {
                    this.ngRedux.dispatch({
                        type: DICES_WIN
                    });
                } else {
                    this.ngRedux.dispatch({
                        type: DICES_LOST
                    });
                }
            });
    }

    betAtDice(diceValue) {
        this.socketService.socket.emit('DICE_BET', {
            diceValue
        });

        this.ngRedux.dispatch({
            type: DICES_DICE_BET,
            payload: {
                diceValue
            }
        });
    }
}
