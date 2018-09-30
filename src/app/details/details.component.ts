import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  sub$: string;
  id$: string;
  comments$: Object;
  commentsFormated$: Object;
  post$: Object;
  selection = [];
  display = i => i.body;
  loading = false;


  constructor(private route: ActivatedRoute, private data: DataService) {
     this.route.params.subscribe( params => {
       this.id$ = params.id
       this.sub$ = params.sub
     });
  }

  

  dateRender(timestamp) {
    let date = new Date(timestamp*1000);
    return date.getHours();
  }

  // commentRender(object) {
  //    for(let propName in object) {
  //      if(object[propName].data.hasOwnProperty(propName)) {
  //        console.log(object[propName])
  //      }
  //      console.log(object[propName].data.replies)
  //    }
  // }
  getCommentsFromArray(array) {
    let comments: object[] = [];
    var comment: {[k: string]: any} = {};
    array.forEach((item, i) => {
      if(typeof item !== 'undefined') {
        comments.push(comment = {
          author: item.data.author,
          created: item.data.created,
          body: item.data.body,
          score: item.data.score
        })
        if(typeof item.data.replies !== 'undefined' && item.data.replies !== '') {
          comment.replies =
          this.getCommentsFromArray(item.data.replies.data.children);
        }
      }
    });

    return comments;
  }

  ngOnInit() {
    this.loading = true;
    this.data.getPost(this.sub$, this.id$).subscribe(
      data => {
        this.post$ = data[0].data.children;
        this.comments$ = data[1].data.children;

        this.loading = false;
        this.commentsFormated$ = this.getCommentsFromArray(this.comments$)
        console.log(this.commentsFormated$)
      }

    )
  }

}
