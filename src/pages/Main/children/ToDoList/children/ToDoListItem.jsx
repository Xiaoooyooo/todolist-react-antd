import React, {Component} from 'react';
import { List, Checkbox } from "antd";

import ToDoListItemInfo from "./children/ToDoListItemInfo";
import './todolistitem.scss';

class ToDoListItem extends Component {
  constructor(){
    super()
    this.state = {
      showDetail: false
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }
  handleCheckboxChange(id) {
    this.props.IsDoneChange(id);
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
      return;
    }
    Promise.resolve().then(() => {
      this.timer = setTimeout(() => {
        this.props.deleteFinishedItem(id);
        clearTimeout(this.timer);
      }, 3000);
    });
  }
  render() {
    return (
      <List.Item
        onClick={() => this.props.UpdateTodosClick(this.props.id)}
        key={this.props.item.title}
        className='todolist-item'
      >
      <div className={`bg ${this.props.item.isDone ? 'deleting' : ''}`}></div>
        <Checkbox
          checked={this.props.item.isDone}
          onChange={() => this.handleCheckboxChange(this.props.id)}
          className="checkbox"
        />
        <ToDoListItemInfo title={this.props.item.title} date={this.props.item.date} />
        <p className='detail'>{this.props.item.detail}</p>
      </List.Item>
    )
  }
}
export default ToDoListItem