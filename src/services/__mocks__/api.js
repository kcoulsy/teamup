export const testUsers = [
    { username: 'testuser1', password: '123', email: 'test1@test.com', token: 'testuser1token' },
    { username: 'testuser2', password: '123', email: 'test2@test.com', token: 'testuser2token' },
];

export const api = async (path, method, bodyObject = {}) => {
    return new Promise((resolve, reject) => {
        switch (method) {
            case 'GET':
                switch (path) {
                    case 'auth/verify':
                        const userToken = localStorage.getItem('userToken');
                        if (testUsers.filter((user) => user.token === userToken).length) {
                            resolve({ valid: true });
                        } else {
                            resolve({ valid: false });
                        }
                        break;
                    default:
                        reject();
                        break;
                }
                break;
            case 'POST':
                switch (path) {
                    case 'auth/register':
                        // passing APIFALLOVER will cause the catch block to be checked
                        if (bodyObject.username === 'APIFALLOVER') {
                            reject();
                        } else if (!testUsers.filter((user) => user.username === bodyObject.username).length) {
                            resolve({
                                username: bodyObject.username,
                                email: bodyObject.email,
                            });
                        } else {
                            resolve({
                                error: 'REGISTERFAIL',
                            });
                        }
                        break;
                    case 'auth/login':
                        // passing APIFALLOVER will cause the catch block to be checked
                        if (bodyObject.username === 'APIFALLOVER') {
                            reject();
                        } else if (testUsers.filter((user) => user.username === bodyObject.username).length) {
                            resolve({
                                token: testUsers[0].token,
                            });
                        } else {
                            resolve({
                                token: null,
                            });
                        }
                        break;
                    default:
                        reject();
                        break;
                }
                break;
            default:
                reject();
                break;
        }
    });
};
