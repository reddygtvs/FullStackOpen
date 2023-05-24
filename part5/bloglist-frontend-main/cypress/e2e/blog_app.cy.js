describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Tushar Reddy",
      username: "root",
      password: "sekret",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  it("Login form is shown", function () {
    cy.contains("Login");
    cy.contains("username");
    cy.contains("password");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("sekret");
      cy.get("#login-button").click();
      cy.contains("Tushar Reddy logged in");
    });
    it("fails with wrong credentials", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.contains("Wrong username or password");
    });
  });
});
