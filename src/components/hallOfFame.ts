import {Component} from '@angular/core';
import {HallOfFameService} from '../services/hallOfFame-service';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';

@Component({
    selector: 'dices-hall-of-fame',
    template: `
        <div class="player" *ngFor="let player of playersList">
            <span class="avatar material_icons">star_rate</span>
            <span class="username">{{ player.username }}</span>
            <span class="pot"><small>Rounds {{ player.rounds }}</small> <i>&#36;{{ player.pot }}</i></span>
        </div>
    `,
    styles: [require('./players.css')]
})
export class DicesHallOfFameComponent {
    private playersList;

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private hallOfFameService: HallOfFameService // creating instance of service!!1
    ) {
        ngRedux.select('hallOfFame')
            .subscribe((playersList: any) => { this.playersList = playersList.toJS(); });
    }
}
