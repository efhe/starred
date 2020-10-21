import React from "react";
import { Layout, Menu } from "antd";
import "./App.css";
import StarredRepositories from "./containers/StarredRepositories";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const { Header, Content, Footer } = Layout;

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    // https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token
    Authorization: "bearer",
  },
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">Home</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <h1>Starred Repositories</h1>
          <StarredRepositories />
        </Content>
        <Footer style={{ textAlign: "center" }}>@efhe</Footer>
      </Layout>
    </ApolloProvider>
  );
}

export default App;
