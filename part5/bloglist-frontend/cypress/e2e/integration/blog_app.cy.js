describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    // Creo un usuario para iniciar sesión:
    const user = { username: 'rootUser', name: 'user', password: '1234' };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#usernameInput').type('rootUser');
      cy.get('#passwordInput').type('1234');
      cy.get('#loginButton').click();
      cy.contains('rootUser logged in');
    });

    it('fails with wrong credentials', () => {
      cy.get('#usernameInput').type('userRoot');
      cy.get('#passwordInput').type('4321');
      cy.get('#loginButton').click();
      cy.contains('wrong username or password');
      cy.get('.notificationError').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe.only('When logged in', () => {
    beforeEach(() => {
      cy.get('#usernameInput').type('rootUser');
      cy.get('#passwordInput').type('1234');
      cy.get('#loginButton').click();
      cy.contains('rootUser logged in');
    });

    it('A blog can be created', () => {
      cy.contains('new note').click();
      cy.get('#title').type('title of blog');
      cy.get('#author').type('author of blog');
      cy.get('#url').type('url of blog');
      cy.get('#createButton').click();
      cy.contains('a new blog title of blog by author of blog');
      cy.contains('title of blog author of blog').parent().find('button').as('viewButton');
      cy.get('@viewButton').click();
      cy.contains('url of blog');
    });
  });
});
