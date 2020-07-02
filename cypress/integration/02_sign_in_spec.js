describe('Sign In', () => {

    const valid_mail = 'user@ma.il'
    const valid_pass = 'password'
    const expected_acccess_token = "00000000-0000-0000-0000-000000000000"
    // AA: In real project the above code would not pass my code review.
    // Sensitive information, such as secrets and passwords must never be kept in repository.
    // Jenkins secrets, AWS SSM, Hashicorp Vault or similar service should be used instead. 

    it('Negative: GET instead of POST', () => {
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
                email: valid_mail,
                password: 'incorrect-password',
            },
            failOnStatusCode: false
        })
            .should((response) => {
                expect(response.status).to.eq(200)
                // AA: For a real project I would file a bug here: 
                // 401 Unauthorized or 403 Forbidden should be expected instead of 200 OK.
                expect(response.body).property('error').to.equal(true)
                expect(response.body).property('message').to.equal("Wrong password or email")
            })
    });

    it('Positive: Successful sign-in', () => {
        cy.request({
            method: 'POST',
            url: '/sign-in',
            body: {
                email: valid_mail,
                password: valid_pass,
            },
        })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.deep.equal({ "access_token": expected_acccess_token })
            })
    });


})
