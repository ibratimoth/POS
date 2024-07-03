import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { Table} from "antd";
import axios from "axios";

const CustomerPage = () => {

  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllBills();
    // eslint-disable-next-line
  }, []);

  //get all Items
  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get(
        "http://localhost:8083/api/bills/get-bills"
      );
      setBillsData(data);
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

  //Table
  const columns = [
    { title: "ID", dataIndex: "_id" },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    { title: "Contact", dataIndex: "customerNumber" },
   
  ];
  return (
    <DefaultLayout>
        <h1>Customer</h1>
        <Table columns={columns} dataSource={billsData} />
    </DefaultLayout>
  )
}

export default CustomerPage