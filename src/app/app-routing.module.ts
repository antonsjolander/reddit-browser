import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { DetailsComponent } from './details/details.component';



const routes: Routes = [
  {
    path: '',
    component: PostsComponent
  },
  {
    path: 'details/:sub/:id',
    component: DetailsComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
