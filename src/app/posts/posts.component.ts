import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash'




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts$: Object;
  Error$: boolean;
  value = sessionStorage.value;
  select = sessionStorage.select;
  lastId = ''
  finish = false;
  loading = false;


  constructor(private data: DataService) { }

  ngOnInit() {
    if (!sessionStorage.value ) {this.value = 'all'}
    console.log(this.select)
    this.loading = true;
    this.data.getPosts(this.value, this.select).subscribe(
       response => {this.posts$ = response.data.children;
       this.loading = false;
    })

  }

  onScroll () {
    console.log('scrolled!!');
    this.loading = true;
    this.data.getPosts(this.value, this.select, this.lastId).subscribe(
      response => response.data.children.map(post => {
        this.posts$.push(post)
        this.loading = false;
      })
     )
  }

  onChange(value: number) {
    this.select = value - 1;
    sessionStorage.select = value - 1;
    this.data.getPosts(this.value, this.select).subscribe(
       response => {this.posts$ = response.data.children;
       this.loading = false;
    })

  }

  onEnter(value: string) {
    this.value = value
    sessionStorage.value = value;
    this.loading = true;
    this.data.getPosts(this.value, this.select).subscribe(
       (response,error) => {
         this.posts$ = response.data.children;
         this.lastId = _.last(response.data.children).data.id
         console.log(this.lastId);
         this.loading = false;
       }
    )
  }

}
