import {Component, Input} from '@angular/core';

@Component({
    selector: 'dice',
    template: `
        <div class="dice dice-{{value}}">
            <i class="dot-1"></i>
            <i class="dot-2"></i>
            <i class="dot-3"></i>
            <i class="dot-4"></i>
            <i class="dot-5"></i>
            <i class="dot-6"></i>
        </div>
    `,
    styles: [require('./dice.css')]
})
export class DicesDiceComponent {
    @Input() private value: string;

    constructor() {
    }
}
