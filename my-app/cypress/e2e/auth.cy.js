"use strict";
/// <reference types="cypress" />
describe("auth", () => {
    describe("test register", () => {
        beforeEach(() => {
            cy.visit("/register");
            cy.getByName("firstname").type("batuhan");
            cy.getByName("lastname").type("kir");
            cy.getByName("email").type("batuhankir1163@gmail.com");
            cy.getByName("password").type("1907");
            cy.getByName("password2").type("1907");
        });
        it("successfuly register", () => {
            cy.get("button[type=submit]").click();
            cy.url().should("include", "/");
        });
        it("user already taken", () => {
            cy.get("button[type=submit]").click();
            cy.contains("user already exist").should("be.visible");
        });
    });
    describe("login", () => {
        it("succesfuly login", () => {
            cy.login("batuhankir1163@gmail.com", "1907");
        });
        it("unvalid user login", () => {
            cy.login("batuhankir1163@gmail.com", "1998");
            cy.contains("invalid user").should("be.visible");
        });
    });
    describe("logout", () => {
        beforeEach(() => {
            cy.visit("/login");
            cy.login("batuhankir1163@gmail.com", "1907");
        });
        it("large screen logout", () => {
            cy.get("[data-testid=logout]").click();
            cy.url().should("include", "/login");
        });
        it("small screen logout", () => {
            cy.viewport(700, 657);
            cy.get("[data-testid=logout-sm]").click();
            cy.url().should("include", "/login");
        });
    });
    /* describe("forget password", () => {
      it("forget password", () => {
        cy.visit("/login");
        cy.get(".MuiButton-text").click();
  
        cy.getByName("email").type("batuhankir1163@gmail.com");
        cy.get("button[type=submit]").click();
  
        cy.contains(
          "Please check your email. We send a reset link to reset your password"
        ).should("be.visible");
      });
    }); */
});
