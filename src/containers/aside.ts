import {Component} from '@angular/core';
import {DicesPlayersComponent} from '../components/players';
import {DicesBankComponent} from '../components/bank';

@Component({
    selector: 'dices-aside',
    directives: [DicesPlayersComponent, DicesBankComponent],
    template: `
        <h2>Bank</h2>
        <dices-bank></dices-bank>
        <h2>Players</h2>
        <dices-players></dices-players>
    `,
    styles: [require('./aside.css')]
})
export class DicesAsideComponent {
}
