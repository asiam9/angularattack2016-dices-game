import {Component} from '@angular/core';
import {DicesPlayersComponent} from '../components/players';

@Component({
    selector: 'dices-aside',
    directives: [DicesPlayersComponent],
    template: `
        <h2>Players</h2>
        <dices-players></dices-players>
    `,
    styles: [require('./aside.css')]
})
export class DicesAsideComponent {
}
