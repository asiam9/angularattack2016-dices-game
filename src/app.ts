import {Component, ViewEncapsulation} from '@angular/core';
import {DicesChatComponent} from './containers/chat';
import {DicesComponent} from './containers/dices';
import {DicesAsideComponent} from './containers/aside';
import {DicesLoginFormComponent} from './components/login-form';
import {DicesChooseDiceComponent} from './containers/choose-dice';
import {DicesTimerComponent} from './components/timer';
import {NgRedux} from 'ng2-redux';
import {IAppState} from './app-state';

@Component({
    selector: 'my-app',
    directives: [DicesComponent, DicesChatComponent, DicesAsideComponent, DicesLoginFormComponent,
        DicesChooseDiceComponent, DicesTimerComponent],
    template: `
        <dices-aside></dices-aside>
        <dices></dices>
        <dices-chat></dices-chat>
        <dices-choose-dice></dices-choose-dice>
        <p *ngIf="!userdata.username"><button (click)="showLoginModal()">START GAME!</button></p>
        <login-form *ngIf="loginModal && !userdata.username"></login-form>
        <dices-timer></dices-timer>
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
