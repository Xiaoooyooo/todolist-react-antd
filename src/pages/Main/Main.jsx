import React, { Component } from "react";
import { Layout } from "antd";
const { Header, Content, Footer, Sider } = Layout;

import "./main.scss";

import ToDoList from "./children/ToDoList/ToDoList";

class Main extends Component {
  render() {
    return (
      <Layout style={{ overflow: "auto", height: "100%" }}>
        <Header className="main-header">Welcome Back!</Header>
        <Content className="main-content">
          <ToDoList
            className="main-content-list"
            todos={this.props.todos}
            UpdateTodosClick={this.props.UpdateTodosClick}
            IsDoneChange={this.props.handleIsDoneChange}
            deleteFinishedItem={this.props.handleDeleteFinishedItem}
          />
        </Content>
        <Footer>footer</Footer>
      </Layout>
    );
  }
}
export default Main;
