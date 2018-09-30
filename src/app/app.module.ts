import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostsComponent } from './posts/posts.component';
import { DetailsComponent } from './details/details.component';

import { HttpClientModule } from '@angular/common/http';

import { CommentsComponent } from './comments/comments.component';
import { BosketModule } from '@bosket/angular'

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PostsComponent,
    DetailsComponent,

    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BosketModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
