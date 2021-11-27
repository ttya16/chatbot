import React from 'react';
import './App.css';

import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd'


import { Navbar, Homepage, ChatWindow, TopBar } from './components';

const { Header, Footer, Sider, Content } = Layout;

// let socket = new WebSocket(`${endPoint}`);

const App = () => {
  // endpoint
  let endPoint = "ws://localhost:5000/ws";
  const chatbotProps = {
    socket: new WebSocket(`${endPoint}`)
  }

  return (
    <div className="app">
        <Layout style={{ minHeight: '100vh' }}>
          <Sider width={320}>
            <div className="navbar">
              <Navbar />
            </div>
          </Sider>
          <Layout className="main">            
            <Content style={{ margin: '0 16px', position: 'relative' }}>
              <div className="routes">
                <Switch>
                  <Route exact path="/">
                    <Homepage />
                  </Route>
                </Switch>
              </div>
              <ChatWindow {...chatbotProps} />
            </Content>
            <Footer>
              <div className="footer">
                <Typography.Title level={5} style={{ color: 'white'}}>
                  ttya16's Tech Gar(b)age <br />
                  All rights reserved
                </Typography.Title>
                <Space>
                  <Link to="/">Home</Link>
                  <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Space>
              </div>
            </Footer>
          </Layout>

        </Layout>

      
        {/* <TopBar /> */}

    </div>
  )
}

export default App;
