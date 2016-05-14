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

            console.log(status);

            switch (status) {
                case 'WIN':
                {
                    this.cssClass = 'win';
                    this.status = 'You WIN!';
                    break;
                }
                case 'LOST':
                {
                    this.cssClass = 'lost';
                    this.status = 'Sorry, not this time.. You lost. Try again!';
                    break;
                }
                case 'WAITING':
                {
                    this.cssClass = 'info';
                    this.status = 'Waiting for draw results ';
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

