
export class Footer {
  constructor() {}
   
public getGeneralChapterFooterElementByIndex(index: number) {
    return `#shopify-section-footer > footer > div.footer__content-top.page-width > div.footer__blocks-wrapper.grid.grid--1-col.grid--2-col.grid--4-col-tablet.grid--4-col-desktop > div:nth-child(5) > ul > li:nth-child(${index}) > a`;
  }

public clickGeneralChapterFooterElement(index: number) {
    cy.get(this.getGeneralChapterFooterElementByIndex(index)).click();
  }
}