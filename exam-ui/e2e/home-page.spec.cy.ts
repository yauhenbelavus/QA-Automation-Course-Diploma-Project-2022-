import { HomePage } from "../pages/homePage";
import { CHAPTER_PAGES } from "exam-ui/support/types";
import { coffePage } from "exam-ui/support/constans";

const homePage = new HomePage();
const generalElementsNumber = 8;
const newCoffeesElementsNumber = 4;

describe('Rum Baba HomePage actions', () => {
   beforeEach(() => {
       homePage.visitPage();
   });

   it(`Should open correct pages after clicking ${generalElementsNumber} "General" chapter footer elements one by one`, () => {
       homePage.checkForRedirectionToGeneralChapterPages(generalElementsNumber, CHAPTER_PAGES);
   });

   it(`Should redirect to "Coffee" page after clicking "Shop Coffee Beans" button`, () => {
       homePage.clickOnShopCoffeeBeansButton();
       homePage.waitForPageLoad(coffePage);
   });

   it(`Should dispaly ${newCoffeesElementsNumber} elements of 'New Coffees' block`, () => {
       expect(homePage.getNewCoffeesModuleElementsCount(newCoffeesElementsNumber)).to.be.equal(newCoffeesElementsNumber);
   });
});