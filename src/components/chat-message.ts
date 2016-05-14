import {Component} from '@angular/core';

@Component({
    selector: 'dices-chat-message',
    template: `
        <ng-content></ng-content>
    `,
    styles: [require('./chat-message.css')]
})
export class DicesChatMessageComponent {}
