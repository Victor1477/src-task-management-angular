import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Output() filterValue = new EventEmitter<string>();

  inputForm: FormGroup = new FormGroup({
    searchFilter: new FormControl('code'),
  });

  onChange() {
    setTimeout(() => {
      this.filterValue.emit(this.inputForm.value.searchFilter);
    }, 10);
  }
}
