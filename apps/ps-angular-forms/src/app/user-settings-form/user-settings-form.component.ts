import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.scss'],
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings: UserSettings = {
    name: '',
    emailOffers: false,
    interfaceStyle: '',
    subscriptionType: '',
    notes: '',
  };

  startDate: NgbDateStruct = { year: 1789, month: 7, day: 14 };
  time = { hour: 13, minute: 30 };
  meridian = true;
  selected = 0;
  hovered = 0;
  readonly = false;

  // Spread syntax for simple copy
  // If you wanted a deep copy you would use some kind of utility
  userSettings: UserSettings = { ...this.originalUserSettings };

  postError = false;
  postErrorMessage = '';

  subscriptionTypes!: Observable<string[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }

  onBlur(field: NgModel) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    console.log('onBlur: ' + field.valid);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onHttpError(errorResponse: any) {
    console.log('onHttpError: ', errorResponse);
    this.postError = true;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    console.log('onSubmit: ' + form.valid);

    if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe({
        next: (result) => {
          console.log('Success: ', result);
          this.postError = false;
          this.postErrorMessage = '';
        },
        error: (error) => this.onHttpError(error),
      });
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above errors.';
    }
  }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }
}
