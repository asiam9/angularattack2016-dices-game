import {Component} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';

@Component({
    selector: 'dices-winloose-bar',
    template: `
        <div class="{{cssClass}}">{{status}}</div>
    `,
    styles: [require('./winloose-bar.css')]
})
export class DicesWinLooseBarComponent {
    private status;
    private cssClass;

    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.select(n => n.dices.getIn(['results', 'winners']))
            .subscribe(winners => {
                if (winners) {
                    this.cssClass = 'win';
                    this.status = 'You WIN!';
                } else {
                    this.cssClass = 'lost';
                    this.status = 'Sorry, not this time.. Try again!';
                }
            });
    }
}

