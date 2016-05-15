import {Component, Output, EventEmitter} from '@angular/core';
import {UserService} from '../services/user-service';

@Component({
    selector: 'dices-login-form',
    template: `
        <form (submit)="login()">
            <input type="text" [(ngModel)]="username" placeholder="Type Your nickname..." />
            <button type="submit" [disabled]="!username || pending">START</button>
        </form>
    `,
    styles: [require('./login-form.css')]
})
export class DicesLoginFormComponent {
    private username: string = '';
    private pending: boolean = false;

    constructor(private userService: UserService) {}

    login() {
        this.pending = true;
        this.userService.login(this.username);
    }
}
