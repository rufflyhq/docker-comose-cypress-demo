/// <reference types="cypress" />

context('Users', () => {
  beforeEach(() => {
    cy.server();
    cy.route('POST', '/api/v1/users').as('postUsers');
    cy.route('DELETE', '/api/v1/users/*').as('deleteUsers');
    cy.route('GET', '/api/v1/users').as('getUsers');
    cy.visit('/');

    cy.wait("@getUsers");
  });


  const users = [
    { name: 'Jackson Barber', email: 'JacksonBarber@fakeEmail.com' },
    { name: 'Nelle Ross', email: 'NelleRoss@fakeEmail.com' },
    { name: 'Beatrice Boone', email: 'BeatriceBoone@fakeEmail.com' },
    { name: 'Johnny Wagner', email: 'JohnnyWagner@fakeEmail.com' },
  ];

  users.forEach(x => {
    it(`Create User ${x.name}`, () => {
      cy.get('#inputName')
        .type(x.name)
        .should('have.value', x.name);

      cy.get('#inputEmail')
        .type(x.email)
        .should('have.value', x.email);

      cy.get('.btn-primary').click();
      cy.wait("@postUsers");
      cy.wait("@getUsers");
      cy.get('li.row').contains(x.name)
    });
  });

  users.forEach(x => {
    it(`Delete User ${x.name}`, () => {
      cy.get('li.row')
        .contains(x.name)
        .parent()
        .as('cell');
      cy.get('@cell').should('contain', x.email);
      cy.get('@cell').should('contain', x.name);
      cy.get('@cell').within(x => {
        cy.get('.btn-danger').click();
      });
      cy.wait("@deleteUsers");
      cy.wait("@getUsers");
    });
  });
});
