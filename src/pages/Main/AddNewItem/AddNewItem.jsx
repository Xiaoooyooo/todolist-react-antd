import React, { Component } from "react";
import { Input, Button } from "antd";
import "./addnewitem.scss";

class EditTable extends Component {
  constructor() {
    super();
    this.state = {
      //保存当前编辑的内容
      title: "",
      content: "",
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this)
  }
  handleTitleChange(e) {
    //受控组件input
    this.setState({
      title: e.target.value,
    });
  }
  handleContentChange(e) {
    //受控组件textarea
    this.setState({
      content: e.target.value,
    });
  }
  //点击了confirm按钮后的事件处理函数
  handleConfirmClick() {
    //如果标题为空则不做处理
    if(this.state.title === '') return
    //将添加的数据传递到App组件中
    this.props.onAddNewItem(this.state.title, this.state.content)
    //清空状态
    this.setState({
      title: '',
      content: ''
    })
    //关闭添加数据组件（修改isAddNew以隐藏该组件）
    this.props.changeAddNew()
  }
  render() {
    return (
      <div className={`${this.props.className} insert-table-container`}>
        <label htmlFor="" style={{ width: "100%" }}>
          <Input
            maxLength='20'
            value={this.state.title}
            onChange={this.handleTitleChange}
            style={{ width: "100%" }}
            addonBefore={<h3 style={{ margin: "0" }}>Title:</h3>}
          />
        </label>
        <label style={{ width: "100%", height: "20em" }} htmlFor="">
          <Input.TextArea
            value={this.state.content}
            onChange={this.handleContentChange}
            style={{ width: "100%", height: "100%", resize: "none" }}
          />
        </label>
        <Button
          onClick={this.handleConfirmClick}
          className="btn-add-new-confirm"
          type="primary"
        >
          Confirm
        </Button>
      </div>
    );
  }
}

export default EditTable;
