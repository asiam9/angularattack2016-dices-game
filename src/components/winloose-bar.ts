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
    private socket;
    private cssClass;

    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.select(n => n.user.getIn(['userdata','socket']))
            .subscribe(socket => {
                this.socket = socket;
            });

        ngRedux.select(n => n.dices.getIn(['results', 'winners']))
            .subscribe(winners => {
                if (winners.toJS().indexOf(this.socket) !== -1) {
                    this.cssClass = 'win';
                    this.status = 'You WIN!';
                } else {
                    this.cssClass = 'lost';
                    this.status = 'Sorry, not this time.. Try again!';
                }
            });
    }
}

