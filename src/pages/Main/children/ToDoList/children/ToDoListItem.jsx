import React, { Component } from "react";
import { List, Checkbox } from "antd";

import ToDoListItemInfo from "./children/ToDoListItemInfo";
import "./todolistitem.scss";

class ToDoListItem extends Component {
  constructor() {
    super();
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }
  //当点击了完成的checkbox时的事件处理函数
  handleCheckboxChange(id, e) {
    //阻止事件向上冒泡，防止进入详情页
    e.stopPropagation();
    //修改该事项的isDone属性
    this.props.onIsDoneChange(id);
    /* 3秒后删除该条数据 */
    //检查删除定时器是否存在，如果存在就清除定时器
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
      return;
    }
    //3秒后删除该条数据
    this.timer = setTimeout(() => {
      this.props.deleteFinishedItem(id);
      //清空定时器
      this.timer = undefined;
    }, 3000);
  }
  render() {
    return (
      <List.Item
        onClick={() => this.props.viewDetailChange(this.props.item)}
        key={this.props.item.title}
        className="todolist-item"
      >
        <div className={`bg ${this.props.item.isDone ? "deleting" : ""}`}></div>
        <Checkbox
          checked={this.props.item.isDone}
          onClick={(e) => this.handleCheckboxChange(this.props.id, e)}
          className="checkbox"
        />
        <ToDoListItemInfo
          title={this.props.item.title}
          date={this.props.item.date}
        />
        <p className="detail">{this.props.item.detail}</p>
      </List.Item>
    );
  }
}
export default ToDoListItem;
