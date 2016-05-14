import {Component} from '@angular/core';

@Component({
    selector: 'dices-info',
    template: `
        <h2>Whats going on?</h2>
        <p><strong>Type the most repetitive dice in the next draw.</strong><br />
        For the correct type total bank $$$ /winners count and bonus +$100,<br />
        for wrong typings -$100.<br /><br />
        Survive as long as You can! Good luck!</p>
    `,
    styles: [require('./info.css')]
})
export class DicesInfoComponent {}
