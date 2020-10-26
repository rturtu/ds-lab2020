context("Create doctor", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/doctor/signup");
    });

    it("Register", () => {
        cy.get("input[type=text]")
            .type("doctor12")
            .should("have.value", "doctor12");
        cy.get("input[type=password]")
            .type("doctor12")
            .should("have.value", "doctor12");
        cy.get("button.doctor-signup-button").click();
        cy.url().should("equal", "http://localhost:3000/doctor/dashboard");
    });
});
