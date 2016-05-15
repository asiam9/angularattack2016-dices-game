import {Component} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {BankService} from '../services/bank-service';

@Component({
    pipes: [AsyncPipe],
    selector: 'dices-bank',
    template: `
        <div>Your pot: {{pot$ | async}}</div>
        <div>Bank: {{bank$ | async}}</div>
    `,
    styles: [require('./bank.css')]
})
export class DicesBankComponent {
    private pot$: Observable<number>;
    private bank$: Observable<number>;

    constructor(
        ngRedux: NgRedux<IAppState>,
        bankService: BankService // instantiating service because its not by bootstrap()!
    ) {
        this.pot$ = ngRedux.select(n => n.bank.get('pot'));
        this.bank$ = ngRedux.select(n => n.bank.get('bank'));
    }
}
