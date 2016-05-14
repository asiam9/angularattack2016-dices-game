import {Component} from '@angular/core';
import {NgClass} from '@angular/common';
import {DicesDiceComponent} from "../components/dice";
import {IAppState} from '../app-state';
import {NgRedux} from 'ng2-redux';
import {DICES_SELECT_DICE} from '../constants/dices';

@Component({
    selector: 'dices-choose-dice',
    directives: [DicesDiceComponent, NgClass],
    template: `        
        <div class="option" *ngFor="let diceValue of dicesValues"
            (click)="chooseDice(diceValue)"
            [ngClass]="{ active: checkIsActive(diceValue) }">
            <dice value="{{diceValue}}"></dice>
        </div>
    `,
    styles: [require('./choose-dice.css')]
})
export class DicesChooseDiceComponent {
    private dicesValues = [1, 2, 3, 4, 5, 6];
    private selectedDice;

    constructor(private ngRedux: NgRedux<IAppState>) {
        this.ngRedux.select(n => n.dices.get('selectedDice'))
            .subscribe((selectedDice: any) => { this.selectedDice = selectedDice; });
    }

    checkIsActive(diceValue) {
        return this.selectedDice == diceValue;
    }

    chooseDice(diceValue) {
        this.ngRedux.dispatch({
            type: DICES_SELECT_DICE,
            payload: {
                diceValue
            }
        })
    }
}
