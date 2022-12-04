export default function authHeader() {
    const userStr = localStorage.getItem("authUser");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);

    if (user && user.access) {
        return { Authorization: 'Bearer ' + user.access }; // for Spring Boot back-end
        // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
        return { Authorization: '' }; // for Spring Boot back-end
        // return { 'x-access-token': null }; // for Node Express back-end
    }
}