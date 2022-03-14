import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom'

import { User } from './User';
import { Group } from './Group';
import { Logs } from './Logs';

import './App.css';

const App = () => {

  const Header = styled.header`
    height: 10%;
    color: #fff;
    background: #444;
    flex-grow: 0;
  `;

  const Main = styled.main`
    flex-grow: 1;
  `;

  const Footer = styled.footer`
    height: 5%;
    color: #fff;
    background: #444;
    flex-grow: 0;
  `;

  return (
    <BrowserRouter>
      <div style={{
        'height': '100vh',
        'display': 'flex',
        'flexDirection': 'column',
        'justifyContent': 'space-between',
        'fontFamily': 'Arial, Helvetica, sans-serif' }}>

        <Header>
          <h1>Compara databases!!</h1>
          <nav>
            <Link to="/user">users</Link>
            <Link to="/group">group</Link>
          </nav>
        </Header>

        <Main>
            <Routes>
              <Route path="/" element={<Logs />}/>
              <Route path="/user" element={<User />}/>
              <Route path="/group" element={<Group />}/>
            </Routes>
        </Main>

        <Footer>
          <h2>aaa</h2>
        </Footer>

      </div>
    </BrowserRouter>
  );
}

export default App;
