import React, { Component } from "react";
import {nanoid} from 'nanoid';
import Main from "./Main/Main";

const TODOS = [
  {
    id: nanoid(),
    title: "one",
    date: new Date().toLocaleString(),
    detail:
      "起舞弄清影，何似在人间。起舞弄清影，何似在人间。起舞弄清影，何似在人间。起舞弄清影，何似在人间。起舞弄清影，何似在人间。起舞弄清影，何似在人间。",
    isDone: false,
  },
  {
    id: nanoid(),
    title: "two",
    date: new Date().toLocaleString(),
    detail: "起舞弄清影，何似在人间",
    isDone: false,
  },
  {
    id: nanoid(),
    title: "three",
    date: new Date().toLocaleString(),
    detail: "起舞弄清影，何似在人间",
    isDone: false,
  },
  {
    id: nanoid(),
    title: "four",
    date: new Date().toLocaleString(),
    detail: "起舞弄清影，何似在人间",
    isDone: false,
  },
  {
    id: nanoid(),
    title: "five",
    date: new Date().toLocaleString(),
    detail: "起舞弄清影，何似在人间",
    isDone: false,
  },
];

class App extends Component {
  constructor() {
    super();
    let todos = new Map()
    TODOS.forEach(el => {
      todos.set(el.id, el)
    })
    this.state = {
      todos
    }
    this.handleUpdateTodosClick = this.handleUpdateTodosClick.bind(this);
    this.handleIsDoneChange = this.handleIsDoneChange.bind(this);
    this.handleDeleteFinishedItem = this.handleDeleteFinishedItem.bind(this)
  }
  handleUpdateTodosClick(i) {
    console.log(i);
    // todos[i].detail = detail
  }
  handleIsDoneChange(id) {
    this.setState(state => {
      let item = state.todos.get(id)
      item.isDone = !item.isDone
      return {
        todos: state.todos.set(id, item)
      }
    })
  }
  handleDeleteFinishedItem(id){
    this.setState(state => {
      const current = state.todos
      current.delete(id)
      return {
        todos: current
      }
    })
  }
  render() {
    return (
      <Main
        todos={this.state.todos}
        handleIsDoneChange={this.handleIsDoneChange}
        UpdateTodosClick={this.handleUpdateTodosClick}
        handleDeleteFinishedItem={this.handleDeleteFinishedItem}
      />
    );
  }
}

export default App;
