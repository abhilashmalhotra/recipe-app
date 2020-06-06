import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, public recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.editMode = param['id'] != null;
      this.initForm();
      // console.log(this.id);
      // console.log(this.editMode);
    })
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
    console.log((<FormArray>this.recipeForm.get('ingredients')))
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmitRecipe() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.formReset();
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.formReset();
    }
  }

  onCancel() {
    this.formReset();
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.formReset();
  }

  private formReset() {
    this.router.navigate(['../'], { relativeTo: this.route });
    this.recipeForm.reset();
  }
  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImage = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      console.log(recipe.name)
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImage = recipe.imageUrl;

      if (recipe['ingredients']) {
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name' : new FormControl(ingredient.name, Validators.required),
            'amount' : new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          })) 
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'description': new FormControl(recipeDescription),
      'imageUrl': new FormControl(recipeImage),
      'ingredients': recipeIngredients
    });
  }

}
