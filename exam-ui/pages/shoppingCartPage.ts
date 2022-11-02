import { shoppingCartUrl } from "../support/constans";
import { BasePage } from "./basePage";

export class ShoppingCartPage extends BasePage {
    constructor() {
        super()
        this.url = shoppingCartUrl;
  }

get сartRemoveButton() {
    return '#Remove-1';
  }
  
get increaseQuantityButton() {
    return '#CartItem-1 > td.cart-item__quantity > quantity-input > button:nth-child(3)';
  }

get quantityElement() {
    return '#Quantity-1';
  }

get subtotalElement() {
    return '#main-cart-footer > div > div > div > div.js-contents > div.totals > p';
  }

public getshoppingCartItem(index: number) {
    return `#CartItem-${index} > td.cart-item__details > a`;
  }

public checkForCartRemoveButtonIsVisible() {
    this.waitForElementVisible(this.сartRemoveButton);
  }

public getCartUniqueProductsCount(itemsCount: number): number {
    let count = 0;
    for(let index = 1; index <= itemsCount; index++) {
       this.waitForElementVisible(this.getshoppingCartItem(index));
       count++
    }
    return count;
}

public getClicksNumber(clicksNumber: number): number {
   let count = 0;
   for(let index = 1; index <= clicksNumber; index++) {
     cy.get(this.increaseQuantityButton).click();
     count++
    }
    return count;
  }

public checkForQuantityElementValue(attributeValue: number | string, attributeName: string) {
     this.waitForElementVisible( this.quantityElement);
     this.checkForElementAttributeValue(this.quantityElement, attributeValue, attributeName);
  }

public checkForSubtotalValue(subtotalValue: string) {
     this.checkElementHasText( this.subtotalElement, subtotalValue);
  }
}