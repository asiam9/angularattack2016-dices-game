import {Component} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';

@Component({
    selector: 'dices-winloose-bar',
    template: `
        <div class="status {{cssClass}}">{{status}}</div>
    `,
    styles: [require('./winloose-bar.css')]
})
export class DicesWinLooseBarComponent {
    private status: string;
    private cssClass: string;

    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.select(n => n.dices.get('status'))
            .subscribe((status:any) => {

            switch (status) {
                case 'WIN':
                {
                    this.cssClass = 'win';
                    this.status = 'Awww.. You WIN! Type next DICE!';
                    break;
                }
                case 'LOST':
                {
                    this.cssClass = 'lost';
                    this.status = `Sorry, not this time.. You've lost $100. Don't give up! Try again!`;
                    break;
                }
                case 'WAITING':
                {
                    this.cssClass = 'info';
                    this.status = 'Waiting for draw results...';
                    break;
                }
                case 'MISSED':
                {
                    this.cssClass = 'info';
                    this.status = 'Latest round missed. Keep on gambling - select Your lucky DICE!';
                    break;
                }
                case 'SELECTED':
                {
                    this.cssClass = 'info';
                    this.status = 'Selected dice. Confirm Your type by pressing the BET button.';
                    break;
                }
                case 'WAITING_FOR_NEXT_ROUND': {
                    this.cssClass = 'info';
                    this.status = 'Waiting for the next round (maximum waiting time: 10s).';
                    break;
                }
                default:
                {
                    this.cssClass = '';
                    this.status = '';
                }
            }
        });
    }
}

