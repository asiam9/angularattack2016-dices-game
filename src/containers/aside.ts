import {Component} from '@angular/core';
import {DicesPlayersComponent} from '../components/players';
import {DicesBankComponent} from '../components/bank';
import {DicesWhoamiComponent} from '../components/whoami';

@Component({
    selector: 'dices-aside',
    directives: [DicesPlayersComponent, DicesBankComponent, DicesWhoamiComponent],
    template: `
        <dices-whoami></dices-whoami>
        <dices-bank></dices-bank>
        <h2>Players</h2>
        <dices-players></dices-players>
    `,
    styles: [require('./aside.css')]
})
export class DicesAsideComponent {
}
