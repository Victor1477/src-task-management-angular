import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../shared/task.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tasksSelector } from '../store/store.selectors';
import { Router } from '@angular/router';
import { loadStore } from '../store/store.actions';
import { TasksService } from '../shared/tasks.service';
import { env } from '../shared/env';
import enUs from '../shared/en-us';

@Component({
  selector: 'app-tasks-component',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  tasksSubscription: Subscription;
  showDetailTab: boolean = false;
  showAttachmentsTab: boolean = false;
  searchInput: string;
  selectedTask: Task;
  tasks: Task[];
  tempTasks: Task[] = [];

  constructor(
    private store: Store,
    private router: Router,
    private tasksService: TasksService
  ) {}

  ngOnInit() {
    this.tasksSubscription = this.store
      .select(tasksSelector)
      .subscribe((storedTasks) => {
        let tasks: Task[];
        if (this.router.url === `/${env.Urls.allTasks}`) {
          tasks = storedTasks;
        } else if (this.router.url === `/${env.Urls.inProgressTasks}`) {
          tasks = storedTasks.filter((task) => task.isActive === true);
        } else if (this.router.url === `/${env.Urls.finishedTasks}`) {
          tasks = storedTasks.filter((task) => task.isActive === false);
        }
        this.tasks = tasks;
      });
  }

  ngOnDestroy() {
    this.tasksSubscription.unsubscribe();
  }

  filterBySearchInput() {
    if (this.tasks.length > this.tempTasks.length) {
      this.tempTasks = this.tasks;
    } else {
      this.tasks = this.tempTasks;
    }
    this.tasks = this.tempTasks.filter(
      (task) =>
        task.code.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }

  onUpdate(id: number) {
    this.router.navigate(['/form', id]);
  }

  onDetails(id: number) {
    if (id) {
      this.findSelectedTask(id);
      this.showDetailTab = true;
    } else {
      this.showDetailTab = false;
    }
  }

  onDelete(id: number) {
    this.findSelectedTask(id).then((result) => {
      if (result) {
        if (
          confirm(
            `${enUs.tasks.aboutToDelete} ${this.selectedTask.code}`
          ).valueOf()
        ) {
          this.tasksService.deleteTask(id).then((result) => {
            this.store.dispatch(loadStore());
          });
        }
      }
    });
  }

  onAttachments(id: number) {
    if (this.showAttachmentsTab) {
      this.showAttachmentsTab = false;
    } else {
      this.findSelectedTask(id);
      this.showAttachmentsTab = true;
    }
  }

  private findSelectedTask(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.selectedTask = this.tasks.find((task) => task.id === id);
      resolve(true);
    });
  }
}
