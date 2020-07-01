describe('API Testing with Cypress', () => {

    it('Negative: get instead of post', () => {
        cy.request({
            method: 'GET',
            url: '/sign-in',
            failOnStatusCode: false
        })
            .its('status')
            .should('equal', 404);
    });

    it('Negative: incorrect password', () => {
        cy.request({
            method: 'POST',
            url: '/sign-in',
            body: {
                email: 'user@ma.il',
                password: 'incorrect-password',
            },
            failOnStatusCode: false
        })
        .should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).property('error').to.equal(true)
            expect(response.body).property('message').to.equal("Wrong password or email")
        })
    });

    it('Correct password', () => {
        cy.request({
            method: 'POST',
            url: '/sign-in',
            body: {
                email: 'user@ma.il',
                password: 'password',
            },
        })
        .should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.deep.equal({ "access_token": "00000000-0000-0000-0000-000000000000" })
        })
    });


})
