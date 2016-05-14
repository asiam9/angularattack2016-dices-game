import {Component} from '@angular/core';

@Component({
    selector: 'dices-column',
    template: `
        <ng-content></ng-content>
    `,
    styles:[require('./column.css')]
})
export class DicesColumnComponent {}
