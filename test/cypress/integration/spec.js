describe('API Testing with Cypress', () => {

   beforeEach(() => {
       cy.request('/').as('root')

   });

   it('Validate the status code', () => {

         cy.get('@root')
             .its('status')
             .should('equal', 200);
     });

})
