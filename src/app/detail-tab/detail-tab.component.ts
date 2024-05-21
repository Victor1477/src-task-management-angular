import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-detail-tab',
  templateUrl: './detail-tab.component.html',
  styleUrls: ['./detail-tab.component.scss'],
})
export class DetailTabComponent implements OnInit {
  @Input() task: Task;
  notes: string;
  @Output() close = new EventEmitter();

  ngOnInit() {
    if (this.task.notes) {
      this.notes = this.task.notes.replaceAll('\n', '<br>');
    }
  }

  onClose() {
    this.close.emit();
  }
}
