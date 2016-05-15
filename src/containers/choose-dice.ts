import {Component} from '@angular/core';
import {NgClass} from '@angular/common';
import {DicesDiceComponent} from "../components/dice";
import {IAppState} from '../app-state';
import {NgRedux} from 'ng2-redux';
import {DICES_SELECT_DICE} from '../constants/dices';
import {DicesService} from '../services/dices-service';

@Component({
    selector: 'dices-choose-dice',
    directives: [DicesDiceComponent, NgClass],
    template: `        
        <h2>Type dice:</h2>
        <div class="option" *ngFor="let diceValue of dicesValues"
            (click)="chooseDice(diceValue)"
            [ngClass]="{ active: checkIsActive(diceValue) }">
            <dice value="{{diceValue}}"></dice>
            <div class="fancy-circle"></div>
        </div>
      <button (click)="betAtDice()" [disabled]="diceBet || !selectedDice" class="betBtn">BET AT YOUR LUCK!</button>
    `,
    styles: [require('./choose-dice.css')]
})
export class DicesChooseDiceComponent {
    private dicesValues = [1, 2, 3, 4, 5, 6];
    private selectedDice;
    private diceBet;

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private dicesService: DicesService
    ) {
        this.ngRedux.select(n => n.dices.get('selectedDice'))
            .subscribe((selectedDice: Number) => { this.selectedDice = selectedDice; });

        this.ngRedux.select(n => n.dices.get('diceBet'))
            .subscribe((diceBet: Number) => { this.diceBet = diceBet; });
    }

    checkIsActive(diceValue) {
        return this.selectedDice == diceValue;
    }
    chooseDice(diceValue) {
        if(this.diceBet) return false;

        this.ngRedux.dispatch({
            type: DICES_SELECT_DICE,
            payload: {
                diceValue
            }
        });
    }

    betAtDice() {
        this.dicesService.betAtDice(this.selectedDice);
    }
}
