import {Component} from '@angular/core';
import {DicesDiceComponent} from '../components/dice';

@Component({
    selector: 'dices',
    directives: [DicesDiceComponent],
    template: `
        <dice value="1"></dice>
        <dice value="2"></dice>
        <dice value="3"></dice>
        <dice value="4"></dice>
        <dice value="5"></dice>
        <dice value="6"></dice>
    `,
    styles: [require('./dices.css')]
})
export class DicesComponent {}
