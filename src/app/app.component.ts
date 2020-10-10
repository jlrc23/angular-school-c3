import { Component, ViewChild } from '@angular/core';
import { PostsService } from './services/posts.service';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // IMPORTANT UPDATE related with Angular 9:
  // You should use the object {static: true} as the second paramenter in the ViewChild decorator,
  // otherwise you'll get a runtime error.
  // like this:
  //
  // @ViewChild('search', { static: true }) searchBox: SearchboxComponent;
  //
  @ViewChild('search',{static: true}) searchBox: SearchboxComponent;
  ngOnInit(){
    this.searchBox.value.pipe( 
      switchMap(val=>this.postsService.search(val))
    ).subscribe( 
      data => this.posts = data
    );
    
  }

  public posts;
  constructor(private postsService: PostsService) { }

}
