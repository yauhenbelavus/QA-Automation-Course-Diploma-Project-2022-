import { BasePage } from "./basePage";
import { Footer } from "./footer";
import { Header } from "./header";

export class HomePage extends BasePage {
    public footer: Footer
    public header: Header
    constructor() {
    super()

    this.footer = new Footer();
    this.header = new Header();
  }

get shopCoffeBeansButton() {
    return '#shopify-section-template--14147332407433__rich_text > div > div > div > a';
  }

get newCoffeesBlock() {
    return '#shopify-section-template--14147332407433__1660216352f9e02460 > div > div > h2';
  }

public getNewCoffeesBlockElementByIndex(index: number) {
    return `#shopify-section-template--14147332407433__1660216352f9e02460 > div > slider-component > ul > li:nth-child(${index}) > div > a`;
  }

public clickOnShopCoffeeBeansButton() {
    cy.get(this.shopCoffeBeansButton).click();
  }

public checkForRedirectionToGeneralChapterPages(elementsNumber: number, pages: Object) {
    for(let index = 1; index <= elementsNumber; index++) {
       this.footer.clickGeneralChapterFooterElement(index); 
       this.waitForPageLoad(Object.values(pages)[index - 1]);
       this.navigatePageBack();
    }
  }

public getNewCoffeesModuleElementsCount(elementsNumber: number): number {
    let count = 0;
    for(let index = 1; index <= elementsNumber; index++) {
       this.waitForElementVisible(this.getNewCoffeesBlockElementByIndex(index));
       count++
    }
    return count;
  }
}