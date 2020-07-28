const users = [{ username: 'testuser1', password: '123', email: 'test1@test.com' }];

export const api = async (path, method, bodyObject = {}) => {
    return new Promise((resolve, reject) => {
        if (path === 'auth/verify' && method === 'GET') {
            if (localStorage.getItem('userToken') === 'thisisatoken') {
                resolve({ valid: true });
            } else {
                resolve({ valid: false });
            }
        } else if (path === 'auth/register' && method === 'POST') {
            const { username, password, confirm, email } = bodyObject;
            if (username === 'APIFALLOVER') {
                reject();
            } else if (users.filter((user) => user.username !== username).length) {
                resolve({
                    username,
                    email,
                });
            } else {
                resolve({
                    error: 'REGISTERFAIL',
                });
            }
        } else if (path === 'auth/login' && method === 'POST') {
            const { username, password } = bodyObject;

            if (username === 'APIFALLOVER') {
                reject();
            } else if (users.filter((user) => user.username === username).length) {
                resolve({
                    token: 'testusertoken',
                });
            } else {
                resolve({
                    token: null,
                });
            }
        } else {
            resolve();
        }
    });
};
