import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../shared/task.model';
import { disableBodyScroll, enableBodyScroll } from '../utils/dom-manipulation';

@Component({
  selector: 'app-detail-tab',
  templateUrl: './detail-tab.component.html',
  styleUrls: ['./detail-tab.component.scss'],
})
export class DetailTabComponent implements OnInit {
  @Input() task: Task;
  notes: string;
  pendencies: string;
  @Output() close = new EventEmitter();

  ngOnInit() {
    disableBodyScroll();
    if (this.task.notes) {
      this.notes = this.task.notes.replaceAll('\n', '<br>');
    }
    if (this.task.pendencies) {
      this.pendencies = this.task.pendencies.replaceAll('\n', '<br>');
    }
  }

  onClose() {
    enableBodyScroll();
    this.close.emit();
  }
}
