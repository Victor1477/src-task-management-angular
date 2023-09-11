import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { env } from '../shared/env';
import enUs from '../shared/en-us';

@Component({
  selector: 'app-attachments-tab',
  templateUrl: './attachments-tab.component.html',
  styleUrls: ['./attachments-tab.component.scss'],
})
export class AttachmentsTab implements OnInit {
  @Input() taskId;
  @Output() close = new EventEmitter();
  uploadButtonText: string = enUs.attachments.uploadButton;
  attachments = [];
  isLoading: boolean = false;
  erro: boolean = false;

  ngOnInit() {
    this.loadAttachments();
  }

  loadAttachments() {
    axios
      .get(env.apiUrl + '/attachments', {
        headers: { taskId: this.taskId },
      })
      .then((result) => {
        let tempAttachments = [];
        result.data.forEach((element) => {
          let attachment = {
            ...element,
            url: `${env.apiUrl}/attachments/${element.id}/${element.fileName}`,
          };
          tempAttachments.push(attachment);
        });
        this.attachments = tempAttachments;
      })
      .catch(() => {
        this.erro = true;
      });
  }

  onClose() {
    this.close.emit();
  }

  onFile(event) {
    this.erro = false;
    this.isLoading = true;
    const file = event.target.files[0];
    const form = new FormData();
    form.set('enctype', 'multipart/form-data');
    form.append('file', file);

    axios
      .post(env.apiUrl + '/attachments/upload', form, {
        headers: { taskId: this.taskId },
      })
      .then(() => {
        this.loadAttachments();
      })
      .catch(() => {
        this.erro = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  onDelete(attachment) {
    if (confirm(`Are you sure you want to delete ${attachment.fileName} ?`)) {
      this.isLoading = true;
      axios
        .delete(env.apiUrl + '/attachments', { headers: { id: attachment.id } })
        .then(() => {
          this.loadAttachments();
        })
        .catch(() => {
          this.attachments = [];
          this.erro = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
}
