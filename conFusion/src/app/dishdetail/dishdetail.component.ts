import { Component, OnInit,ViewChild } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  @ViewChild('fform') commentFormDirective;
  commentForm: FormGroup;
  comment: Comment;

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  dishcmnt = null;

  formErrors = {
    'author': '',
    'rating':'',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author Name cannot be more than 25 characters long.'
    },
    'rating': {
      'required': 'Rating is required'
    },
    'comment': {
      'required':      'Comment is required.',
    },
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) { }

    ngOnInit() {
      this.createForm();
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish;this.dishcmnt = dish; this.setPrevNext(dish.id);});
      
    }
    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

  goBack(): void {
    this.location.back();
  }
  createForm() {
    this.commentForm = this.fb.group({
      author: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: ['5' ,[Validators.required]],
      comment: ['', Validators.required ],
    });
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any) {  
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    console.log(this.comment);

    this.dishcmnt.comments.push(this.comment) 

    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
    /*this.commentFormDirective.resetForm();*/
  }

}