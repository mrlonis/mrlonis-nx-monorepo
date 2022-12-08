import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserSettings } from './user-settings';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  // Browse to https://putsreq.com/jBc1flEzxk4pE9YcjvWZ/inspect
  // to see number of requests and edit response
  postUserSettingsForm(userSettings: UserSettings): Observable<unknown> {
    return this.http.post('https://putsreq.com/jBc1flEzxk4pE9YcjvWZ', userSettings);

    //return of(userSettings);
  }

  getSubscriptionTypes(): Observable<string[]> {
    return of(['Monthly', 'Annual', 'Lifetime']);
  }
}
