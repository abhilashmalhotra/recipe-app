import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IngredientServices } from 'src/app/shared/ingredients.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) ingForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex = null;
  editedItem;
  constructor(private ingService: IngredientServices) { }

  ngOnInit() {
    this.subscription = this.ingService.startedEditing.subscribe((index => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.ingService.getIngredient(index);
      this.ingForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
      // console.log(this.ingForm);
      // console.log('---------------------');
      // console.log(this.editedItem.name);
      // console.log('Index: '+index);
    }))
  }

  onAddItem(form: NgForm) {
    const newIngredient = {
      name: form.value.name,
      amount: form.value.amount
    }
    if(this.editMode) {
      this.ingService.updateIngredient(this.editedItemIndex, newIngredient);
      this.resetForm();
      console.log('update');
    } else {
      this.ingService.addIngredient(newIngredient);
      this.resetForm();
      console.log('add')
    }
  }

  onDeleteItem() {
    this.ingService.deleteIngredient(this.editedItemIndex);
    this.resetForm();
  }

  private resetForm() {
    this.ingForm.reset();
    this.editMode = false;
  }

  onClear() {
    this.resetForm();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
