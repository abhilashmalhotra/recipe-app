import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService {
    recipeSeleted = new Subject();
    recipeChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe(
            'Simple Cauliflower Keto Casserole',
            'Cauliflower in a cheese sauce is a perfect recipe',
            'https://images.media-allrecipes.com/userphotos/560x315/7033221.jpg',
            [
                new Ingredient('Cauliflower', 200),
                new Ingredient('Cheese', 70)
            ]
        ),
        new Recipe(
            'Grandpa\'s Classic Coney Sauce',
            'Drive-in restaurant back in the 1950\'s. exact recipe ',
            'https://images.media-allrecipes.com/userphotos/560x315/649489.jpg',
            [
                new Ingredient('Coney', 12),
                new Ingredient('Sauce', 45)
            ]
        ),
        new Recipe(
            'Downeast Maine Pumpkin Bread',
            'This is a great old Maine recipe, moist and spicy.',
            'https://images.media-allrecipes.com/userphotos/560x315/4567827.jpg',
            [
                new Ingredient('Pumpkin', 23),
                new Ingredient('Bread', 49)
            ]
        ),
    ];
    constructor() { }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index) {
        return this.recipes.slice()[index];
    }

    addRecipe(newRecipe: Recipe) {
        this.recipes.push(newRecipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }
    deleteRecipe(index) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice())
    }
}