import { useAuth0 } from "react-auth0-spa";
import axios from "axios";

const api = "http://localhost:8000/api/v1";
const { getTokenSilently } = useAuth0();

const token = getTokenSilently();

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const getUser = (username) =>
  axios
    .get(`${api}/users/${username}/`, {
      headers: headers,
    })
    .then((res) => {
      const user = res.data;
      this.setState({ user });
    });

// export const getAll = () =>
//   fetch(`${api}/books`, { headers })
//     .then((res) => res.json())
//     .then((data) => data.books);

// export const update = (book, shelf) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: "PUT",
//     headers: {
//       ...headers,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ shelf }),
//   }).then((res) => res.json());

// export const search = (query) =>
//   fetch(`${api}/search`, {
//     method: "POST",
//     headers: {
//       ...headers,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ query }),
//   })
//     .then((res) => res.json())
//     .then((data) => data.books);
