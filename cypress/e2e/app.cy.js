describe("Navigation", () => {
  it("should render page header", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".header").should("have.text", "Hypercare Users");
  });

  it("should render 24 UserCards", () => {
    cy.visit("http://localhost:3000/");

    cy.get(".user-card").should("have.length", 24);
  });
});
