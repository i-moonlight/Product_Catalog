import { Pipe, PipeTransform } from '@angular/core';
import {filteringItems} from "@components/product/list/helpers/filtering-items";

@Pipe({
  name: 'checkProductType'
})
export class CheckProductTypePipe implements PipeTransform {

  transform(productType: string,): string {

    switch (productType) {

          case filteringItems[0].value:
            return 'Relógios';

          case filteringItems[1].value:
            return 'Papelaria';

          case filteringItems[2].value:
            return 'Cuidados Pessoais';

          case filteringItems[3].value:
            return 'Automotivo';

          case filteringItems[4].value:
            return 'Brinquedos';

          case filteringItems[5].value:
            return 'Lar Inteligente';

          case filteringItems[6].value:
            return 'Cama, Mesa e Banho';

          case filteringItems[7].value:
            return 'Jogos';

          case filteringItems[8].value:
            return 'Livros';

          case filteringItems[9].value:
            return 'Informática';

          case filteringItems[10].value:
            return 'Smartphones';

          default:
            return '';
        }
  }

}
