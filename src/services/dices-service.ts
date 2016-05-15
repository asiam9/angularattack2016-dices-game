import {Injectable} from '@angular/core';
import {SocketService} from './socket-service';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';
import {DICES_DICE_BET, DICES_RESULTS, DICES_STATUS_WIN, DICES_STATUS_LOST, DICES_RESET,
    DICES_STATUS_MISSED, DICES_STATUS_WAITING_FOR_NEXT_ROUND} from '../constants/dices';

@Injectable()
export class DicesService {
    private socket;
    private diceBet;

    constructor(
        private socketService: SocketService,
        private ngRedux: NgRedux<IAppState>
    ){
        ngRedux.select(n => n.user.get('socket'))
            .subscribe(socket => {
                this.socket = socket;
            });

        ngRedux.select(n => n.dices.get('endTime'))
            .subscribe(endTime => {
                if(!endTime) {
                    this.ngRedux.dispatch({
                        type: DICES_STATUS_WAITING_FOR_NEXT_ROUND
                    });
                }
            });

        ngRedux.select(n => n.dices.get('diceBet'))
            .subscribe(diceBet => {
                this.diceBet = diceBet;
            });

        ngRedux.select(n => n.dices.get('results'))
            .subscribe((results:any) => {
                const _results = results.toJS();

                if(this.diceBet) {
                    if (_results.winners.indexOf(this.socket) !== -1) {
                        this.ngRedux.dispatch({
                            type: DICES_STATUS_WIN
                        });
                    } else {
                        this.ngRedux.dispatch({
                            type: DICES_STATUS_LOST
                        });
                    }
                } else if(_results.correctDices.length) {
                    this.ngRedux.dispatch({
                        type: DICES_STATUS_MISSED
                    });
                }

                setTimeout(() => {
                    this.ngRedux.dispatch({
                        type: DICES_RESET
                    });
                });
            });

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
