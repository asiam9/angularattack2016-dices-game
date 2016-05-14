import {Component, ViewEncapsulation} from '@angular/core';
import {DicesChatComponent} from './containers/chat';
import {DicesComponent} from './containers/dices';
import {DicesAsideComponent} from './containers/aside';
import {DicesLoginFormComponent} from './components/login-form';
import {DicesChooseDiceComponent} from './containers/choose-dice';
import {DicesTimerComponent} from './components/timer';
import {DicesWinLooseBarComponent} from './components/winloose-bar';
import {NgRedux} from 'ng2-redux';
import {IAppState} from './app-state';

@Component({
    selector: 'my-app',
    directives: [DicesComponent, DicesChatComponent, DicesAsideComponent, DicesLoginFormComponent,
        DicesChooseDiceComponent, DicesTimerComponent, DicesWinLooseBarComponent],
    template: `
        <dices-aside></dices-aside>
        <dices></dices>
        <dices-timer></dices-timer>
        <dices-winloose-bar></dices-winloose-bar>
        <dices-choose-dice></dices-choose-dice>
        <dices-chat></dices-chat>
        <p *ngIf="!userdata.username"><button (click)="showLoginModal()">START GAME!</button></p>
        <login-form *ngIf="!userdata.username"></login-form>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    /**ngIf="loginModal && "*/
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
