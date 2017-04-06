import { ClientTourOfHeroesPage } from './app.po';

describe('client-tour-of-heroes App', () => {
  let page: ClientTourOfHeroesPage;

  beforeEach(() => {
    page = new ClientTourOfHeroesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
