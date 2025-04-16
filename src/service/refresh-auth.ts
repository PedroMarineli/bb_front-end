// import { client, setHeaderToken } from "./client";

// export const fetchNewToken = async () => {
//     try {
//         const token: string = await client
//         .get("http://localhost:8080/user")
//         .then(res => res.data.token);
//         return token;
//     } catch (error) {
//         return null;
//     }
// };

// export const refreshAuth = async (failedRequest: any) => {
//     const newToken = await fetchNewToken();

//     if (newToken) {
//         failedRequest.response.config.headers.Authorization = "Bearer " + newToken;
//         setHeaderToken(newToken);
//         // you can set your token in storage too
//         // setToken({ token: newToken });
//         return Promise.resolve(newToken);
//     } else {
//         // you can redirect to login page here
//         // router.push("/login");
//         return Promise.reject();
//     }
// };