import React, { Component } from "react";
import { Layout, Button } from "antd";
const { Header, Content, Footer } = Layout;

import "./main.scss";

import ToDoList from "./ToDoList/ToDoList";
import ViewDetail from "./ViewDetail/ViewDetail";
import AddNewItemTable from "./AddNewItem/AddNewItem";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      //是否查看详细信息
      isViewDetail: false,
      //是否添加新项目（是否显示添加新项目的组件）
      isAddNew: false,
      //当前正在查看的item
      viewItem: null,
    };
    this.handleViewDetailChange = this.handleViewDetailChange.bind(this);
    this.updateDetail = this.updateDetail.bind(this);
    this.changeAddNew = this.changeAddNew.bind(this);
    this.handleAddNewChange = this.handleAddNewChange.bind(this);
  }
  //修改isAddNew之前可能的额外操作
  handleAddNewChange() {
    //如果当前在查看详情页，则关闭查看详情页
    this.state.isViewDetail && this.changeViewDetail();
    this.changeAddNew();
  }
  //修改isAddNew
  changeAddNew() {
    let isAddNew = !this.state.isAddNew;
    this.setState({
      isAddNew,
    });
  }
  //项目编辑完成后的处理函数
  updateDetail(status, id, value) {
    //status用于判断相比于原数据是否有改动
    //如果有改动，传递到APP组件中修改数据
    status && this.props.onUpdateTodosClick(id, value);
    this.changeViewDetail();
  }
  //点击了某项数据后的事件处理函数，进入到查看详情页
  handleViewDetailChange(item) {
    // 保存当前想要查看的项目信息
    this.setState({
      viewItem: item,
    });
    //异步修改isViewDetail
    Promise.resolve().then(() => {
      this.changeViewDetail();
    });
  }
  //修改是否查看项目详细信息变量的函数
  changeViewDetail() {
    //记下当前状态
    let isViewDetail = !this.state.isViewDetail;
    this.setState({
      isViewDetail: isViewDetail,
    });
    //如果当前没有查看详情，则移除详情页
    !isViewDetail &&
      setTimeout(() => {
        this.setState({
          viewItem: null,
        });
      }, 500);
  }
  render() {
    //新添加项目组件
    let left = (
      <AddNewItemTable
        changeAddNew={this.changeAddNew}
        onAddNewItem={this.props.onAddNewItem}
        className="main-content-container-left"
      />
    );
    //主界面
    let center = (
      <ToDoList
        todos={this.props.todos}
        onIsDoneChange={this.props.onIsDoneChange}
        deleteFinishedItem={this.props.onDeleteFinishedItem}
        viewDetailChange={this.handleViewDetailChange}
      />
    );
    //查看详情/编辑
    let right = this.state.viewItem && (
      <ViewDetail
        className="main-content-container-right"
        goBack={this.updateDetail}
        item={this.state.viewItem}
      />
    );
    return (
      <Layout style={{ overflow: "auto", height: "100%" }}>
        <Header className="main-header">~ Welcome ~</Header>
        <Content className="main-content">
          <div className="main-content-container">
            <div
              style={{
                width: "100%",
                display: "flex",
                transition: "transform .5s ease",
              }}
              className={`${
                this.state.isViewDetail ? "main-content-view-detail" : ""
              } ${this.state.isAddNew ? "main-content-add-new" : ""}`}
            >
              {left}
              {center}
              {right}
            </div>
          </div>
        </Content>
        <Footer style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={this.handleAddNewChange}
            className="btn-add-new"
            size="large"
            type="primary"
          >
            {this.state.isAddNew ? "BACK" : "ADD NEW"}
          </Button>
        </Footer>
      </Layout>
    );
  }
}
export default Main;
