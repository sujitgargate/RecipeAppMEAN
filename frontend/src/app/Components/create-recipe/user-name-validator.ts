import { ValidatorFn, AbstractControl } from '@angular/forms';

import {RecipeListComponent} from '../recipe-list/recipe-list.component'


export function recipeUniqueNameValidator() : ValidatorFn {

  return(control : AbstractControl): {[key:string] :boolean} | null =>{

 console.log(control.value, '<<<<<>>>>>>>>>>');

    if(control.value == "sam"){
      return {'NameNotAllowd' : true};
    }
    return null;
  };

}
