import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

    getPost(channel, id) {
      return this.http.get('https://www.reddit.com/r/'+ channel + '/comments/' + id + '.json')
      .pipe(
         map(data => {
           return data;
         }),
         catchError(error => {
           return throwError('Something went wrong')
         })
      );;
    }

    getPosts(channel, amount, lastId) {
      console.log('https://www.reddit.com/r/' + channel + '.json?limit=' + amount + '&after=' + lastId)
      return this.http.get('https://www.reddit.com/r/' + channel + '.json?limit=' + amount + '&after=' + lastId)
      .pipe(
         map(data => {
           return data;
           
         }),
         catchError(error => of([]))
      );

       

    }



}
