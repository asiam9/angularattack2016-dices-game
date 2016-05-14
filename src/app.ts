import {Component, ViewEncapsulation} from '@angular/core';
import {DicesChatComponent} from './containers/chat';
import {DicesComponent} from './containers/dices';
import {DicesAsideComponent} from './containers/aside';
import {DicesLoginFormComponent} from './components/login-form';
import {DicesChooseDiceComponent} from './containers/choose-dice';
import {NgRedux} from 'ng2-redux';
import {IAppState} from './app-state';

@Component({
    selector: 'my-app',
    directives: [DicesComponent, DicesChatComponent, DicesAsideComponent, DicesLoginFormComponent,
        DicesChooseDiceComponent],
    template: `
        <dices-aside></dices-aside>
        <dices></dices>
        <dices-chat></dices-chat>
        <dices-choose-dice></dices-choose-dice>
        <p><button (click)="showLoginModal()">START GAME!</button></p>
        <login-form *ngIf="loginModal && !userdata.username"></login-form>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    private userdata;
    private loginModal = false;

    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.select(n => n.user.get('userdata'))
            .subscribe((user: any) => { this.userdata = user.toJS(); });
    }

    showLoginModal() {
        this.loginModal = true;
    }
}
