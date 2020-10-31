import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import { Layout, Breadcrumb } from 'antd';
import SideMenu from '../../components/SideMenu'
import ClassifierPage from '../../containers/ClassifierPage'
import Dictionary from '../../containers/Dictionary'

const { Content } = Layout;


export default function App() {
  return (
    <Layout
      style={{ height: '100vh' }}
    >
      <SideMenu></SideMenu>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Words</Breadcrumb.Item>
          <Breadcrumb.Item>Classifier</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route path="/dashboard/classifier">
                <ClassifierPage></ClassifierPage>
            </Route>
            <Route path="/dashboard/dictionary">
                <Dictionary></Dictionary>
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}