describe('NutriCalc App', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  it('allows adding a new product', () => {
    const productName = 'Apple';
    const amount = '0.2';
    const calories = '52';

    cy.get('[data-testid="product-name"]').type(productName);
    cy.get('[data-testid="product-amount"]').type(amount);
    cy.get('[data-testid="calories-per-100g"]').type(calories);
    cy.get('button[type="submit"]').click();

    cy.contains(productName).should('be.visible');
    cy.contains('10.40').should('be.visible'); // Total calories for 0.2kg of apple
  });

  it('calculates total calories correctly', () => {
    // Add first product
    cy.get('[data-testid="product-name"]').type('Banana');
    cy.get('[data-testid="product-amount"]').type('0.3');
    cy.get('[data-testid="calories-per-100g"]').type('89');
    cy.get('button[type="submit"]').click();

    // Add second product
    cy.get('[data-testid="product-name"]').clear().type('Orange');
    cy.get('[data-testid="product-amount"]').clear().type('0.2');
    cy.get('[data-testid="calories-per-100g"]').clear().type('47');
    cy.get('button[type="submit"]').click();

    // Check total calories (26.7 + 9.4 = 36.1)
    cy.contains('Total Calories: 36.10').should('be.visible');
  });

  it('allows deleting a product', () => {
    // Add a product
    cy.get('[data-testid="product-name"]').type('Mango');
    cy.get('[data-testid="product-amount"]').type('0.4');
    cy.get('[data-testid="calories-per-100g"]').type('60');
    cy.get('button[type="submit"]').click();

    // Delete the product
    cy.contains('Delete').click();

    // Verify product is removed
    cy.contains('Mango').should('not.exist');
    cy.contains('Total Calories: 0.00').should('be.visible');
  });

  it('persists data in localStorage', () => {
    // Add a product
    cy.get('[data-testid="product-name"]').type('Pear');
    cy.get('[data-testid="product-amount"]').type('0.3');
    cy.get('[data-testid="calories-per-100g"]').type('57');
    cy.get('button[type="submit"]').click();

    // Reload the page
    cy.reload();

    // Verify data persists
    cy.contains('Pear').should('be.visible');
    cy.contains('17.10').should('be.visible'); // Total calories for 0.3kg of pear
  });

  it('allows sharing summary via WhatsApp', () => {
    // Add a product
    cy.get('[data-testid="product-name"]').type('Grape');
    cy.get('[data-testid="product-amount"]').type('0.2');
    cy.get('[data-testid="calories-per-100g"]').type('67');
    cy.get('button[type="submit"]').click();

    // Click share button
    cy.contains('Share Summary via WhatsApp').click();

    // Verify WhatsApp URL is correct
    cy.window().then((win) => {
      expect(win.open).to.be.calledWith(
        Cypress.sinon.match(/https:\/\/wa\.me\/\?text=.*Grape.*13\.40.*calories/)
      );
    });
  });
});