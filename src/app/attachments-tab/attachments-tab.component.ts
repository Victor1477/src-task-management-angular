import axios from 'axios';
import enUs from '../shared/en-us';
import { Store } from '@ngrx/store';
import { env } from '../shared/env';
import { tokenSelector } from '../store/store.selectors';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { disableBodyScroll, enableBodyScroll } from '../utils/dom-manipulation';

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

  constructor(private store: Store<{ token: string }>) {}

  ngOnInit() {
    disableBodyScroll();
    this.loadAttachments();
  }

  loadAttachments() {
    const subscription = this.store
      .select(tokenSelector)
      .subscribe((state: any) => {
        if (state) {
          axios
            .get(env.apiUrl + '/tasks/attachments', {
              headers: { taskId: this.taskId, Authorization: state.token },
            })
            .then((result) => {
              this.attachments = [];
              result.data.forEach((element) => {
                let attachment = {
                  ...element,
                  url: `${env.apiUrl}/tasks/attachments/${element.id}/${element.fileName}`,
                };
                this.attachments.push(attachment);
              });
            })
            .catch(() => {
              this.erro = true;
            });
        }
        setTimeout(() => {
          subscription.unsubscribe();
        }, 10);
      });
  }

  onClose() {
    enableBodyScroll();
    this.close.emit();
  }

  onFile(event) {
    this.erro = false;
    this.isLoading = true;
    const file = event.target.files[0];
    const form = new FormData();
    form.set('enctype', 'multipart/form-data');
    form.append('file', file);

    this.store.select(tokenSelector).subscribe((state: any) => {
      if (state) {
        axios
          .post(env.apiUrl + '/tasks/attachments/upload', form, {
            headers: { taskId: this.taskId, Authorization: state.token },
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
    });
  }

  onDelete(attachment) {
    if (confirm(`Are you sure you want to delete ${attachment.fileName} ?`)) {
      this.isLoading = true;
      this.store.select(tokenSelector).subscribe((state: any) => {
        if (state) {
          axios
            .delete(env.apiUrl + '/tasks/attachments', {
              headers: { id: attachment.id, Authorization: state.token },
            })
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
      });
    }
  }
}
