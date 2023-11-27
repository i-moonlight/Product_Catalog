import {Component, Input} from '@angular/core';
import {Product} from "@interfaces/product";
import {moneyMask} from "@components/product/register/helpers/format-currency-helper";
import {CheckProductTypePipe} from "@components/product/helpers/pipes/check-product-type.pipe";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  //properties
  @Input() products: Product[] = [];
  protected readonly moneyMask = moneyMask;
  protected readonly Number = Number;
}
