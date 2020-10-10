import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';

import client from "./client";
import { ME } from "./graphql"
console.log(ME)

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        Hello
      </div>

      <Query query={ME}>
        {
          ({ loading, error, data }) => {
            if (loading) return 'Loading';
            if (error) return `Error ${error.message}`;

            return <div>{data.user.name}</div>
          }
        }
      </Query>
    </ApolloProvider>
  );
}

export default App;
