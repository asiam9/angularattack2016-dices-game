import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';
import {Component, ElementRef} from '@angular/core';
import {DicesChatMessageComponent} from './chat-message';

@Component({
    selector: 'dices-chat-messages',
    directives: [DicesChatMessageComponent],
    template: `
        <dices-chat-message *ngFor="let message of messages">
            <span class="username">{{ message.username }}</span>
            <span class="body">{{ message.body }}</span>
        </dices-chat-message>
    `,
    styles: [require('./chat-messages.css')]
})
export class DicesChatMessagesComponent {
    messages: Array<Object> = [];

    constructor(
        ngRedux: NgRedux<IAppState>,
        elementRef: ElementRef
    ) {
        ngRedux.select(n => n.chat.get('messages'))
            .subscribe((messages: any) => {
                this.messages = messages.toJS();
                setTimeout(() => {
                    elementRef.nativeElement.scrollTop = elementRef.nativeElement.scrollHeight;
                }, 0);
            });
    }
}
