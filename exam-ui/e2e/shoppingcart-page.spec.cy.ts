import { ProductPage } from '../pages/productPage';
import { HomePage } from '../pages/homePage'
import { ShoppingCartPage } from '../pages/shoppingCartPage';
import { expect } from 'chai';
import { PRODUCTS_LOCATORS } from 'exam-ui/support/types';
import { shoppingCartUrl } from 'exam-ui/support/constans';

const productPage = new ProductPage();
const homePage = new HomePage();
const shoppingCartPage = new ShoppingCartPage();
const timesToClick = 3;
const costaRicaSubtotalValue = '€12,50 EUR';

describe('Rum Baba "Shopping Cart" testing', () => {
    beforeEach('Visiting "Products" Page', () => {
        homePage.visitPage();
        homePage.header.clickOnCoffeeButton();
        homePage.header.clickOnAllCoffeeButton();
    });

    describe('Shopping Cart Action', () => {
        beforeEach('Visititing "Shopping Cart" Page', () => {
            productPage.clickOnProductPageLink(PRODUCTS_LOCATORS.COSTARICA);
            productPage.clickOnAddToCartButton();
            productPage.clickOnViewMyCartButton();
        });
    
        it('Should check that "Cart Remove" button is enabled', () => {
            shoppingCartPage.checkForCartRemoveButtonIsVisible();
        });

        it(`Should display correct number of product after clicking "Increase quantity" button ${timesToClick} times`, () => {
            let clicksNumber = shoppingCartPage.getClicksNumber(timesToClick);
            let expectedValue = String(clicksNumber + 1);
            shoppingCartPage.waitForTime(shoppingCartPage.quantityElement, 1000);
            shoppingCartPage.checkForQuantityElementValue(expectedValue, "value");
        });

        it('Should always display subtotal element in "Shopping Cart" with added products', () => {
            shoppingCartPage.waitForElementVisible(shoppingCartPage.subtotalElement);
        });

        it('Should save the actual items and subtotal in "Shopping Cart" after the page being refreshed', () => {
            shoppingCartPage.waitForElementVisible(shoppingCartPage.subtotalElement);
            shoppingCartPage.checkForSubtotalValue(costaRicaSubtotalValue);
            shoppingCartPage.refreshPage();
            shoppingCartPage.waitForElementVisible(shoppingCartPage.subtotalElement);
            shoppingCartPage.checkForSubtotalValue(costaRicaSubtotalValue);
        });
    });

    describe('Shopping Cart Products', () => {
        it('Should display all added unique products in "Shopping Cart"', () => {
            let addedProductsNumber = productPage.getAddedToCartUniqueProductsNumber(PRODUCTS_LOCATORS);
            productPage.header.clickOnCartButton();
            productPage.waitForPageLoad(shoppingCartUrl);
            cy.intercept("GET", "https://rumbaba.nl/cart.json").as ('cart');
            let cartProducstCount = shoppingCartPage.getCartUniqueProductsCount(addedProductsNumber);
            cy.wait('@cart').then(data => {
            expect(data.response?.statusCode).to.equal(200);
            expect(data.response?.body.items).to.have.length(cartProducstCount);
            });
            expect(addedProductsNumber).to.equal(cartProducstCount);
        });
    });
});