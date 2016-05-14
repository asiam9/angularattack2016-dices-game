import {Component} from '@angular/core';
import {DicesChatComponent} from './containers/chat-component';

@Component({
    selector: 'my-app',
    directives: [DicesChatComponent],
    template: `
        <dices-chat></dices-chat>
    `
})
export class AppComponent {}
