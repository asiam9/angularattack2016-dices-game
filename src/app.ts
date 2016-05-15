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
import {DicesLostComponent} from "./components/lost";

@Component({
    selector: 'my-app',
    directives: [DicesComponent, DicesChatComponent, DicesAsideComponent, DicesLoginFormComponent,
        DicesChooseDiceComponent, DicesTimerComponent, DicesWinLooseBarComponent, DicesColumnComponent,
        DicesInfoComponent, DicesLostComponent],
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
        <dices-login-form *ngIf="!username"></dices-login-form>
        <dices-lost-component *ngIf="isEnd()"></dices-lost-component>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    /**ngIf="loginModal && "*/
    private username: Observable<string>;
    private loginModal = false;
    private gameStatus;

    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.select(n => n.user.get('username'))
            .subscribe((username: any) => { this.username = username; });

        ngRedux.select(n => n.dices.get('gameStatus'))
            .subscribe((gameStatus: any) => { this.gameStatus = gameStatus; });
    }

    isEnd() {
        return this.gameStatus == 'END';
    }

    showLoginModal() {
        this.loginModal = true;
    }
}
