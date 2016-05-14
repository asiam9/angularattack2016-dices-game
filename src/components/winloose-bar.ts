import {Component} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';

@Component({
    selector: 'dices-winloose-bar',
    template: `
        {{status}}
    `,
    styles: [require('./winloose-bar.css')]
})
export class DicesWinLooseBarComponent {
    private status;
    private socket;

    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.select(n => n.user.getIn(['userdata','socket']))
            .subscribe(socket => {
                console.log(id);
                this.socket = socket;
            });

        ngRedux.select(n => n.dices.getIn(['results', 'winners']))
            .subscribe(winners => {
                console.log(winners);

                if (winners.toJS().indexOf(this.socket) !== -1) {
                    this.status = 'You WIN!';
                } else {
                    this.status = 'Sorry, not this time.. Try again!';
                }
            });
    }
}

