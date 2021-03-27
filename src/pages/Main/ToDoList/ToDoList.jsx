import React, { Component } from "react";
import { List } from "antd";

import ToDoListItem from "./ToDoListItem";

import "./todolist.scss";

class ToDoList extends Component {
  render() {
    //对App组件传来的数据做一些处理
    const todos = [...this.props.todos];
    let renderRes;
    //如果长度为0，则提示用户“做点什么”
    if (todos.length === 0) {
      renderRes = (
        <li
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            listStyle: 'none'
          }}
        >这里什么都没有了，快做点什么吧！</li>
      );
    } else {
      //长度不为0则按数据渲染
      renderRes = todos.map((el) => (
        <ToDoListItem
          key={el[0]}
          id={el[0]}
          item={el[1]}
          onIsDoneChange={this.props.onIsDoneChange}
          deleteFinishedItem={this.props.deleteFinishedItem}
          viewDetailChange={this.props.viewDetailChange}
        />
      ));
    }
    return (
      <List
        className="list-container"
        style={{ height: "100%", width: "100%", flex: "0 0 500px" }}
        header={
          <h2 style={{ padding: "0 10px", margin: "0" }}>
            You have {todos.length} things to do.
          </h2>
        }
        footer={
          <p className="list-footer">世上本没有路，走的人多了，也便成了路。</p>
        }
      >
        <ul
          style={{
            padding: "0",
            margin: "0",
            width: "100%",
            height: '100%',
            position: "relative",
          }}
        >
          {renderRes}
        </ul>
      </List>
    );
  }
}

export default ToDoList;
