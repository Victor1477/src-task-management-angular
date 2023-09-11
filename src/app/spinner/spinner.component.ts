import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div></div>`,
  styles: [
    `
      div {
        height: 20px;
        width: 20px;
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spinner 1s linear infinite;
      }

      @keyframes spinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class SpinnerComponent {}
