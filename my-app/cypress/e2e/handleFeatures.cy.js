"use strict";
/// <reference types="cypress" />
describe("handle features", () => {
    it("change page", () => {
        cy.intercept("GET", "http://localhost:5000/posts/?page=1", {
            fixture: "tours1.json",
        });
        cy.intercept("GET", "http://localhost:5000/posts/?page=2", {
            fixture: "tours2.json",
        });
        cy.visit("/");
        //click page number
        cy.get(":nth-child(3) > .MuiButtonBase-root").click();
        cy.contains("Machu Picchu. Aguas Calientes").should("be.visible");
        //back button
        cy.get('[data-testid="NavigateBeforeIcon"]').click();
        cy.contains("mithras").should("be.visible");
        //next button
        cy.get(":nth-child(4) > .MuiButtonBase-root").click();
        cy.contains("Machu Picchu. Aguas Calientes").should("be.visible");
    });
    it("click populer tag", () => {
        cy.intercept("GET", "http://localhost:5000/posts/?page=1", {
            fixture: "tours1.json",
        });
        cy.intercept("GET", "http://localhost:5000/posts/tag/historic", {
            fixture: "tagHistoric.json",
        });
        cy.visit("/");
        cy.get(".text-container > :nth-child(8)").click();
        cy.contains("Machu Picchu. Aguas Calientes").should("be.visible");
    });
    it("click populer category", () => {
        cy.intercept("GET", "http://localhost:5000/posts/?page=1", {
            fixture: "tours1.json",
        });
        cy.intercept("GET", "http://localhost:5000/posts/category/beach", {
            fixture: "categoryBeach.json",
        });
        cy.visit("/");
        cy.get(".categ-box > :nth-child(3)").click();
        cy.contains("maldivs").should("be.visible");
    });
});
