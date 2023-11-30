import { Pipe, PipeTransform } from '@angular/core';
import {filteringItemsHelper} from "@components/product/helpers/filtering-items-helper";

@Pipe({
  name: 'checkProductType'
})
export class CheckProductTypePipe implements PipeTransform {

  transform(productType: string,): string {

    switch (productType) {

          case filteringItemsHelper[0].value:
            return filteringItemsHelper[0].label;

          case filteringItemsHelper[1].value:
            return filteringItemsHelper[1].label;

          case filteringItemsHelper[2].value:
            return filteringItemsHelper[2].label;

          case filteringItemsHelper[3].value:
            return filteringItemsHelper[3].label;

          case filteringItemsHelper[4].value:
            return filteringItemsHelper[4].label;

          case filteringItemsHelper[5].value:
            return filteringItemsHelper[5].value;

          case filteringItemsHelper[6].value:
            return filteringItemsHelper[6].label;

          case filteringItemsHelper[7].value:
            return filteringItemsHelper[7].label;

          case filteringItemsHelper[8].value:
            return filteringItemsHelper[8].label;

          case filteringItemsHelper[9].value:
            return filteringItemsHelper[9].label;

          case filteringItemsHelper[10].value:
            return filteringItemsHelper[10].label;

          default:
            return '';
        }
  }

}
