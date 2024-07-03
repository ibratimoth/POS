import React, { useState, useEffect, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { Table, Modal, Button} from "antd";
import { useReactToPrint } from 'react-to-print';
import axios from "axios";

const BillsPage = () => {

    const [billsData, setBillsData] = useState([]);
  const [popupmodal, setPopupmodal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null)
  const dispatch = useDispatch();
  const componentRef = useRef();

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

  // print functions
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  }) 
  //Table
  const columns = [
    { title: "ID", dataIndex: "_id" },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    { title: "Contact", dataIndex: "customerNumber" },
    { title: "Subtotal", dataIndex: "subTotal" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "totalAmount" },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
          style={{cursor: 'pointer'}}
          onClick={() => {
             setSelectedBill(record)
            setPopupmodal(true);
          }}
          />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
        <div className="d-flex justify-content-between">
        <h1>Invoice List</h1>
      </div>
      <Table columns={columns} dataSource={billsData} />
      {popupmodal && (
        <Modal
          title="Invoice Details"
          pagination = {false}
          open={popupmodal}
          onCancel={() => {
            setPopupmodal(false);
          }}
          footer={false}
        >
         <div id = "invoice-POS" ref={componentRef}>
            <center id="top">
              <div className="logo"/>
              <div className="info">
                <h2>Ibratimoth POS</h2>
                <p>Contact : 0746556837 | Dar-es-salaam</p>
              </div>
            </center>
            <div id="mid">
              <div className="mt-2">
                <p>
                  customer Name : <b>{selectedBill.customerName}</b>
                  <br/>
                  Phone No : <b>{selectedBill.customerNumber}</b>
                  <br/>
                  Date : <b>{selectedBill.date.toString().substring(0, 10)}</b>
                  <br/>
                </p>
                <hr style={{margin : "5px"}}/>
              </div>
            </div>
            <div id = "bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2>Item</h2>
                      </td>
                      <td className="Hours">
                        <h2>Qyt</h2>
                      </td>
                      <td className="Rate">
                        <h2>Price</h2>
                      </td>
                      <td className="Rate">
                        <h2>Total</h2>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <>
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.price}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.quantity * item.price}</p>
                          </td>
                        </tr>
                      </>
                    ))}
                    
                    <tr className="tabletitle">
                      <td/>
                      <td/>
                      <td className="Rate">
                        <h2>subTotal</h2>
                      </td>
                      <td className="payment">
                        <h2>${selectedBill.subTotal}</h2>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td/>
                      <td/>
                      <td className="Rate">
                        <h2>tax</h2>
                      </td>
                      <td className="payment">
                        <h2>${selectedBill.tax}</h2>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td/>
                      <td/>
                      <td className="Rate">
                        <h2>Grand Total</h2>
                      </td>
                      <td className="payment">
                        <h2>
                          <b>${selectedBill.totalAmount}</b>
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="legalcopy">
                  <p className="legal">
                      <strong>Thank you for your order !</strong> 10% GST application on total amount. Please note that this is non refundable amount for any assistance please write email <b>help@mydomain.com</b>
                  </p>
              </div>
            </div>
        </div> 
        <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>Print</Button>
        </div>
        </Modal>
      )}
    </DefaultLayout>
  )
}

export default BillsPage