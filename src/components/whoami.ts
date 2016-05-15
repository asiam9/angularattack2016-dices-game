import {Component} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';
import {IAppState} from '../app-state';

@Component({
    pipes: [AsyncPipe],
    selector: 'dices-whoami',
    template: `
        <h3>You: {{username$ | async}}</h3>
    `
})
export class DicesWhoamiComponent {
    private username$: Observable<number>;

    constructor(ngRedux: NgRedux<IAppState>) {
        this.username$ = ngRedux.select(n => n.user.get('username'));
    }
}
