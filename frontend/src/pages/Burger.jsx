import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


function Burger() {

  const[product, setProduct] = useState([]);
  const[cartItem, setCartItem] = useState([])

  useEffect(()=>{
    axios 
      .get('http://127.0.0.1:8000/products/')
      .then((response)=>{
        const filteredBurgers = response.data.filter(item => item.category === "burger");
        setProduct(filteredBurgers);
      })
  }, []);

  const addCart = (item)=>{
    setCartItem((prevCart)=> {
      const updatedCart = [...prevCart,  item]
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      return updatedCart;
    })
  }
  
  return (
    <Container className='text-light'  id='burger'>
        <Row className='d-flex align-items-center'>
            <Col xs={1} className='headingline'></Col>
            <Col xs={'auto'}>
                <h1>Burgers</h1>
            </Col>
            <Col xs={7} className='headingline'></Col>
        </Row>
        {product.map((item)=>(
        <Row key={item.id}>
          <Col>
            <img src={`http://127.0.0.1:8000${item.image}`} className='w-50 h-50 rounded' />
          </Col>
          <Col>
            <h4>{item.name}</h4>
            <p className='text-light-emphasis mt-4'>{item.description}</p>
            <p className='text-danger'>Price: {item.price}Rs</p>
          </Col>
          <Col>
            <Button variant="danger" onClick={() => addCart(item)}>Add to Cart</Button>
          </Col>
        </Row>
        ))}
    </Container>
  )
}

export default Burger