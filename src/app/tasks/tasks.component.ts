import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../shared/task.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tasksSelector } from '../store/store.selectors';
import { Router } from '@angular/router';
import { loadStore } from '../store/store.actions';
import { TasksService } from '../shared/tasks.service';
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
  searchFilterValue = 'code';

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
        if (this.router.url === `/tasks`) {
          tasks = storedTasks;
        } else if (this.router.url === `/in-progress`) {
          tasks = storedTasks.filter((task) => task.isActive === true);
        } else if (this.router.url === `/finished`) {
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

    if (this.searchInput) {
      this.tasks = this.tempTasks.filter((task) => {
        switch (this.searchFilterValue) {
          case 'code': {
            return this.searchInputIncludes(task.code);
          }
          case 'description': {
            return this.searchInputIncludes(task.description);
          }
          case 'featureFlag': {
            return this.searchInputIncludes(task.featureFlagName);
          }
          case 'notes': {
            return this.searchInputIncludes(task.notes);
          }
        }
      });
    } else {
      this.tempTasks = [];
    }
  }

  searchInputIncludes(value: string): boolean {
    return value.toLowerCase().includes(this.searchInput.toLowerCase());
  }

  onChangeSearchFilterValue(value: string) {
    this.searchFilterValue = value;
    this.filterBySearchInput();
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
    this.findSelectedTask(id).then(() => {
      if (
        confirm(
          `${enUs.tasks.aboutToDelete} ${this.selectedTask.code}`
        ).valueOf()
      ) {
        this.tasksService.deleteTask(id).then((result) => {
          this.store.dispatch(loadStore());
        });
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
