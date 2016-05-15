import {Component} from '@angular/core';

@Component({
    selector: 'dices-lost-component',
    template: `
        <div>
            <h2>Thanks for playing!</h2>
            <p>Hope You enjoy - check for others stuff and come back later!</p>
        </div>
    `,
    styles: [require('./lost.css')]
})
export class DicesLostComponent {}
