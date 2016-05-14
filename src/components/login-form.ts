import {Component, Output, EventEmitter} from '@angular/core';
import {UserService} from '../services/user-service';

@Component({
    selector: 'login-form',
    template: `
        <div class="form">
            <input type="text" [(ngModel)]="username" placeholder="Type Your nickname..." />
            <button (click)="login()">START</button>
        </div>
    `,
    styles: [require('./login-form.css')]
})
export class DicesLoginFormComponent {
    private username: string;

    constructor(private userService: UserService) {}

    login() {
        this.userService.login(this.username);
    }
}

