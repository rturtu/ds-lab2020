// Initialize connection to test database
var sequelize = require("../models").sequelize;
var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../app");
var expect = chai.expect;

process.env.NODE_ENV = "test";
