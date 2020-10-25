const app = require("../app");
const server = require("../bin/www");
const assert = require("assert");
const request = require("supertest");
var users = global.users;

describe("Caregiver assign", () => {
    describe("POST Assign patients to caregiver1", () => {
        it("should assign patient1 to caregiver1", () => {
            return request(app)
                .post("/doctor/caregiver/patients")
                .set({ token: users.admins[0] })
                .send({
                    patientId: 1,
                    caregiverId: 1,
                })
                .expect(200);
        });
        it("should assign patient2 to caregiver1", () => {
            return request(app)
                .post("/doctor/caregiver/patients")
                .set({ token: users.admins[0] })
                .send({
                    patientId: 2,
                    caregiverId: 1,
                })
                .expect(200);
        });
    });

    describe("DELETE patient2 from caregiver1", () => {
        it("should assign patient2 to caregiver1", () => {
            return request(app)
                .delete("/doctor/caregiver/patients")
                .set({ token: users.admins[0] })
                .send({
                    patientId: 2,
                    caregiverId: 1,
                })
                .expect(200);
        });
    });
});
