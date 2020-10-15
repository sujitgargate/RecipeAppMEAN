import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Injectable, OnInit, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RecipeListComponent } from '../recipe-list/recipe-list.component';

//import { recipeUniqueNameValidator } from '../create-recipe/user-name-validator';

export interface Ingredients {
  name: string;
}

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
})
export class CreateRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  uploadFiles;
  images;
  dataSource2: Object;
  //name : any;

  response: Object;

  time = {
    hour: 13,
    minute: 30,
  };

  cusineTypes: string[] = ['Italian', 'South Indian', 'Chinese', 'Punjabi'];

  recipeCategory : string
  recipeCategories :string[]= ['veg','nonVeg']

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredients: Ingredients[] = [];

  public recipeListComponent: RecipeListComponent;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    public dialogRef: MatDialogRef<CreateRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any //,public recipeListComponent: RecipeListComponent
  ) {}

  ngOnInit(): void {
    //debugger;

    this.getList();
    console.log(this.data);
    if (this.data) {
      this.recipeForm = this.fb.group({
        _id: [this.data._id],

        name: [
          this.data._id,
          {
            validators: [Validators.required],
            updateOn: 'change',
          },
        ],
        calories: [
          this.data.calories,
          Validators.required,
          Validators.pattern('[0-9]'),
        ],
        description: [this.data.description, Validators.required],
        file: [this.data.imageUrl, Validators.required],
        recipeCreatedDate: [this.data.recipeCreatedDate, Validators.required],
        ingredient: [this.data.ingredients],
        cusineType: [this.data.cusineType],
        recipeMakingTime: [JSON.stringify(this.data.recipeMakingTime)],
        recipeCategory: [this.data.recipeCategory],
      });
    } else {
      this.recipeForm = this.fb.group({
        name: [
          '',
          {
            validators: [Validators.required, this.recipeUniqueNameValidator()],
            updateOn: 'change',
          },
        ],

        calories: ['', Validators.required, Validators.pattern('[0-9]')],
        description: ['', Validators.required],
        file: ['', Validators.required],
        recipeCreatedDate: ['', Validators.required],
        ingredient: ['', Validators.required],
        cusineType: ['', Validators.required],
        recipeMakingTime: ['', Validators.required],
        recipeCategory: ['', Validators.required],
      });
    }
  }

  add(event: MatChipInputEvent): void {
    //debugger;
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.ingredients.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(ingredients: Ingredients): void {
    const index = this.ingredients.indexOf(ingredients);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

  createRecipe() {
    this.recipeService
      .add(this.recipeForm.value, this.images)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['list']);
      });
  }

  updateRecipe() {
    this.recipeService
      .update(this.recipeForm.value, this.images)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['list']);
      });
  }

  deleteRecipe() {
    this.recipeService.delete(this.recipeForm.value._id).subscribe((res) => {
      console.log(res);
      this.router.navigate(['list']);
    });
  }

  fileChange(element) {
    const uploadFiles = element.target.files[0];
    this.images = uploadFiles;
  }

  // //keyPress Event
  // onKeypress(event: any) {}

  get recipeName() {
    return this.recipeForm.get('name');
  }

  getList() {
    this.recipeService.get().subscribe((response) => {
      this.dataSource2 = response;
      console.log(
        '<<<<<<<<>>>>>>>create list',
        this.dataSource2.constructor.length
      );
    });
  }

  recipeUniqueNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      // console.log(
      //   this.recipeForm,
      //   '>>>>>>>>>>>>>>>>>>> dataSource'
      // );

      // console.log(control.value, '<<<<<>>>>>>>>>>');

      //console.log(this.recipeListComponent,"<<<<<<<<<<<<<<<<<<<<<<<<<<response");
      // if (control.value == this.recipeListComponent.response) {

      // this.recipeListComponent.response.forEach(element => {
      //   if(element== name){
      //     console.log(name);

      //   }
      // });

      // function find() {
      //   for (let i = 0; i < this.recipeListComponent.response.lenght; i++) {
      //     let foundElement = this.recipeListComponent.response[i].name;
      //     return foundElement;
      //   }
      // }
      // console.log(find(),"<<<<<<<<<<<find");

      // let varr = this.dataSource2[0].name
      // console.log(varr, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> iiiiiiiii');

      // var finalArray = this.response.map(function (obj) {
      //   return obj.name;
      // });

      // console.log(finalArray,"datasource2>>>>>>>");

      if (control.value == 'sam') {
        return { NameNotAllowd: true };
      }

      return null;
    };
  }
}
