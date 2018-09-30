import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as _ from 'lodash'




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts$: Object;
  value = sessionStorage.value;
  select = 4;
  lastId = ''
  finish = false;
  loading = false;
  error = false;



  constructor(private data: DataService) { }

  ngOnInit() {
    if (!sessionStorage.value ) {this.value = 'all'}
    console.log(this.select)
    this.loading = true;
    this.data.getPosts(this.value, this.select-1).subscribe(
       response => {
        if(_.isEmpty(response)){
          this.error = true;
          console.error(this.error)
          this.loading = false;
        }else{
          this.posts$ = response.data.children;
          this.loading = false;
          this.error = false;
        }
    })

  }

  onScroll () {
    console.log('scrolled!!');
    this.loading = true;
    this.data.getPosts(this.value, this.select-1, this.lastId).subscribe(
      response => {
        if(_.isEmpty(response)){
          this.error = true;
          console.error(this.error)
          this.loading = false;
        }else{
        response.data.children.map(post => {
          this.posts$.push(post)
          this.loading = false;
          this.error = false;
        })
      }
    })
  }

  onChange(value: number) {
    this.select = value;
    sessionStorage.select = value;
    this.data.getPosts(this.value, this.select-1).subscribe(
       response => {
       if(_.isEmpty(response)){
           this.error = true;
           console.error(this.error)
           this.loading = false;
       }else{
         this.posts$ = response.data.children;
         this.loading = false;
         this.error = false;
       }
    })

  }

  dateRender(timestamp) {
    let date = new Date(timestamp*1000);
    return date.getHours();
  }

  onEnter(value: string) {
    this.value = value
    sessionStorage.value = value;
    this.loading = true;
    this.data.getPosts(this.value, this.select-1).subscribe(
      response => {
       if(_.isEmpty(response)){
         this.error = true;
         console.error(this.error)
         this.loading = false;
       }else{
         this.posts$ = response.data.children;
         this.lastId = _.last(response.data.children).data.id
         this.loading = false;
         this.error = false;
       }
     }
    )
  }



}
