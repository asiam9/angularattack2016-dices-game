import {Component} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';
import {PlayersService} from '../services/players-service';

@Component({
    selector: 'dices-players',
    template: `
        <div class="player" *ngFor="let player of playersList">
            <span class="avatar material_icons">account_box</span>
            <span class="username">{{ player.username }}</span>
            <span class="score">{{ player.score }}</span>
        </div>
    `,
    styles: [require('./players.css')],
})
export class DicesPlayersComponent {
    private playersList = [];

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private playersService: PlayersService // creating instance of service!!1
    ) {
        ngRedux.select(n => n.players.get('playersList'))
            .subscribe((playersList: any) => { this.playersList = playersList.toJS(); });
    }
}
