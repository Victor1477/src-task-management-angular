import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'action-buttons',
  template: ` <div class="buttons">
    <button class="green action-button" (click)="onUpdate()">Update</button>
    <button class="green action-button" (click)="onDetails()">Details</button>
    <button class="green action-button" (click)="onAttachments()">
      Attachments
    </button>
    <button class="delete-button" (click)="onDelete()">X</button>
  </div>`,
  styles: [
    `
      @import '../../../styles.scss';

      .buttons {
        display: flex;
        justify-content: center;
      }

      button {
        cursor: pointer;
      }

      .action-button {
        @include green-button;
        margin: 5px;
        border: 0;
        font-size: 14px;
        padding: 8px 12px;
        border-radius: 5px;
        font-weight: 600;
      }

      .delete-button {
        border: 0;
        background-color: transparent;
        color: red;
        font-size: 20px;
        font-weight: 900;
        padding: 5px;
        text-shadow: 1px 1px 2px black;
        transition: 0.2s;

        &:hover {
          font-size: 30px;
          padding: 0;
        }
      }
    `,
  ],
})
export class ActionButtons {
  @Output() update = new EventEmitter();
  @Output() details = new EventEmitter();
  @Output() attachments = new EventEmitter();
  @Output() delete = new EventEmitter();

  onUpdate() {
    this.update.emit();
  }
  onDetails() {
    this.details.emit();
  }
  onAttachments() {
    this.attachments.emit();
  }
  onDelete() {
    this.delete.emit();
  }
}
