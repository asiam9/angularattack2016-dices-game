import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';
import {BANK_UPDATE} from '../constants/bank';
import {SocketService} from '../services/socket-service';

@Injectable()
export class BankService {
    constructor(
        private socketService: SocketService,
        ngRedux: NgRedux<IAppState>
    ) {
        socketService.socket.on('BANK_UPDATE', payload => {
            ngRedux.dispatch({
                type: BANK_UPDATE,
                payload
            });
        });
    }
}
