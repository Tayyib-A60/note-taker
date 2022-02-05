import './App.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

import Login from './components/Login';
import NotesList from './components/Notes';
import { useState } from 'react';

const createApolloClient = () => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: process.env.REACT_APP_hasura_db_url,
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            'x-hasura-admin-secret': process.env.REACT_APP_hasura_secret
          },
        },
      },
    }),
    cache: new InMemoryCache(),
  });
};


const App = () => {
  const [signedIn, setLoginStatus] = useState(false);
  const [userUid, setUserUid] = useState('');

  const client = createApolloClient();

  return (
      <ApolloProvider client={client}>
        <div className="center">
          <Login signedIn={signedIn} setLoginStatus={setLoginStatus} setUserUid={setUserUid} />
          {
            signedIn ?
            <NotesList userUid={userUid}/> 
            :
            <div className='flex justify-center py-14'>
              <h1 className='text-teal-200	text-center font-bold text-2xl'>Please sign in to use the app</h1>
            </div>
          }
        </div>
      </ApolloProvider>
  );
}

export default App;
