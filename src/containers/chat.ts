import {Component} from '@angular/core';
import {DicesChatMessageComponent} from '../components/chat-message';
import {DicesChatFormComponent} from '../components/chat-form';
import {DicesChatMessagesComponent} from '../components/chat-messages';

@Component({
    selector: 'dices-chat',
    directives: [DicesChatMessageComponent, DicesChatFormComponent, DicesChatMessagesComponent],
    template: `
        <dices-chat-messages></dices-chat-messages>
        <dices-chat-form></dices-chat-form>
    `,
    styles: [require('./chat.css')]
})
export class DicesChatComponent {}
