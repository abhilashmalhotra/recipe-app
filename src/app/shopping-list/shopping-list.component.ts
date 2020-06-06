import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { IngredientServices } from '../shared/ingredients.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private ingService: IngredientServices) { }

  ngOnInit() {
    this.ingService.ingredientChanged.subscribe((ingredient: Ingredient[]) => {
      this.ingredients = ingredient;
    })
    this.ingredients = this.ingService.getIngredients();
  }
  editIngredient(index: number) {
    this.ingService.startedEditing.next(index);
  }
}
