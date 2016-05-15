import {Component} from '@angular/core';
import {IAppState} from '../app-state';
import {NgRedux} from 'ng2-redux';

@Component({
    selector: 'dices-timer',
    template: `
        <span class="timer">{{timer}}</span>
        <span class="material-icons">timer</span>
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
                const time = Math.ceil((endAt - currentTime) / 1000);

                if(time > -1) {
                    this.timer = time;
                }
            }

        }, 1000);

        ngRedux.select(n => n.dices.getIn(['results', 'endAt']))
            .subscribe((endAt: any) => {
                this.endAt = endAt;
            });
    }
}

