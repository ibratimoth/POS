import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table, Modal, Form, Input, Select, message } from "antd";
import axios from "axios";

const ItemPage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [popupmodal, setPopupmodal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  //useEffect
  useEffect(() => {
    getAllItems();
    // eslint-disable-next-line
  }, []);

  //get all Items
  const getAllItems = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get(
        "http://localhost:8083/api/items/get-item"
      );
      setItemsData(data);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: "HIDE_LOADING",
      });
    }
  };

  const handleDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post("http://localhost:8083/api/items/delete-item", {itemId:record._id});
      message.success("Item Deleted Successfully");
      getAllItems();
      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (error) {
      dispatch({
        type: "SHOW_LOADING",
      });
      message.error("Something went Wrong");
      console.log(error);
    }
  }
  //Table
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <DeleteOutlined style={{ cursor: "pointer" }} 
          onClick={() => handleDelete(record)}
          />
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditItem(record);
              setPopupmodal(true);
            }}
          />
        </div>
      ),
    },
  ];

  //handle submit
  const handleSubmit = async (value) => {
    if(editItem == null){
      try {
        console.log(value);
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.post("http://localhost:8083/api/items/add-item", value);
        message.success("Item Added Successfully");
        getAllItems();
        setPopupmodal(false);
        form.resetFields();
        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (error) {
        message.error("Something went Wrong");
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.put("http://localhost:8083/api/items/edit-item", {...value, itemId: editItem._id});
        message.success("Item Updated Successfully");
        getAllItems();
        setPopupmodal(false);
        form.resetFields();
        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (error) {
        message.error("Something went Wrong");
        console.log(error);
      }
    }
    
  };
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item Page</h1>
        <Button type="primary" onClick={() => setPopupmodal(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} />
      {popupmodal && (
        <Modal
          title={`${editItem !== null ? "Edit Item" : "Add New Item"}`}
          open={popupmodal}
          onCancel={() => {
            setEditItem(null);
            setPopupmodal(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
            form={form}
          >
            <Form.Item name="name" label="Name">
              <Input placeholder="Name"/>
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input placeholder="Price"/>
            </Form.Item>
            <Form.Item name="image" label="Image Url">
              <Input placeholder="image link"/>
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select  placeholder="Category">
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="rice">Rice</Select.Option>
                <Select.Option value="noodles">Noodles</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default ItemPage;
