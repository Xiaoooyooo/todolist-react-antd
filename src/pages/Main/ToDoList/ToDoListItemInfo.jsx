import React, { Component } from "react";

import "./todolistiteminfo.scss";

class ToDoListItemInfo extends Component {
  render() {
    //各项数据展示时的标题部分
    return (
      <div className="item-info-container">
        <h3 className="item-info-title no-margin">{this.props.title}</h3>
        <p className="item-info-date no-margin">{'最后编辑于'+this.props.date}</p>
      </div>
    );
  }
}

export default ToDoListItemInfo;
