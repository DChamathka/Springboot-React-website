import React, { useState, useEffect } from 'react'
import { Button, Container, Row,  Card, CardImg, CardText, Form, FormGroup, Label, Input, FormText,CardBody, Modal, ModalBody, CardTitle, CardSubtitle, Col} from 'reactstrap'
import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation'

function Product () {
  const [products, setProducts] = useState([{id:"",pname:"", type:"", price:"",availability:true}])
  const [id, setId] = useState()
  const [pname, setPname] = useState()
  const [type, setType] = useState()
  const [price, setPrice] = useState()
  const [availability, setAvailability] = useState(true)
  const [showModal, setShow] = useState(false)
  const [showEdit, setShowEdit]=useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleCloseE = () => {
    setShowEdit(false)
    setId()
    setPname()
    setType()
    setPrice()
    setAvailability()
  }
  const handleShowE = () => setShowEdit(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/greenagri/addproduct',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          pname: pname,
          type: type,
          price: price,
          availability: availability
        })
      })
      .then((response => response.json()))
      .then((response) => {
        alert('Added Successfully')
        fetch(
        "http://localhost:8080/greenagri/products",
        {
          method: "GET"
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setProducts(json)
          setPname()
          setType()
          setPrice()
          setAvailability(null)
          handleClose(true)
        })
        .catch((error) => {
          console.error(error);
        });
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getData = async (id)=>{
    await fetch(
        `http://localhost:8080/greenagri/products/${id}`,
        {
          method: "GET"
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setId(json.id)
          setPname(json.pname)
          setPrice(json.price)
          setType(json.type)
          setAvailability(json.availability)
        })
        .catch((error)=>{
          console.log(error)
        })
        handleShowE(true)
  }

   const editData = async (e)=>{
    e.preventDefault()
    fetch(`http://localhost:8080/greenagri/editproduct/${id}`,
    {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
        },
       body: JSON.stringify({
          pname: pname,
          type: type,
          price: price,
          availability: availability
       })
    })
       .then(()=>{
         fetch(
        "http://localhost:8080/greenagri/products",
        {
          method: "GET"
        }
      )
      .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setProducts(json)
          setId()
          setPname()
          setType()
          setPrice()
          setAvailability()    
          handleCloseE()     
        })})
        .catch((error) => {
          console.error(error);
     
       })
  }

  const deleteData = async (id)=>{  
     await fetch(
       `http://localhost:8080/greenagri/deleteproducts/${id}`,
        {
          method:"DELETE"
        }
      ) 
     .then(()=>{
       fetch(
        "http://localhost:8080/greenagri/products",
        {
          method: "GET"
        }
      )
      .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setProducts(json)
          alert("Product deleted!")
        })
        .catch((error) => {
          console.error(error);
     })
      })
  }
  
  useEffect(() => {
    const fetchData = async () => {
      fetch(
        "http://localhost:8080/greenagri/products",
        {
          method: "GET"
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setProducts(json)
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchData();
  }, []);

  return (
    <div className='wrapper'>
      <Container className='themed-container' fluid={true}>
        <Row>
          <Col className='ml-auto mr-auto text-left' md='4'>
          <h2 className='title'>Products</h2>
          <h2 className="primary">Reach our market place to buy this products</h2>
          <Button className="bg-info" onClick={()=>{handleShow(true)}}>Add product</Button>
          </Col>
          <Col className='ml-auto mr-auto text-left' xs='auto'>
          <Button className='btn-round' color='primary'>
            Fruits
          </Button>
          <Button className='btn-round' color='primary'>
            Vegetables
          </Button>
          <Button className='btn-round' color='primary'>
            Grains
          </Button>
          <Button className='btn-round' color='primary'>
            AnimalProductFoods
          </Button>
          <Button className='btn-round' color='primary'>
            Other
          </Button>
          </Col>
        </Row>
      </Container>
      <div className='section section-team text-center'>
        <Container>
        <Row>
           {products.map((products,index)=>(
            <Col
      xs={12}
      md={6}
      lg={4}
      key={index}>
    <Card>
      <CardBody>
      <CardTitle tag='h4'>
          {products.pname}
        </CardTitle>
        <CardTitle tag='h5'>
          {'Rs.'}{products.price} {'per 100g'}
        </CardTitle>
        <CardSubtitle tag='h6' className='mb-2 text-muted'>
          {products.type}
        </CardSubtitle>
        <CardText>{(products.availability)?"Available":"Currently Not Available"}</CardText>
        <Button onClick={()=> {getData(products.id);handleShowE(true)}}>Edit</Button>
        <Button className="bg-warning" onClick={()=>deleteData(products.id)}>Delete</Button>
      </CardBody>
    </Card>
    </Col>
          ))}
        </Row>       
      </Container>
      </div>

      <Modal isOpen={showModal}>
      <ModalBody>
        <Form>
          <h3>Add New Product</h3>
          <FormGroup>
            <Label for='pname'>
              Product Name
            </Label>
            <Input
              type='text'
              name='pname'
              id='pname'
              value={pname}
              onChange={e => setPname(e.target.value)}
              />
          </FormGroup>
          <FormGroup>
            <Label for='type'>
              Product Category
            </Label>
            <Input
              type='select'
              value={type}
              name='type'
              id='type'
              onChange={e => setType(e.target.value)}>
            <option>
              --Select--
            </option>
            <option value='Fruit'>
              Fruit
            </option>
            <option value='Vegetable'>
              Vegetable
            </option>
            <option value='Grain'>
              Grain
            </option>
            <option value='AnimalProduct'>
              Animal Product Food
            </option>
            <option value='Other'>
              Other
            </option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for='price'>
              Price
            </Label>
            <Input
              type='text'
              name='price'
              id='price'
              value={price}
              onChange={e => setPrice(e.target.value)} />
          </FormGroup>
          <FormGroup tag='fieldset'>
            <lable>
              Availability
            </lable>
            <div>
              <FormGroup check onChange={e => setAvailability(e.target.value)}>
                <Label check>
                  <Input type='radio' value={true} name='availability' />
                  {' '} Available
                </Label>
                <Label check>
                  <Input type='radio' value={false} name='availability' />
                  {' '} No
                </Label>
              </FormGroup>
            </div>
          </FormGroup>
          <Button onClick={e => handleSubmit(e)}>
            submit
          </Button>
          <Button onClick={()=> setShow(false)}>Cancel</Button>
        </Form>
      </ModalBody>
    </Modal>

  <Modal isOpen={showEdit}>
      <ModalBody>
        <Form>
          <h3>Edit Product</h3>
          <FormGroup>
            <Label for='pname'>
              Product Name
            </Label>
            <Input
              type='text'
              name='pname'
              id='pname'
              value={pname}
              onChange={e => setPname(e.target.value)}
              />
          </FormGroup>
           <FormGroup>
            <Label for='type'>
              Product Category
            </Label>
            <Input
              type='select'
              value={type}
              name='type'
              id='type'
              onChange={e => setType(e.target.value)}>
            <option>
              --Select--
            </option>
            <option value='Fruit'>
              Fruit
            </option>
            <option value='Vegetable'>
              Vegetable
            </option>
            <option value='Grain'>
              Grain
            </option>
            <option value='AnimalProduct'>
              Animal Product Food
            </option>
            <option value='Other'>
              Other
            </option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for='price'>
              Price
            </Label>
            <Input
              type='number'
              name='price'
              id='price'
              value={price}
              onChange={e => setPrice(e.target.value)} 
              />
          </FormGroup>
          <FormGroup tag='fieldset'>
            <lable>
              Availability
            </lable>
            <div>
              <FormGroup check name ="available" checked={availability} onChange={e => setAvailability(e.target.value)} >
                <Label check>
                  <Input type='radio' value={true} name='availability'/>
                  {' '} Available
                </Label>
                <Label check>
                  <Input type='radio' value={false} name='availability' />
                  {' '} No
                </Label>
              </FormGroup>
            </div>
          </FormGroup> 
          <Button onClick={e=>editData(e)}>
            Edit
          </Button>
          <Button onClick={()=> handleCloseE()}>Cancel</Button>
        </Form>
      </ModalBody>
      </Modal>    
    </div>
  )
}

export default Product
