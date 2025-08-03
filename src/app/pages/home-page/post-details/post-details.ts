import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Post } from '../../../models/posts.model';
import { DateFormatPipeTsPipe } from "../../../pipes/date-format.pipe.ts-pipe";
import { PostService } from '../../../service/auth/post.service';

@Component({
  selector: 'app-post-details',
  imports: [DateFormatPipeTsPipe],
  templateUrl: './post-details.html',
  styleUrl: './post-details.css'
})
export class PostDetails {
  protected auth = inject(AuthService)
  private postService = inject(PostService)

  @Input() post!: Post;
  @Output() deleted = new EventEmitter<string>();


  onDelete(){
    if (confirm("Sei sicuro di voler cancellare questo post?")){
      this.postService.deletePost(this.post.id).subscribe({
        next: () => this.deleted.emit(this.post.id),
        error: (err) => console.error('Errore: ', err)
      })
    }
  }

}
