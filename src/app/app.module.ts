import { tasksReducer, tokenReducer } from './store/store.reducers';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TasksComponent } from './tasks/tasks.component';
import { TasksEffects } from './store/store.effects';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { DetailTabComponent } from './detail-tab/detail-tab.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AttachmentsTab } from './attachments-tab/attachments-tab.component';
import { FilterComponent } from './components/search/filter/filter.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ActionButtons } from './components/action-buttons/action-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TasksComponent,
    TaskFormComponent,
    DetailTabComponent,
    SpinnerComponent,
    AttachmentsTab,
    FilterComponent,
    AuthenticationComponent,
    ActionButtons,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ tasks: tasksReducer, token: tokenReducer }),
    EffectsModule.forRoot([TasksEffects]),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
