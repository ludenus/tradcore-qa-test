describe('Hello World!', () => {

    beforeEach(() => {
        cy.request('/').as('root')
    });

    it('Validate the status code', () => {
        cy.get('@root')
            .its('status')
            .should('equal', 200);
    });


    it('Validate the header', () => {
        cy.get('@root')
            .its('headers')
            .its('content-type')
            .should('include', 'text/html; charset=utf-8');
    });


    it('Validate the body', () => {
        cy.get('@root')
            .its('body')
            .should('equal', 'Hello World!');
    });

})
