import React, {useEffect} from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "antd";
import Marquee from "react-fast-marquee";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { message } from "antd";

const Register = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm();

  //Function to submit values
  const handleSubmit = async(value) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post("http://localhost:8083/api/users/register", value);
      message.success("user registered Successfully");
      navigate('/login')
      form.resetFields();
      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (error) {
      message.error("Something went Wrong");
      console.log(error);
    }
  };

  //currently login user
  useEffect(() => {
    if(localStorage.getItem('auth')){
      localStorage.getItem('auth')
      navigate("/")
    }
  },[navigate])


  return (
    <section className="vh-100 bg-image" style={{ backgroundImage: `url('https://img.freepik.com/free-photo/shopping-cart-full-products-inside-supermarket_123827-28165.jpg?t=st=1719232375~exp=1719235975~hmac=49b2b83c85342225e01b7c10220fa44e7df401ef643800305e729ae6e3d297d3&w=1060')` }}>
      <div className="container-fluid h-100">
        <Alert
          banner
          message={
            <Marquee pauseOnHover gradient={false}>
              Enhance sales efficiency with our intuitive POS app. Streamline operations and ensure secure transactions.
            </Marquee>
          }
        />
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-4">
            <img
              src=""
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <div className="register-form">
              <h1>POS App</h1>
              <h3 className="text-center text-white">Register Here</h3>
              <Form layout="vertical" onFinish={handleSubmit} form={form}>
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input your username!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="userId" label="User ID" rules={[{ required: true, message: 'Please input your ID!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
                </Form.Item>
                <div className="d-flex justify-content-between">
                  <p className="text-white fw-bold">
                    Already Registered Please
                    <Link to="/login">Login Here !</Link>
                  </p>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-info">
        {/* Copyright */}
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2024. All rights reserved.
        </div>
        {/* Copyright */}
        {/* Right */}
        <div>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-twitter" />
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-google" />
          </a>
          <a href="#!" className="text-white">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        {/* Right */}
      </div>
    </section>
  );
};

export default Register;

// eslint-disable-next-line

{
  /* <h1>POS App</h1>
        <h3>Register Page</h3>
        <Form
            layout="vertical"
            onFinish={handleSubmit}
            form={form}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type='password' />
            </Form.Item>
            <div className="d-flex justify-content-between">
            <p>
                Already Registered Please
                <Link to='/login'>Login Here !</Link>
            </p>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </div>
          </Form>
        </div> */
}
