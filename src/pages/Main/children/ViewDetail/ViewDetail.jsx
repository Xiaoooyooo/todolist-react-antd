import React, { Component } from "react";
import { Button } from "antd";
import "./viewdetail.scss";

class ViewDetail extends Component {
  constructor() {
    super();
    this.state = {
      //保存正在编辑的内容
      currentText: "",
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleItemDetailUpdate = this.handleItemDetailUpdate.bind(this);
  }
  componentDidMount() {
    //初始化正在编辑的内容
    this.setState((state, props) => ({
      currentText: props.item.detail,
    }));
  }
  handleTextChange(e) {
    //受控组件数据刷新
    this.setState({
      currentText: e.target.value,
    });
  }
  handleItemDetailUpdate(id, content) {
    //判断相比于原数据是否有增加或删除
    let status = content === this.props.item.detail;
    //传入Main组件，true表示需要更新数据
    this.props.goBack(!status, id, content);
  }
  render() {
    return (
      <div className={`${this.props.className} detail-container`}>
        <h3 className="detail-title">{this.props.item.title}</h3>
        <p className="detail-date">{this.props.item.date}</p>
        <textarea
          className="detail-content"
          value={this.state.currentText}
          onChange={this.handleTextChange}
        ></textarea>
        <section className="controler">
          <Button
            onClick={() =>
              this.handleItemDetailUpdate(
                this.props.item.id,
                this.state.currentText
              )
            }
          >
            Confirm
          </Button>
        </section>
      </div>
    );
  }
}

export default ViewDetail;
