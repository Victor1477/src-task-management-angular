import { tokenSelector } from './../../store/store.selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import axios from 'axios';
import enUs from 'src/app/shared/en-us';
import { env } from 'src/app/shared/env';
import { Task } from 'src/app/shared/task.model';
import { loadStore } from 'src/app/store/store.actions';
import { tasksSelector } from 'src/app/store/store.selectors';
import { retry } from 'src/app/utils/functions';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  task = {
    id: 0,
    code: '',
    description: '',
    notes: '',
    pendencies: '',
    featureFlagName: '',
    isActive: true,
  };
  form: FormGroup;
  saved: boolean;
  message: string;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ tasks: Task[]; token: string }>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = parseInt(params['id']);
      if (id) {
        this.store.select(tasksSelector).subscribe((tasks) => {
          this.task = tasks.find((task) => task.id === id);
        });
      }
    });

    this.form = new FormGroup({
      id: new FormControl(this.task.id),
      code: new FormControl(this.task.code, Validators.required),
      description: new FormControl(this.task.description, Validators.required),
      notes: new FormControl(this.task.notes),
      pendencies: new FormControl(this.task.pendencies),
      featureFlagName: new FormControl(this.task.featureFlagName),
      isActive: new FormControl(this.task.isActive),
    });
  }

  ngOnDestroy() {}

  onSubmit() {
    this.isLoading = true;
    const method = this.form.value.id === 0 ? 'POST' : 'PUT';
    const subscription = this.store
      .select(tokenSelector)
      .subscribe((state: any) => {
        if (state) {
          retry(axios.request, 3, 2000, {
            url: env.apiUrl + '/tasks',
            data: this.form.value,
            method: method,
            headers: { Authorization: state.token },
          })
            .then((response: { data }) => {
              this.store.dispatch(loadStore());
              this.form.patchValue({ id: response.data.id });
              this.saved = true;
              this.message = enUs.form.sucess;
            })
            .catch((e) => {
              console.log('error', e);

              this.saved = false;
              this.message = enUs.form.fail;
            })
            .finally(() => {
              this.isLoading = false;
              subscription.unsubscribe();
            });
        }
      });
  }
}
