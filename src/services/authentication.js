function login(username, password) {
    return fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(({ token }) => {
            if (!token) return;
            localStorage.setItem('userToken', token);
            return token;
        })
        .catch((err) => {
            logout();
        });
}

function isLoggedIn() {
    const token = localStorage.getItem('userToken');

    return typeof token === 'string';
}

function logout() {
    localStorage.removeItem('userToken');
    // TODO: call logout method to remove tokens
}

export default {
    login,
    isLoggedIn,
    logout,
};
