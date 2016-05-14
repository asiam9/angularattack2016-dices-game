import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';
import {Component} from '@angular/core';
import {DicesChatMessageComponent} from '../components/chat-message';
import {ChatService} from '../services/chat-service';

@Component({
    selector: 'dices-chat',
    directives: [DicesChatMessageComponent],
    template: `
        <dices-chat-message *ngFor="let message of messages">
            {{ message.body }}
        </dices-chat-message>
        <input type="text" [(ngModel)]="message" />
        <button (click)="sendMessage()">SEND_MESSAGE</button>
    `
})
export class DicesChatComponent {
    message: string = '';
    messages: Array<Object> = [];

    constructor(
        ngRedux: NgRedux<IAppState>,
        private chatService: ChatService
    ) {
        ngRedux.select(n => n.chat.get('messages'))
            .subscribe((messages: any) => { this.messages = messages.toJS(); });
    }

    sendMessage() {
        this.chatService.sendMessage(this.message);
        this.message = '';
    }
}
