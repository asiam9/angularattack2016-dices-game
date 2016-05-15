import {Component, ViewEncapsulation} from '@angular/core';
import {DicesChatComponent} from './containers/chat';
import {DicesComponent} from './containers/dices';
import {DicesAsideComponent} from './containers/aside';
import {DicesLoginFormComponent} from './components/login-form';
import {DicesChooseDiceComponent} from './containers/choose-dice';
import {DicesTimerComponent} from './components/timer';
import {DicesWinLooseBarComponent} from './components/winloose-bar';
import {DicesColumnComponent} from './containers/column';
import {DicesInfoComponent} from './components/info';
import {NgRedux} from 'ng2-redux';
import {IAppState} from './app-state';
import {Observable} from 'rxjs';

@Component({
    selector: 'my-app',
    directives: [DicesComponent, DicesChatComponent, DicesAsideComponent, DicesLoginFormComponent,
        DicesChooseDiceComponent, DicesTimerComponent, DicesWinLooseBarComponent, DicesColumnComponent,
        DicesInfoComponent],
    template: `
        <dices-aside></dices-aside>
        <dices></dices>
        <dices-column>
            <dices-info></dices-info>
            <dices-timer></dices-timer>
            <dices-winloose-bar></dices-winloose-bar>
        </dices-column>
        <dices-choose-dice></dices-choose-dice>
        <dices-chat></dices-chat>
        <p *ngIf="!username"><button (click)="showLoginModal()">START GAME!</button></p>
        <login-form *ngIf="!username"></login-form>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    /**ngIf="loginModal && "*/
    private username: Observable<string>;
    private loginModal = false;

    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.select(n => n.user.get('username'))
            .subscribe((username: any) => { this.username = username; });
    }

    showLoginModal() {
        this.loginModal = true;
    }
}
