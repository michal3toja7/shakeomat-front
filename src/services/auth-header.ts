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
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxNTU2NDM1LCJpYXQiOjE2NzA5NTE2MzUsImp0aSI6ImI1NjQxOWY1N2Q3NzQyYmVhOWQ2NTFkYTMzZDAzNTk4IiwidXNlcl9pZCI6MX0.c22d-BfMF9gqmQTZnHJTOcCqIoFBFIJ417BRQiZ_Wk8"
    }

}