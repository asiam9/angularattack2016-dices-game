import {Component} from '@angular/core';

@Component({
    selector: 'dices-info',
    template: `
        <h2>Whats going on?</h2>
        <p><strong>Become THE DICE master!</strong></p>
        <p>Type the most frequently occurring dice in the next draw.<br />
        For correct bonus +$100, and if there is more than Yours bet: total bank $$$/winners.<br />
        Survive as long as You can! Good luck!</p>
    `,
    styles: [require('./info.css')]
})
export class DicesInfoComponent {}
