const models = require('@BudgetManager/app/setup');

module.exports = (app) => {
    const api = app.BudgetManagerAPI.app.api.auth;

    app.route('/')
        .get((req,res) => res.send('Budget Manager API'));

    app.route('/api/vi/auth')
        .post(api.login(models.User));
};