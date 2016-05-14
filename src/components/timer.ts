import {Component} from '@angular/core';
import {IAppState} from '../app-state';
import {NgRedux} from 'ng2-redux';

@Component({
    selector: 'dices-timer',
    template: `
        {{timer}}
    `,
    styles: [require('./timer.css')]
})
export class DicesTimerComponent {
    private timer;
    private endAt;

    constructor(ngRedux: NgRedux<IAppState>) {
        setInterval(() => {
            const currentTime = new Date().getTime();

            if(this.endAt) {
                const endAt = new Date(this.endAt).getTime();
                this.timer = Math.round((endAt - currentTime) / 1000);
            }

        }, 1000);

        ngRedux.select(n => n.dices.getIn(['results', 'endAt']))
            .subscribe((endAt: any) => {
                this.endAt = endAt;
            });
    }
}

