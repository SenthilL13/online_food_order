import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./pages.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false); // State for payment options modal
  const [showUPIPayment, setShowUPIPayment] = useState(false); // State for UPI payment modal
  const [upiId, setUpiId] = useState(""); // State to store UPI ID
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

  const handleProceedToPayment = () => {
    if (!customerName || !address) {
      alert("Please enter your name and address.");
      return;
    }
    setShowPaymentOptions(true); // Show payment options modal
  };

  const handleCashOnDelivery = () => {
    alert("Order placed successfully! You will pay via Cash on Delivery.");
    localStorage.removeItem("cart");
    setCart([]);
    setCustomerName("");
    setAddress("");
    setShowPaymentOptions(false); // Close modal
    navigate("/"); // Redirect to home page
  };

  const handleOnlinePayment = () => {
    setShowPaymentOptions(false); // Close payment options modal
    setShowUPIPayment(true); // Show UPI payment modal
  };

  const handleUPIPayment = () => {
    if (!upiId) {
      alert("Please enter your UPI ID.");
      return;
    }

    // Simulate UPI payment process
    const confirmPayment = window.confirm(
      `Confirm UPI payment of ${totalPrice} Rs?\nUPI ID: ${upiId}`
    );

    if (confirmPayment) {
      alert("Payment Successful! Your order has been placed.");
      localStorage.removeItem("cart");
      setCart([]);
      setCustomerName("");
      setAddress("");
      setUpiId("");
      setShowUPIPayment(false); // Close UPI payment modal
      navigate("/"); // Redirect to home page
    } else {
      alert("Payment cancelled.");
    }
  };

  return (
    <Container className="w-75 border rounded text-light mt-5">
      <Row className="d-flex align-items-center my-5">
        <Col xs={1} className="headingline"></Col>
        <Col xs={"auto"}>
          <h1>Your Cart</h1>
        </Col>
        <Col xs={7} className="headingline"></Col>
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
              <h4 className="text-light mt-4">
                Your total is: <span className="text-danger">{totalPrice} Rs</span>
              </h4>
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
              <Form.Control
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Name"
              />
            </Col>
            <Col>
              <Form.Control
                as="textarea"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
            </Col>
          </Row>
        </Form>
      </Row>

      <Row>
        <Col>
          <Button
            className="mt-5"
            variant="success"
            onClick={handleProceedToPayment}
            disabled={cart.length === 0}
          >
            Proceed to Payment
          </Button>
        </Col>
      </Row>

      {/* Payment Options Modal */}
      <Modal show={showPaymentOptions} onHide={() => setShowPaymentOptions(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please select your preferred payment method:</p>
          <Button
            variant="primary"
            className="w-100 mb-3"
            onClick={handleCashOnDelivery}
          >
            Cash on Delivery
          </Button>
          <Button
            variant="success"
            className="w-100"
            onClick={handleOnlinePayment}
          >
            Online Payment (UPI)
          </Button>
        </Modal.Body>
      </Modal>

      {/* UPI Payment Modal */}
      <Modal show={showUPIPayment} onHide={() => setShowUPIPayment(false)}>
        <Modal.Header closeButton>
          <Modal.Title>UPI Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter UPI ID</Form.Label>
              <Form.Control
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g., yourname@upi"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUPIPayment(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUPIPayment}>
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Cart;
