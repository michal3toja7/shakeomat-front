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
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwODc2NTcwLCJpYXQiOjE2NzAyNzE3NzAsImp0aSI6IjdlZjZhM2VmYTI2YTRkMzRiODQwZTQxZmUxNjA1MTQxIiwidXNlcl9pZCI6MX0.wzKL7WCoT53-mavsJVaIvn73_VT2098ksoqte4vzRY0"
    }

}