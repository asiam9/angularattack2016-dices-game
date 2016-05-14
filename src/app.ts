import {Component, ViewEncapsulation} from '@angular/core';
import {DicesChatComponent} from './containers/chat';
import {DicesComponent} from './containers/dices';
import {DicesAsideComponent} from './containers/aside';

@Component({
    selector: 'my-app',
    directives: [DicesComponent, DicesChatComponent, DicesAsideComponent],
    template: `
        <dices-aside></dices-aside>
        <dices></dices>
        <dices-chat></dices-chat>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {}
