import React, { Component } from 'react';
import { ApolloProvider, Query } from 'react-apollo';

import client from "./client";
import { ME, SEARCH_REPOSITORIES } from "./graphql"
console.log(ME)

const DEFAULT_STATE = {
  "first": 5,
  "after": null,
  "last": null,
  "before": null,
  "query": "フロントエンドエンジニア"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...DEFAULT_STATE,
      query: event.target.value
    })
  }

  render() {
    const { query, first, last, before, after } = this.state;

    return (
      <ApolloProvider client={client}>
        <form>
          <input value={query} onChange={this.handleChange}/>
        </form>
        <Query
          query={SEARCH_REPOSITORIES}
          variables={{ query, first, last, before, after }}
        >
          {
            ({ loading, error, data }) => {
              if (loading) return 'Loading';
              if (error) return `Error ${error.message}`;

              console.log(data.search);
              const search = data.search;
              const repositoryCount = search.repositoryCount;
              const repositoryUnit = repositoryCount === 1 ? "Repository" : "Repositories"
              return (
                <>
                  <h2>{data.search.repositoryCount} {repositoryUnit}</h2>
                  <ul>
                    {
                      search.edges.map(edge => {
                        const node = edge.node;
                        return (
                          <li key={node.id}>
                            <a
                              href={node.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {node.name}
                            </a>
                          </li>
                        )
                      })
                    }
                  </ul>
                </>
              );
            }
          }
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
