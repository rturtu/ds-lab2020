const app = require("../app");
const server = require("../bin/www");
const assert = require("assert");
const request = require("supertest");
var users = global.users;

describe("User medication", () => {
    describe("POST Create medication", () => {
        it("should create admin medication 1", () => {
            return request(app)
                .post("/doctor/medication")
                .set({ token: users.admins[0] })
                .send({
                    patientId: 1,
                    dosage: "1g / day",
                    name: "sugar",
                    sideEffects: "energy",
                })
                .expect(200);
        });
    });
    describe("DELETE medication", () => {
        it("should delete admin medication 1", () => {
            return request(app)
                .delete("/doctor/medication/1")
                .set({ token: users.admins[0] })
                .send({
                    patientId: 1,
                })
                .expect(200);
        });
    });
});
