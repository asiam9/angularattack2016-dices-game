import {Injectable} from '@angular/core';
import {SocketService} from './socket-service';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';
import {DICES_DICE_BET, DICES_RESULTS} from '../constants/dices';

@Injectable()
export class DicesService {
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
