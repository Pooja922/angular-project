import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
 
  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) {}

  submitFeedback(id: any): Observable<any> {
    return this.http.post<any>(baseURL + 'feedback/', id).
      pipe(catchError(this.processHTTPMsgService.handleError)).pipe(catchError(this.processHTTPMsgService.handleError));
  }

}

