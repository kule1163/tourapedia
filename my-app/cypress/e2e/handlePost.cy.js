"use strict";
describe("handle post", () => {
    beforeEach(() => {
        cy.login("batuhankir1163@gmail.com", "1907");
    });
    it("create post", () => {
        cy.get('.menu-items-container > [data-testid="add tour"]').click();
        cy.getByName("title").type("a");
        cy.getByName("tags").type("a");
        cy.get('[data-testid="category"] > #demo-select-small').click();
        cy.get('[data-value="sea"] > .MuiTypography-root').click();
        cy.get('[data-testid="description"]').type("a", { force: true });
        cy.get(".MuiButton-root").click();
        cy.url().should("include", "/");
    });
    it("like dislike post", () => {
        //like-dislike
        cy.get(':nth-child(1) > .single-post-box > .like-container > :nth-child(1) > [data-testid="like"]').click();
        cy.get(':nth-child(1) > .single-post-box > .like-container > :nth-child(1) > [data-testid="like"] > [data-testid="fill-like"]').should("be.visible");
        cy.get(':nth-child(1) > .single-post-box > .like-container > :nth-child(2) > [data-testid="dislike"]').click();
        cy.get(':nth-child(1) > .single-post-box > .like-container > :nth-child(1) > [data-testid="like"] > [data-testid="outline-like"]').should("be.visible");
        //like-unlike
        cy.get(':nth-child(1) > .single-post-box > .like-container > :nth-child(1) > [data-testid="like"]').click();
        cy.get(':nth-child(1) > .single-post-box > .like-container > :nth-child(1) > [data-testid="like"] > [data-testid="fill-like"]').should("be.visible");
        cy.get(':nth-child(1) > .single-post-box > .like-container > :nth-child(1) > [data-testid="like"]').click();
        cy.get(':nth-child(1) > .single-post-box > .like-container > :nth-child(1) > [data-testid="like"] > [data-testid="outline-like"]').should("be.visible");
        //dislike-undislike
        cy.get(':nth-child(1) > .single-post-box > .like-container > :nth-child(2) > [data-testid="dislike"]').click();
        cy.get(':nth-child(1) > .single-post-box > .like-container > :nth-child(2) > [data-testid="dislike"] > [data-testid="fill-dislike"]').should("be.visible");
        cy.get(':nth-child(1) > .single-post-box > .like-container > :nth-child(2) > [data-testid="dislike"]').click();
        cy.get(':nth-child(1) > .single-post-box > .like-container > :nth-child(2) > [data-testid="dislike"] > [data-testid="outline-dislike"]').should("be.visible");
    });
    it("edit post", () => {
        cy.get('.menu-items-container > [data-testid="dashboard"]').click();
        cy.get(":nth-child(1) > .update-box > .update").click();
        cy.getByName("title").type("edit then delete");
        cy.getByName("tags").type("edit");
        cy.get('[data-testid="category"] > #demo-select-small').click();
        cy.get('[data-value="historic"] > .MuiTypography-root').click();
        cy.get('[data-testid="description"]').type("edit", { force: true });
        cy.get("input[type=file]").selectFile("C:/Users/asüs/OneDrive/Masaüstü/Yeni klasör (5)/my-app/src/assets/hqdefault.jpg");
        cy.get(".MuiButton-root").click();
        cy.url().should("include", "/");
    });
    it("delete post", () => {
        cy.get('.menu-items-container > [data-testid="dashboard"]').click();
        cy.contains("edit then delete").should("be.visible");
        cy.get(":nth-child(1) > .update-box > .delete").click();
        cy.contains("edit then delete").should("not.exist");
    });
});
