import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import qs from "qs";
import { Layout, Menu } from "antd";
import { Switch, Route, useLocation } from "react-router-dom";
import "./App.css";
import { Loading } from "./components/Loading";
import { Starred } from "./containers/Starred";

const { Header, Content, Footer } = Layout;

function createApolloClient(token: string = "") {
  return new ApolloClient({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `bearer ${token}`,
    },
    cache: new InMemoryCache(),
  });
}

async function getAuthToken(code = "") {
  const response = await fetch(
    "https://efhe-starred.netlify.app/api/access_token",
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ code }),
    }
  );
  return response.json();
}

function App() {
  const location = useLocation();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>(
    createApolloClient()
  );

  useEffect(() => {
    async function init() {
      const token = sessionStorage.getItem("token");

      if (token !== null && token) {
        setClient(createApolloClient(token));
      } else {
        const query = qs.parse(location.search, { ignoreQueryPrefix: true });
        const code = query && query.code;

        if (code) {
          const result = await getAuthToken(code as string);

          if (result && result.access_token) {
            sessionStorage.setItem("token", result.access_token);
            setClient(createApolloClient(result.access_token));
          } else {
            setError("No se han recibido credenciales de acceso de GitHub.");
          }
        } else {
          window.location.assign(
            `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_STARRED_CLIENT_ID}&scope=user`
          );
        }
      }
      setLoading(false);
    }

    init();
  }, [location]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <ApolloProvider client={client}>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[location.pathname]}
          >
            <Menu.Item key="/">Home</Menu.Item>
            {/* <Menu.Item key="/search">Search</Menu.Item> */}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Switch>
            {/* <Route path="/search">
              <Search />
            </Route> */}
            <Route path="/">
              <Starred />
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>@efhe</Footer>
      </Layout>
    </ApolloProvider>
  );
}

export default App;
