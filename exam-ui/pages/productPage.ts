import { BasePage } from "./basePage";
import { productsPageUrl } from "../support/constans";
import { PRODUCTS_LOCATORS } from "exam-ui/support/types";
import { Header } from "./header";

export class ProductPage extends BasePage {
   public header: Header
   constructor() {
   super()
   this.url = productsPageUrl;
   this.header = new Header();
  }

get increaseQuantityButton() {
    return '#ProductInfo-template--14148891377801__main > div.product-form__input.product-form__quantity > quantity-input > button:nth-child(3)';
  }

get productWasAddedNotificationElement() {
    return '#cart-notification > div.cart-notification__header';
  }

get checkoutButton() {
  return '#cart > button';
  }

get addToCartButton() {
    return '#product-form-template--14148891377801__main > div > button';
  }

get viewMyCartButton() {
    return '#cart-notification-button';
  } 

public getProductPageLink(productLocator: PRODUCTS_LOCATORS) {
    return (productLocator);
  }

public getProductLink(productLink: string) {
    return (productLink);
  }

public clickOnAddToCartButton() {
    cy.get(this.addToCartButton).click();
  }

public clickOnProductPageLink(productLocator: PRODUCTS_LOCATORS) {
    cy.get(this.getProductPageLink(productLocator)).click();
  }

public clickOnCheckoutButton() {
    cy.get(this.checkoutButton).click();
  }
  
public clickOnViewMyCartButton() {
    cy.get(this.viewMyCartButton).click();
  }

public clickOnIncreaseQuantityButton () {
    cy.get(this.increaseQuantityButton).click();
  }

public getClicksNumber(clicksNumber: number): number {
  let count = 0;
  for(let index = 1; index <= clicksNumber; index++) {
    this.clickOnIncreaseQuantityButton();
    count++
    }
  return count;
  }

public getAddedToCartUniqueProductsNumber(uniqueProducts: any): number {
  let count = 0;
  for(const products in uniqueProducts) {
    this.clickOnProductPageLink(uniqueProducts[products]);
    this.clickOnAddToCartButton();
    this.waitForElementVisible(this.viewMyCartButton);
    this.navigatePageBack();
    count++
    }
  return count;
  }

public checkForItemsNumberInCartPreview(itemsNumber: number) {
  this.checkElementHasText(this.viewMyCartButton,`View my cart (${itemsNumber})\n`);
  }
}