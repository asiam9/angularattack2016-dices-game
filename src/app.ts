import {Component, ViewEncapsulation} from '@angular/core';
import {DicesChatComponent} from './containers/chat';
import {DicesComponent} from './containers/dices';
import {DicesAsideComponent} from './containers/aside';
import {DicesLoginFormComponent} from './components/login-form';
import {NgRedux} from 'ng2-redux';
import {IAppState} from './app-state';

@Component({
    selector: 'my-app',
    directives: [DicesComponent, DicesChatComponent, DicesAsideComponent, DicesLoginFormComponent],
    template: `
        <dices-aside></dices-aside>
        <dices></dices>
        <dices-chat></dices-chat>
        <login-form *ngIf="!userdata.username"></login-form>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    private userdata;

    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.select(n => n.user.get('userdata'))
            .subscribe((user: any) => { this.userdata = user.toJS(); });
    }
}
