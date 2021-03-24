import React, { Component } from "react";
import { nanoid } from "nanoid";
import Main from "./Main/Main";

class App extends Component {
  constructor() {
    super();
    this.state = {
      //选择用map来储存数据
      todos: new Map(),
    };
    this.handleUpdateTodosClick = this.handleUpdateTodosClick.bind(this);
    this.handleIsDoneChange = this.handleIsDoneChange.bind(this);
    this.handleDeleteFinishedItem = this.handleDeleteFinishedItem.bind(this);
    this.handleAddNewItem = this.handleAddNewItem.bind(this);
  }
  componentDidMount() {
    //加载本地储存的数据
    this.init();
  }
  init() {
    //使用localStorage，以json形式存储数据
    let store = window.localStorage.getItem("todos");
    //如果本地有数据则添加到state中
    if (store) {
      store = JSON.parse(store);
      this.setState((state) => {
        let todos = state.todos;
        store.forEach((el) => {
          todos.set(el.id, el);
        });
        return {
          todos,
        };
      });
    }
  }
  store() {
    //由于修改react的state是异步的，使用Promise防止存的数据不是最新的数据
    Promise.resolve().then(() => {
      const todos = this.state.todos;
      let store = [];
      for (let i of todos.values()) {
        store.push(i);
      }
      window.localStorage.setItem("todos", JSON.stringify(store));
    });
  }
  //数据修改处理函数
  handleUpdateTodosClick(id, content) {
    //如果想要修改的数据已经被删除了
    if (!this.state.todos.has(id)) return;
    this.setState((state) => {
      //获取原数据
      let item = state.todos.get(id);
      // 更新数据
      item.detail = content;
      item.date = new Date().toLocaleString();
      return {
        tods: state.todos.set(id, item),
      };
    });
    //修改数据后更新本地数据
    this.store();
  }
  //当点击了某项数据的完成按钮（checkbox）
  handleIsDoneChange(id) {
    //更新对应的isDone属性
    this.setState((state) => {
      let item = state.todos.get(id);
      item.isDone = !item.isDone;
      return {
        todos: state.todos.set(id, item),
      };
    });
  }
  //数据删除处理函数
  handleDeleteFinishedItem(id) {
    this.setState((state) => {
      const current = state.todos;
      current.delete(id);
      return {
        todos: current,
      };
    });
    this.store();
  }
  //将新添加的数据插入到原数据中
  handleAddNewItem(title, content) {
    //生成随机id
    let id = nanoid();
    let item = {
      id,
      date: new Date().toLocaleString(),
      title,
      detail: content,
    };
    //更新state
    this.setState((state) => ({
      todos: state.todos.set(id, item),
    }));
    //更新本地数据
    this.store();
  }
  render() {
    return (
      <div style={{ overflow: "auto", height: "100%" }}>
        <Main
          todos={this.state.todos}
          onIsDoneChange={this.handleIsDoneChange}
          onUpdateTodosClick={this.handleUpdateTodosClick}
          onDeleteFinishedItem={this.handleDeleteFinishedItem}
          onAddNewItem={this.handleAddNewItem}
        />
      </div>
    );
  }
}

export default App;
