import {Component, ViewEncapsulation} from '@angular/core';
import {DicesChatComponent} from './containers/chat-component';
import {DicesComponent} from './containers/dices-component';

@Component({
    selector: 'my-app',
    directives: [DicesComponent, DicesChatComponent],
    template: `
        <dices></dices>
        <dices-chat></dices-chat>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {}
