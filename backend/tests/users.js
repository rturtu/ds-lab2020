const app = require("../app");
const server = require("../bin/www");
const assert = require("assert");
const request = require("supertest");
var users = (global.users = {});

before((done) => {
    server.on("serverStarted", () => {
        done();
    });
});

describe("Users", () => {
    describe("POST Create doctor", () => {
        it("should create doctor", () => {
            return request(app)
                .post("/doctor/signup")
                .send({
                    username: "doctor1",
                    password: "doctor1",
                })
                .expect(200)
                .then((response) => {
                    users.admins = [response.body.token];
                });
        });
    });

    describe("POST Create patient", () => {
        it("should create patient1", () => {
            return request(app)
                .post("/patient")
                .send({
                    username: "patient1",
                    password: "patient1",
                    address: "patient1 home",
                    birthDate: "2020-10-06",
                    gender: 1,
                    name: "Patient 1",
                })
                .expect(200)
                .then((response) => {
                    users.patients = [response.body.token];
                });
        });
        it("should create patient2", () => {
            return request(app)
                .post("/patient")
                .send({
                    username: "patient2",
                    password: "patient2",
                    address: "patient1 home",
                    birthDate: "2020-10-06",
                    gender: 2,
                    name: "Patient 2",
                })
                .expect(200)
                .then((response) => {
                    users.patients = [...users.patients, response.body.token];
                });
        });
    });

    describe("POST Create caregiver", () => {
        it("should create caregiver", () => {
            return request(app)
                .post("/caregiver")
                .send({
                    username: "caregiver1",
                    password: "caregiver1",
                    address: "caregiver1 home",
                    birthDate: "2020-10-06",
                    gender: 1,
                    name: "Caregiver 1",
                })
                .expect(200)
                .then((response) => {
                    users.caregivers = [response.body.token];
                });
        });
    });
});
