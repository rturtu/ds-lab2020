// The purpose of the file is to specify the order of execution of the unit tests
// Tests are thus executed in the order of the require statements

// Initialization
require("./tests/beforeHooks");

// General routing test
require("./tests/routes");

// Blog tests
require("./tests/blogPost");
require("./tests/blogComment");

// Contest tests
require("./tests/task");
require("./tests/contest");
require("./tests/contestTask");

// Eval tests
require("./tests/submit");
