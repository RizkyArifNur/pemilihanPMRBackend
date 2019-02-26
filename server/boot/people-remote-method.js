module.exports = function (app) {
    const People = app.models.People
    const AccessToken = app.models.AccessToken
    People.checkLogin = (accessToken, cb) => {
        console.log(accessToken)
        AccessToken.resolve(accessToken, (err, token) => {
            if (err) {
                cb(err)
            } else if (token) {

                cb(null, { alive: true })
            } else {
                cb(null, { alive: false })
            }
        });
    };

    People.remoteMethod(
        'checkLogin', {
            accepts: {
                arg: 'accessToken',
                type: 'string'
            },
            returns: {
                root: true,
                arg: 'status',
                type: 'object'
            },
            http: { verb: 'post' }
        }
    )
}