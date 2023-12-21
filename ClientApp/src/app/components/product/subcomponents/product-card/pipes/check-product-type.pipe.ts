import { Pipe, PipeTransform } from '@angular/core';
import product from "@assets/json/product-categories.json";

@Pipe({
  name: 'checkProductType'
})
export class CheckProductTypePipe implements PipeTransform {
  public readonly productTypes: any = product.types;

  transform(productType: string,): string {



    switch (productType) {

          case this.productTypes[0].value:
            return this.productTypes[0].label;

          case this.productTypes[1].value:
            return this.productTypes[1].label;

          case this.productTypes[2].value:
            return this.productTypes[2].label;

          case this.productTypes[3].value:
            return this.productTypes[3].label;

          case this.productTypes[4].value:
            return this.productTypes[4].label;

          case this.productTypes[5].value:
            return this.productTypes[5].value;

          case this.productTypes[6].value:
            return this.productTypes[6].label;

          case this.productTypes[7].value:
            return this.productTypes[7].label;

          case this.productTypes[8].value:
            return this.productTypes[8].label;

          case this.productTypes[9].value:
            return this.productTypes[9].label;

          case this.productTypes[10].value:
            return this.productTypes[10].label;

          default:
            return '';
        }
  }

}
