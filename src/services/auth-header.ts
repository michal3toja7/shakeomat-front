export default function authHeader() {
    const userStr = localStorage.getItem("authUser");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);

    // if (user && user.access) {
    //     return { Authorization: 'Bearer ' + user.access }; // for Spring Boot back-end
    //     // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    // } else {
    //     return { Authorization: '' }; // for Spring Boot back-end
    //     // return { 'x-access-token': null }; // for Node Express back-end
    // }
    return {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwMjcwMzY2LCJpYXQiOjE2Njk2NjU1NjYsImp0aSI6IjRiNWM1OGY2ZmJiODQ1ZTViNmM2ZDA5YWY3OTQ0ODA5IiwidXNlcl9pZCI6MX0.7l0vDFgbSg6TxjMc2LBgSF-J5QCxreownFOzhfYqwUE"
    }

}