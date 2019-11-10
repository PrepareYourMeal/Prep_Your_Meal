export function setupTest() {
    let users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User', role: 'Admin' }];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                //auth
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    //get params
                    let params = JSON.parse(opts.body);

                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: "Admin",
                            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDb2RlcnRoZW1lIiwiaWF0IjoxNTU1NjgyNTc1LCJleHAiOjE1ODcyMTg1NzUsImF1ZCI6ImNvZGVydGhlbWVzLmNvbSIsInN1YiI6InRlc3QiLCJmaXJzdG5hbWUiOiJIeXBlciIsImxhc3RuYW1lIjoiVGVzdCIsIkVtYWlsIjoidGVzdEBoeXBlci5jb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4ifQ.8qHJDbs5nw4FBTr3F8Xc1NJYOMSJmGnRma7pji0YwB4'
                        };
                        resolve({ ok: true, json: () => responseJson });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }
                    return;
                }

                // register
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    let params = JSON.parse(opts.body);

                    // add new users
                    let { firstName, lastName } = params.fullname.split(" ");
                    let newUser = { id: users.length + 1, username: firstName, password: params.password, firstName: firstName, lastName: lastName, role: 'Admin' }
                    users.push({ newUser })

                    let responseJson = {
                        id: newUser.id,
                        username: newUser.username,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        role: newUser.role,
                        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDb2RlcnRoZW1lIiwiaWF0IjoxNTU1NjgyNTc1LCJleHAiOjE1ODcyMTg1NzUsImF1ZCI6ImNvZGVydGhlbWVzLmNvbSIsInN1YiI6InRlc3QiLCJmaXJzdG5hbWUiOiJIeXBlciIsImxhc3RuYW1lIjoiVGVzdCIsIkVtYWlsIjoidGVzdEBoeXBlci5jb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4ifQ.8qHJDbs5nw4FBTr3F8Xc1NJYOMSJmGnRma7pji0YwB4'
                    };
                    resolve({ ok: true, json: () => responseJson });
                    return;
                }

                // forget password
                if (url.endsWith('/users/password-reset') && opts.method === 'POST') {
                    let params = JSON.parse(opts.body);

                    //find user
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username;
                    });

                    if (filteredUsers.length) {
                        let responseJson = {
                            message: "We've sent you a link to reset password to your registered email."
                        };
                        resolve({ ok: true, json: () => responseJson });
                    } else {
                        //errrr
                        reject('Sorry, we could not find any registered user with entered username');
                    }
                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (opts.headers && opts.headers.Authorization === 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDb2RlcnRoZW1lIiwiaWF0IjoxNTU1NjgyNTc1LCJleHAiOjE1ODcyMTg1NzUsImF1ZCI6ImNvZGVydGhlbWVzLmNvbSIsInN1YiI6InRlc3QiLCJmaXJzdG5hbWUiOiJIeXBlciIsImxhc3RuYW1lIjoiVGVzdCIsIkVtYWlsIjoidGVzdEBoeXBlci5jb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4ifQ.8qHJDbs5nw4FBTr3F8Xc1NJYOMSJmGnRma7pji0YwB4') {
                        resolve({ ok: true, json: () => users });
                    } else {
                        reject('Unauthorized');
                    }

                    return;
                }
            
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}