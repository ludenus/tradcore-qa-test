describe('API Testing with Cypress', () => {

    const valid_acccess_token = "00000000-0000-0000-0000-000000000000"
    // AA: In real project the above code would not pass my code review.
    // Sensitive information, such as secrets and passwords must never be kept in repository.
    // Jenkins secrets, AWS SSM, Hashicorp Vault or similar service should be used instead. 

    it('Negative: get all users, POST instead of GET', () => {
        cy.request({
            method: 'POST',
            url: '/users',
            failOnStatusCode: false
        })
            .its('status')
            .should('equal', 404);
    });

    it('Negative: get all users, missing access token', () => {
        cy.request({
            method: 'GET',
            url: '/users',
            failOnStatusCode: false
        })
            .should((response) => {
                expect(response.status).to.eq(200) //AA: 401/403 should be expected instead of 200 OK 
                expect(response.body).property('error').to.equal(true)
                expect(response.body).property('message').to.equal("Missing authorization token")
            })
    });

    it('Negative: get all users, incorrect access token', () => {
        cy.request({
            method: 'GET',
            url: '/users',
            headers: {
                acccess_token: 'incorrect_access_token'
            },
            failOnStatusCode: false
        })
            .should((response) => {
                expect(response.status).to.eq(200) //AA: 401/403 should be expected instead of 200 OK
                expect(response.body).property('error').to.equal(true)
                expect(response.body).property('message').to.equal("Missing authorization token")
            })
    });

    it('Positive: get all users', () => {
        cy.request({
            method: 'GET',
            url: '/users',
            headers: {
                authorization: valid_acccess_token
            },
            failOnStatusCode: false
        })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.lengthOf(users.length)
                expect(response.body).to.deep.equal(users)
            })
    });

    it('Negative: get user by id, POST instead of GET', () => {
        cy.request({
            method: 'POST',
            url: `/users/${active_user.user_id}`,
            headers: {
                authorization: valid_acccess_token
            },
            failOnStatusCode: false
        })
            .should((response) => {
                expect(response.status).to.eq(404)
            })
    });

    it('Negative: get user by id, missing access token', () => {
        cy.request({
            method: 'GET',
            url: `/users/${active_user.user_id}`,
            failOnStatusCode: false
        })
            .should((response) => {
                expect(response.status).to.eq(200) //AA: 401/403 should be expected instead of 200 OK
                expect(response.body).property('error').to.equal(true)
                expect(response.body).property('message').to.equal("Missing authorization token")
            })
    });

    it('Negative: get user by id, incorrect access token', () => {
        cy.request({
            method: 'GET',
            url: `/users/${active_user.user_id}`,
            headers: {
                authorization: 'incorrect_access_token'
            },
            failOnStatusCode: false
        })
            .should((response) => {
                expect(response.status).to.eq(200) //AA: 401/403 should be expected instead of 200 OK
                expect(response.body).property('error').to.equal(true)
                expect(response.body).property('message').to.equal("Missing authorization token")
            })
    });

    it('Negative: get user by id, inactive user', () => {
        cy.request({
            method: 'GET',
            url: `/users/${inactive_user.user_id}`,
            headers: {
                authorization: valid_acccess_token
            },
            failOnStatusCode: false
        })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).property('error').to.equal(true)
                expect(response.body).property('message').to.equal("User is not active")
            })
    });


    it('Negative: get user by id, non-existing user_id', () => {
        cy.request({
            method: 'GET',
            url: `/users/${non_existing_user_id}`,
            headers: {
                authorization: valid_acccess_token
            },
            failOnStatusCode: false
        })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).property('error').to.equal(true)
                expect(response.body).property('message').to.equal("Cannot read property \'active\' of undefined")
            })
    });

    it('Positive: get user by id', () => {
        cy.request({
            method: 'GET',
            url: `/users/${active_user.user_id}`,
            headers: {
                authorization: valid_acccess_token
            },
            failOnStatusCode: false
        })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.deep.equal(active_user)
            })
    });


    it('Negative: get accounts by user id, missing access token', () => {
        cy.request({
            method: 'GET',
            url: `/users/${active_user.user_id}/accounts`,
            failOnStatusCode: false
        })
            .should((response) => {
                expect(response.status).to.eq(200) //AA: 401/403 should be expected instead of 200 OK
                expect(response.body).property('error').to.equal(true)
                expect(response.body).property('message').to.equal("Missing authorization token")
            })
    });

    it('Negative: get accounts by user id, incorrect access token', () => {
        cy.request({
            method: 'GET',
            url: `/users/${active_user.user_id}/accounts`,
            headers: {
                authorization: 'incorrect_access_token'
            },
            failOnStatusCode: false
        })
            .should((response) => {
                expect(response.status).to.eq(200) //AA: 401/403 should be expected instead of 200 OK
                expect(response.body).property('error').to.equal(true)
                expect(response.body).property('message').to.equal("Missing authorization token")
            })
    });


    it('Negative: get accounts by user id, inactive user', () => {
        cy.request({
            method: 'GET',
            url: `/users/${inactive_user.user_id}/accounts`,
            headers: {
                authorization: valid_acccess_token
            },
            failOnStatusCode: false
        })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).property('error').to.equal(true)
                expect(response.body).property('message').to.equal("User is not active")
            })
    });

    it('Negative: get accounts by user id, time lord', () => {
        cy.request({
            method: 'GET',
            url: `/users/${time_lord_user.user_id}/accounts`,
            headers: {
                authorization: valid_acccess_token
            },
            failOnStatusCode: false
        })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).property('error').to.equal(true)
                expect(response.body).property('message').to.equal("Time lords do not have accounts")
            })
    });

    it('Negative: get accounts by user id, non-existing user_id', () => {
        cy.request({
            method: 'GET',
            url: `/users/${non_existing_user_id}/accounts`,
            headers: {
                authorization: valid_acccess_token
            },
            failOnStatusCode: false
        })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).property('error').to.equal(true)
                expect(response.body).property('message').to.equal("Cannot read property \'active\' of undefined")
            })
    });

    it('Positive: get accounts by user id', () => {
        cy.request({
            method: 'GET',
            url: `/users/${active_user.user_id}/accounts`,
            headers: {
                authorization: valid_acccess_token
            },
            failOnStatusCode: false
        })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.deep.equal(active_user_accounts)
            })
    });

    const users = [
        {
            "active": true,
            "name": "User The One",
            "title": "Pljeskavica master",
            "user_id": 1
        },
        {
            "active": true,
            "name": "User The Two",
            "title": "Rakija master",
            "user_id": 2
        },
        {
            "active": false,
            "name": "User The Three",
            "title": "Salata master",
            "user_id": 3
        },
        {
            "active": false,
            "name": "User The Four",
            "title": "Drugstore master",
            "user_id": 4
        },
        {
            "active": true,
            "name": "The Master",
            "title": "Evil timelord",
            "user_id": 5
        },
        {
            "active": true,
            "name": "The Doctor",
            "title": "Good timelord",
            "user_id": 6
        }
    ]


    const accounts = [
        [
            {
                account_id: 1,
                name: `Wife's account`,
                active: true,
                money: 100,
            },
        ],
        [
            {
                account_id: 2,
                name: `Cat's account`,
                active: true,
                money: 150,
            },
            {
                account_id: 3,
                name: `Dog's account`,
                active: false,
                money: 100,
            },
        ],
        [
            {
                account_id: 1,
                name: `My account`,
                active: true,
                money: 200,
            },
        ],
        [
            {
                account_id: 1,
                name: `Savings account`,
                active: true,
                money: 300,
            },
        ],
    ];

    const active_user = users.find(u => true == u.active);
    const inactive_user = users.find(u => false == u.active);
    // const time_lord_user = users.find(u => (5 == u.user_id) || (6 == u.user_id));
    const time_lord_user = users.find(u => u.title.toLowerCase().includes('timelord'));
    const non_existing_user_id = Number.MAX_SAFE_INTEGER
    const active_user_accounts = accounts[active_user.user_id - 1]

})
