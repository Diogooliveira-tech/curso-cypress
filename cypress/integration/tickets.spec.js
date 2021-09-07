
describe("Tickets", () => {
    beforeEach(() => cy.visit("http://bit.ly/2XSuwCW"));

    it("fills all the text input fields", () => {
        const firstName = "Diogo";
        const lastName = "Marques de oliveira"

        cy.get("#first-name").type("Diogo");
        cy.get("#last-name").type("Marques de oliveira");
        cy.get("#email").type("diogo.asjunior@hotmail.com");
        cy.get("#requests").type("Vegetarian");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    });

    it("select two tickets", () => {
        cy.get("#ticket-quantity").select("2");
    });

    it("select 'vip' ticket type", () => {
        cy.get("#vip").check();
    });

    it("selects 'social media' checkbox", () => {
        cy.get("#social-media").check();
    });

    it("selects 'friend', and 'publication', then uncheck 'friend'", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });

    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it("alerts on invalid email", () => {
        cy.get("#email")
            .as("email")
            .type("diogo.asjunior-hotmail.com");

        cy.get("#email.invalid").should("exist");

        cy.get("@email")
            .clear()
            .type("diogo.asjunior@hotmail.com");

        cy.get("#email.invalid").should("not.exist");
    });

    it("fills and reset the form", () => {
        const firstName = "Diogo";
        const lastName = "Marques de oliveira";
        const fullName = `${firstName} ${lastName}`;

        cy.get("#first-name").type("Diogo");
        cy.get("#last-name").type("Marques de oliveira");
        cy.get("#email").type("diogo.asjunior@hotmail.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("IPA beer");

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        );

        cy.get("#agree").click();
        cy.get("#signature").type(fullName);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        cy.get("button[type='reset']").click();

        cy.get("@submitButton").should("be.disabled");
    });

    it("fills mandatory fields usuing support command", () => {
        const customer = {
            firstName: "João",
            lastName: "Silva",
            email: "joaosilva@example.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled");
    });
});