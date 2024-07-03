import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Row, Col } from "antd";
import ItemList from "../components/ItemList";
import { useDispatch } from "react-redux";

const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("drinks");
  const dispatch = useDispatch();
  const categories = [
    {
      name: "drinks",
      imageUrl:
        "https://th.bing.com/th/id/OIP.1h82Ppz0pURPlDYwE-Kv_gHaFO?w=229&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      name: "rice",
      imageUrl:
        "https://th.bing.com/th/id/OIP.FnzHQEVflMzz4zPj0YLqoAHaE7?w=215&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      name: "noodles",
      imageUrl:
        "https://th.bing.com/th/id/OIP.vFeytGRIasd8dLMA1F0OUgHaFY?w=208&h=152&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];

  //useEffect
  useEffect(() => {
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
      }
    };
    getAllItems();
    // eslint-disable-next-line
  }, []);

  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map((category) => (
          <div key={category.name} className={`d-flex category ${selectedCategory === category.name && 'category-active'}`}
          onClick={() => setSelectedCategory(category.name)}
          >
            <h4>{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="60"
              width="60"
            />
          </div>
        ))}
      </div>
      <Row>
        {itemsData.filter(i => i.category === selectedCategory).map((item) => (
          <Col xs={24} lg={6} md={12} sm={6}>
            <ItemList key={item.id} item={item} />
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;
