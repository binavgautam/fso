/* eslint-disable no-undef */
describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user1 = {
      username: "lin",
      password: "lin",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user1);
    cy.visit("http://localhost:3000");
  });
  it("front page can be opened", function () {
    cy.contains("Blogs");
  });

  it("Logging In", function () {
    cy.get("#loginFormButton").click();
    cy.get("#username").type("lin");
    cy.get("#password").type("lin");
    cy.get("#loginButton").click();
    cy.contains("Hello lin!");
  });

  it("Login fails ", function () {
    cy.get("#loginFormButton").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#loginButton").click();

    cy.contains("Wrong credentials");
  });

  describe("Logged In", function () {
    beforeEach(function () {
      cy.login({
        username: "lin",
        password: "lin",
      });
    });

    it("Adding new blog", function () {
      cy.get("#newBlog").click();
      cy.get("#title").type("cypress test");
      cy.get("#author").type("cypress");
      cy.get("#url").type("cyp");
      cy.get("#addBlog").click();
      cy.contains("cypress");
    });

    describe("Blog exists", function () {
      beforeEach(function () {
        cy.newBlog({
          title: "cypress test",
          author: "cypress",
          url: "cyp",
        });
        cy.newBlog({
          title: "jest test",
          author: "jest",
          url: "jst",
        });
      });

      it.only("Like", function () {
        cy.contains("jest test").contains("view").click();
        cy.get("#like").click();
        cy.contains("1");
        cy.contains("jest test").contains("hide").click();
        cy.contains("jest test").contains("view").click();
        cy.get("#like").click();
        cy.contains("2");
      });

      it("Delete", function () {
        cy.get("#view").click();
        cy.get("#delete").click();
        cy.on("window:confirm", () => true);
        cy.contains("test deleted successfully");
      });
    });
  });
});
