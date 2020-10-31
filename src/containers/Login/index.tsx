import React from "react";
import { Layout, Card } from "antd";
import { LoginFormValues } from "./types";
import { $UserState } from '../../models/User'
import { useStore } from "effector-react";
import { logInFx } from './effects'

import LoginForm from "./Form";
import './styles.css';

const { Content } = Layout;


export default function App() {
  const isLoading = useStore(logInFx.pending)
  const user = useStore($UserState)
  
  const onLogin = (values: LoginFormValues) => {
    logInFx(values);
  }

  if(user)
    return <h1>{user.email}</h1>;

  return (
    <Layout style={{ height: "100vh" }}>
      <Content className="main-content gray-bg">
        <Card style={{ maxWidth: '500px', width: '500px' }}>
          <LoginForm onSubmit={onLogin} isLoading={isLoading}/>
        </Card>
      </Content>
    </Layout>
  );
}
