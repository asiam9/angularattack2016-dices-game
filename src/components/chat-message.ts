import {Component} from '@angular/core';

@Component({
    selector: 'dices-chat-message',
    template: `
        <div class="message">
            <ng-content></ng-content>        
        </div>
    `
})
export class DicesChatMessageComponent {}
