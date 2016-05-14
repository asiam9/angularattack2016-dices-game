import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';
import {Component} from '@angular/core';
import {DicesChatMessageComponent} from './chat-message';

@Component({
    selector: 'dices-chat-messages',
    directives: [DicesChatMessageComponent],
    template: `
        <dices-chat-message *ngFor="let message of messages">
            {{ message.body }}
        </dices-chat-message>
    `,
    styles: [require('./chat-messages.css')]
})
export class DicesChatMessagesComponent {
    messages: Array<Object> = [];

    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.select(n => n.chat.get('messages'))
            .subscribe((messages: any) => { this.messages = messages.toJS(); });
    }
}
