import {Component} from '@angular/core';

@Component({
    selector: 'dices-info',
    template: `
        <h2>Whats going on?</h2>
        <p><strong>Become THE DICE master!</strong></p>
        <p>Type the most frequently occurring dice in the next draw.<br />
        For correct the bonus +$100, and if there is more than Yours bet<br />
        You're taking total bank $$$/winners.</p>
        <p><strong>Survive as long as You can! Good luck!</strong></p>
    `,
    styles: [require('./info.css')]
})
export class DicesInfoComponent {}
