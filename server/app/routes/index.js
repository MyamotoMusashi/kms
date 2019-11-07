// routes/index.js
const caseRoutes = require('./case_routes');

module.exports = function(app, db) {
  caseRoutes(app, db);
  // Other route groups could go here, in the future
};