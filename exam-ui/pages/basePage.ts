import { baseUrl } from "../support/constans";

export class BasePage {
  
  protected url: string;
   
  constructor() {
    this.url = baseUrl;
  } 

public visitPage() {
     cy.viewport(1920, 1080);
     cy.visit(this.url);
  }
   
get pageUrl() {
    return cy.url();
  }

get pageTitle() {
     return cy.title();
  }
  
public waitForPageLoad(pageUrl: string) {
     this.pageUrl.should('include', pageUrl); 
  }

public navigatePageBack() {
     cy.go('back');
  }

public checkForTitleIsCorrect(titleName: string) {
     this.pageTitle.should('include', titleName);
  }

public refreshPage() {
     cy.reload();
  }

public click() {
     cy.click();
  }

public waitForElementVisible(locator: string) {
     cy.get(locator).should('be.visible');
  }

public waitForElementEnable(locator: string) {
    cy.get(locator).should('be.enabled');
  }

public setValue(locator: string, valueName: string) {
    cy.get(locator).type(valueName);
  }

public waitForElementIsChecked(locator: string) {
    cy.get(locator).not('[disabled]')
    .check().should('be.checked');
  }

public checkForElementAttributeValue(locator: string, attributeValue: number | string, attributeName: string) {
    cy.get(locator).invoke('attr', attributeName)
    .should('equal', attributeValue);
  }

public waitForElementExist(locator: string) {
    cy.get(locator).should('exist');
  }

public checkElementHasText(locator: string, text: string) {
    cy.get(locator).should('have.text', text);
  }

public checkElementHasAttribute(locator: string, attributeName: string) {
    cy.get(locator).should('have.attr', attributeName);
  }

public waitForTime(locator: string, time: number) {
    cy.get(locator).wait(time);
  }
}   