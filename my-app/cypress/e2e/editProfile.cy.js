"use strict";
describe("edit profile", () => {
    beforeEach(() => {
        cy.visit("/login");
        cy.login("batuhankir1163@gmail.com", "1907");
    });
    it("edit profile", () => {
        cy.get('.menu-items-container > [data-testid="edit"]').click();
        cy.get("input[type=file]").selectFile("C:/Users/asüs/OneDrive/Masaüstü/Yeni klasör (5)/my-app/src/assets/hqdefault.jpg");
        cy.getByName("firstname").clear().type("edited firstname");
        cy.getByName("lastname").clear().type("edited lastname");
        cy.get("button[type=submit]").click();
        cy.getByName("firstname").should("have.value", "edited firstname");
        cy.getByName("lastname").should("have.value", "edited lastname");
    });
    /* it("change password", () => {
      cy.get('.menu-items-container > [data-testid="edit"]').click();
      cy.get(".MuiButton-text").click();
  
      cy.getByName("oldPassword").type("1907");
      cy.getByName("newPassword").type("1998");
      cy.getByName("newPassword2").type("1998");
  
      cy.get("button[type=submit]").click();
      cy.url().should("contain", "/");
    }); */
});
