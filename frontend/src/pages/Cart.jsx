import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import { useNavigate } from "react-router-dom";
import "./pages.css"
import axios from "axios"

function Cart() {

  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const placeOrder = () => {
    if (!customerName || !address) {
      alert("Please enter your name and address.");
      return;
    }

    const orderData = {
      customer_name: customerName,
      address: address,
      items: cart.map(item => ({
        product_name: item.name,
        price: item.price
      }))
    };

    axios
      .post("http://127.0.0.1:8000/place_order/", orderData)
      .then((response) => {
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        setCart([]);
        setCustomerName("");
        setAddress("");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("Failed to place order. Try again!");
      });
  };

  return (
    <Container className="w-75 border rounded text-light mt-5">
      <Row className='d-flex align-items-center my-5'>
            <Col xs={1} className='headingline'></Col>
            <Col xs={'auto'}>
                <h1>Your Cart</h1>
            </Col>
            <Col xs={7} className='headingline'></Col>
        </Row>
      {cart.length === 0 ? (
        <p className="text-warning">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <Row key={item.id} className="mb-3">
            <Col>
              <h4>{item.name}</h4>
            </Col>
            <Col>
              <p className="text-danger">Price: {item.price} Rs</p>
            </Col>
            <Col>
              <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                Remove
              </Button>
            </Col>
          </Row>
        ))
      )}
      <Row className="my-5">
        <Col>
          {cart.length > 0 && (
            <>
              <h4 className="text-light mt-4">Your total is: <span className="text-danger">{totalPrice} Rs</span></h4>
            </>
          )}
        </Col>
        <Col>
          <Button
            variant="secondary"
            className="mt-3"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </Col>
      </Row>
      <Row>
        <Form>
          <Row>
            <Col>
              <Form.Control type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Name" />
            </Col>
            <Col>
              <Form.Control as="textarea" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
            </Col>
          </Row>
        </Form>
      </Row>
      <Row>
        <Col>
      <Button
        className="mt-5"
        variant="success"
        onClick={placeOrder}
      >
        Place Order
      </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
