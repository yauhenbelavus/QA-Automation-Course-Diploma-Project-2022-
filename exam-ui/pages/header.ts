
export class Header {
  constructor() {}
   
get coffeeButton() {
    return '#shopify-section-header > sticky-header > header > nav > ul > li:nth-child(2) > details-disclosure > details > summary'; 
  }

get cartButton() {
    return '#cart-icon-bubble';
  }

get loginButton() {
    return '#shopify-section-header > sticky-header > header > div > a.header__icon.header__icon--account.link.link--text.focus-inset.small-hide';
  }

get allCoffeeButton() {
    return '#shopify-section-header > sticky-header > header > nav > ul > li:nth-child(2) > details-disclosure > details > ul > li:nth-child(1) > a';
  }

public clickOnCartButton() {
    cy.get(this.cartButton).click();
  }

public clickOnAllCoffeeButton() {
    cy.get(this.allCoffeeButton).click();
  }

public clickOnCoffeeButton() {
    cy.get(this.coffeeButton).click();
  }

public clickOnloginButton() {
    cy.get(this.loginButton).click();
  }
}