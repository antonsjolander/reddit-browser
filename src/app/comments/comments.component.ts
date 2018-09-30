import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() comments: string;

  constructor() { }

  ngOnInit() {
     // console.log('this is the comments', this.comments)
  }

}
