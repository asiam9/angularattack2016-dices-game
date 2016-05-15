import {Component} from '@angular/core';
import {DicesPlayersComponent} from '../components/players';
import {DicesBankComponent} from '../components/bank';
import {DicesWhoamiComponent} from '../components/whoami';
import {DicesHallOfFameComponent} from '../components/hallOfFame'

@Component({
    selector: 'dices-aside',
    directives: [DicesPlayersComponent, DicesBankComponent, DicesWhoamiComponent, DicesHallOfFameComponent],
    template: `
        <dices-whoami></dices-whoami>
        <dices-bank></dices-bank>
        <h2>Players</h2>
        <dices-players></dices-players>
        <br />
        <h2>HALL OF FAME</h2>
        <dices-hall-of-fame></dices-hall-of-fame>
    `,
    styles: [require('./aside.css')]
})
export class DicesAsideComponent {
}
