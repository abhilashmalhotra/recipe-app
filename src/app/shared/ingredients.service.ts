import { Ingredient } from './ingredient.model';
import { Subject } from 'rxjs';

export class IngredientServices {
    ingredientChanged = new Subject();
    startedEditing = new Subject<number>();
    private  ingredients: Ingredient[] = [
        new Ingredient('Apple', 20),
        new Ingredient('Tomato', 80),
        new Ingredient('Ginger', 10),
      ]
    constructor() {

    }

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index) {
        return this.ingredients[index];
    }

    updateIngredient(index, ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index) {
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}