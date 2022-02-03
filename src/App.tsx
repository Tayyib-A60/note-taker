import './App.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import NotesList from './components/Notes';

const createApolloClient = () => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: "wss://engaged-leopard-75.hasura.app/v1/graphql",
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            'x-hasura-admin-secret': `gBfEDKPcYoc2UENh9jYD4UrRqYHse5ZRMf5JHUAGtGxlLRCoPtflaG9UzrIRFLrI`,
          },
        },
      },
    }),
    cache: new InMemoryCache(),
  });
};

function App() {

  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <NotesList />
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
