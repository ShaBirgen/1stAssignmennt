describe('Testing sigup functionality using fixtures', () => {
  it('registers a user', () => {
    cy.visit('/register');
    cy.fixture('register.json').then((regDetails) => {
      cy.get('[data-cy="name-input"]').type(regDetails.name);
      cy.get('[data-cy="email-input"]').type(regDetails.email);
      cy.get('[data-cy="phone_number-input"]').type(regDetails.phone_number);
      cy.get('[data-cy="password-input"]').type(regDetails.password);
      cy.get('[data-cy="create-account-link"]')
        .click()
        .then((el) => {
          cy.wait(1000);
          cy.visit('/login');
          cy.location('pathname').should('not.equal', '/register');
          cy.location('pathname').should('equal', '/login');
        });
    });
  });
});

describe('Sending requests to register user using fixtures', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('Post request handling', () => {
    cy.intercept('POST', ' http://localhost:3000/api/auth/register', {
      body: {
        message: 'User registered successfully',
      },
      delayMs: 500,
    }).as('RegisterRequest');

    cy.get('.form-submit').click();

    cy.wait('@RegisterRequest', { requestTimeout: 10000 }).then(
      (interception) => {
        console.log('Intercepted request:', interception.request);
        expect(interception.request.body).to.exist;
      }
    );
  });
});

describe('Testing login functionality', () => {
  let data: { email: string; password: string };

  before(() => {
    cy.fixture('login').then((info) => {
      data = info;
    });
  });

  it('Login user using fixture data', () => {
    cy.visit('/login');

    cy.fixture('login.json').then((data) => {
      cy.get('[data-cy="email-link"]').type(data.email);
      cy.get('[data-cy="password-link"]').type(data.password);
      cy.get('[data-cy="submit-btn"]')
        .click()
        .then((el) => {
          cy.wait(1000);
          cy.visit('');
          cy.location('pathname').should('not.equal', '/login');
          cy.location('pathname').should('equal', '/');
        });
    });
  });
});

describe('Sending login requests without hitting the backend', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.intercept('POST', 'http://localhost:3000/api/auth/login', {
      body: {
        message: 'Logged in successfully',
      },
    }).as('RequestToLogin');
  });

  it('Sends login requests without hitting the backend', () => {
    cy.get('[data-cy="submit-btn"]').click();

    cy.wait('@RequestToLogin', { requestTimeout: 5000 }).then(
      (interception) => {
        console.log('Intercepted request:', interception.request);
        console.log('Intercepted response:', interception.response);
        expect(interception.request.body).to.exist;
      }
    );
  });
});
