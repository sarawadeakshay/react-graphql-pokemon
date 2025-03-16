import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import gql from 'graphql-tag';
export const client = new ApolloClient({
  link: ApolloLink.from([
    new HttpLink({
      uri: 'https://graphql-pokemon2.vercel.app',
    }),
  ]),
  cache: new InMemoryCache({}),
});

// const GET_SCHEMA = gql`
//   {
//   __schema {
//     types {
//       name
//       kind
//       fields {
//         name
//         type {
//           name
//         }
//       }
//     }
//   }
// }
// `;

// client.query({ query: GET_SCHEMA }).then(response => {
//   console.log('SCHEMA: ', response.data);
// });