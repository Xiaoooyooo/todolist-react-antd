import React, { Component } from "react";
import { Button } from "antd";
import "./viewdetail.scss";

class ViewDetail extends Component {
  constructor() {
    super();
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleItemDetailUpdate = this.handleItemDetailUpdate.bind(this);
  }
  handleTextChange(e) {
    this.currentText = e.target.value
  }
  handleItemDetailUpdate(id, detail) {
    //判断相比于原数据是否有增加或删除
    let status = detail === this.props.item.detail;
    //传入Main组件，true表示需要更新数据
    this.props.goBack(!status, id, detail);
  }
  render() {
    const currentItem = this.props.item
    this.currentText = this.currentText || currentItem.detail
    return (
      <div className={`${this.props.className} detail-container`}>
        <h3 className="detail-title">{currentItem.title}</h3>
        <p className="detail-date">{currentItem.date}</p>
        <textarea
          className="detail-content"
          defaultValue={currentItem.detail}
          onChange={this.handleTextChange}
        ></textarea>
        <section className="controler">
          <Button
            onClick={() =>
              this.handleItemDetailUpdate(
                currentItem.id,
                this.currentText
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
