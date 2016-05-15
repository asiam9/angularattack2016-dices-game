import {Injectable} from '@angular/core';
import {SocketService} from './socket-service';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';
import {HALL_OF_FAME_UPDATE} from '../constants/hallOfFame';

@Injectable()
export class HallOfFameService {
    constructor(private socketService:SocketService,
                private ngRedux:NgRedux<IAppState>) {

        this.socketService.socket.on('HALLOFFAME_UPDATE', payload => {
            this.ngRedux.dispatch({
                type: HALL_OF_FAME_UPDATE,
                payload
            });
        });
    }
}
