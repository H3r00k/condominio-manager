import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../shared/header/header';
import { PostDetails } from './post-details/post-details';
import { AuthService } from '../../service/auth/auth.service';
import { NewPostPayload, Post } from '../../models/posts.model';
import { FormsModule, NgForm } from '@angular/forms';
import { PostService } from '../../service/auth/post.service';
import { NavigationService } from '../../service/navigation.service';

@Component({
  selector: 'app-home-page',
  imports: [Header, PostDetails, FormsModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  protected nav = inject(NavigationService);
  protected view = this.nav.view;
  protected auth = inject(AuthService);
  private postService = inject(PostService);

  protected posts: Post[] = [];

  popupPost = false;
  successMessage = '';
  errorMessage = '';

  formData: NewPostPayload = {
    title: '',
    content: '',
  };

  showPopupPost() {
    this.popupPost = true;
  }

  closePopupPost() {
    this.popupPost = false;
  }

  onSubmit(form: NgForm) {
    this.postService.addPost(this.formData).subscribe({
      next: (newPost: Post) => {
        this.successMessage = 'Post aggiunto con successo!';
        this.errorMessage = '';
        this.posts.unshift(newPost);
        form.reset();
        this.closePopupPost();
        setTimeout(() => (this.successMessage = ''), 2500);
      },
      error: (err) => {
        this.errorMessage = "Errore durante l'aggiunta del post. Riprova!";
        this.successMessage = '';
      },
    });
  }

  onPostDeleted(postId: string) {
    this.posts = this.posts.filter((post) => post.id !== postId);
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.reverse();
      },
      error: (err) => {
        console.log('Errore nel caricamento dei post', err);
      },
    });
  }
}
