import { ProductPage } from '../pages/productPage';
import { HomePage } from '../pages/homePage'
import { PRODUCTS_LOCATORS } from 'exam-ui/support/types';

const productPage = new ProductPage();
const homePage = new HomePage();
const timesToClick = 3;

describe('Rum Baba "Product Page" testing', () => {
    beforeEach('Visit Product Page', () => {
        homePage.visitPage();
        homePage.header.clickOnCoffeeButton();
        homePage.header.clickOnAllCoffeeButton();
        productPage.clickOnProductPageLink(PRODUCTS_LOCATORS.BRAZILCLASSIC);
    });
    
    it('Should display clickable "Add to cart button" on "Product" page:', () => {
        productPage.waitForElementEnable(productPage.addToCartButton);
    });

    it('Should display actual number of added products inside "View my cart" button', () => {
        let clicksNumberQuantity = productPage.getClicksNumber(timesToClick);
        productPage.clickOnAddToCartButton();
        productPage.waitForElementVisible(productPage.viewMyCartButton);
        productPage.checkForItemsNumberInCartPreview(clicksNumberQuantity + 1);
    });

    it('Should display message "Item added to your cart" on "Shopping cart" pop-up after product was added in cart', () => {
        productPage.clickOnAddToCartButton();
        productPage.waitForElementVisible(productPage.productWasAddedNotificationElement);
    });
});