import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';


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


  constructor(private data: DataService) { }

  ngOnInit() {
    if (!sessionStorage.value ) {this.value = 'all'}
    console.log(this.value)
    this.data.getPosts(this.value, 4).subscribe(
       response => this.posts$ = response.data.children
    )

  }

  onChange(value: number) {
    this.select = value - 1;
    sessionStorage.select = value - 1;
    console.log(this.select);
    // I want to do something here for new selectedDevice, but what I
    // got here is always last selection, not the one I just select.
  }

  onEnter(value: string) {
    this.value = value
    sessionStorage.value = value;
    this.data.getPosts(this.value, this.select).subscribe(
       response => this.posts$ = response.data.children
    )
  }

}
