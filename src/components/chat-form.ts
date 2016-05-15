import {Component} from '@angular/core';
import {ChatService} from '../services/chat-service';

@Component({
    selector: 'dices-chat-form',
    template: `
        <form (submit)="sendMessage()">
            <input placeholder="Type a message..." type="text" [(ngModel)]="message" />
            <button type="submit">SEND</button>
        </form>
    `,
    styles: [require('./chat-form.css')]
})
export class DicesChatFormComponent {
    message: string = '';

    constructor(private chatService: ChatService) {}

    sendMessage($event) {
        if(!this.message) return;

        this.chatService.sendMessage(this.message);
        this.message = '';
    }
}
