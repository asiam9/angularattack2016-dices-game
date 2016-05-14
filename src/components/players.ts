import {Component} from '@angular/core';

@Component({
    selector: 'dices-players',
    template: `
        <div class="player" *ngFor="let player of players">
            <span class="avatar material_icons">account_box</span>
            <span>{{ player.name }}</span>
            <span class="score">{{ player.score }}</span>
        </div>
    `,
    styles: [require('./players.css')],
})
export class DicesPlayersComponent {
    private players = [];

    constructor() {
        this.players = [{
            name: 'Foo',
            score: 1000
        }, {
            name: 'Foo',
            score: 1000
        }, {
            name: 'Foo',
            score: 1000
        }, {
            name: 'Foo',
            score: 1000
        }, {
            name: 'Foo',
            score: 1000
        }];
    }
}

