import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-detail-tab',
  templateUrl: './detail-tab.component.html',
  styleUrls: ['./detail-tab.component.scss'],
})
export class DetailTabComponent {
  @Input() task: Task;
  @Output() close = new EventEmitter();

  onClose() {
    this.close.emit();
  }
}
