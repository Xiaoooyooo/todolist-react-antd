import React, { Component } from "react";
import { List, Checkbox } from "antd";

import ToDoListItem from "./children/ToDoListItem";

import "./todolist.scss";

class ToDoList extends Component {
  render() {
    const todos = [...this.props.todos];
    const todosList = todos.map((el) => (
      <ToDoListItem
        key={el[0]}
        id={el[0]}
        item={el[1]}
        UpdateTodosClick={this.props.UpdateTodosClick}
        IsDoneChange={this.props.IsDoneChange}
        deleteFinishedItem={this.props.deleteFinishedItem}
      />
    ));
    return (
      <List
        header={
          <h2 style={{ padding: "0 10px", margin: "0" }}>
            You have {todos.length} things to do.
          </h2>
        }
        footer={
          <p className="list-footer">世上本没有路，走的人多了，也便成了路。</p>
        }
        className={this.props.className}
      >
        {todosList}
      </List>
    );
  }
}

export default ToDoList;
