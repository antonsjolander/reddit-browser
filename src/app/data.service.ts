import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

    getUsers() {
      return this.http.get('https://jsonplaceholder.typicode.com/users');
    }

    getPost(channel, id) {
      return this.http.get('https://www.reddit.com/r/'+ channel + '/comments/' + id + '.json');
    }

    getPosts(channel, amount) {
      return this.http.get('https://www.reddit.com/r/' + channel + '.json?limit=' + amount)

    }



}
