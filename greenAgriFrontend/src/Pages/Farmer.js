import React, { useState, useEffect } from 'react'
import { Table, Button, Container, Row,   Form, FormGroup, Label, Input, FormText,CardBody, Modal, ModalBody, CardTitle, CardSubtitle, Col} from 'reactstrap'

function Farmer () {
  const [farmer, setFarmer] = useState([])
  const [id, setId] =useState()
  const [fname,setFname]=useState()
  const [lname,setLname]=useState()
  const [email,setEmail]=useState()
  const [phone,setPhone]=useState()
  const [crop,setCrop]=useState()
  const [showModal, setShow] = useState(false)
  const [showEdit, setShowEdit]=useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleCloseE = () => {
          setShowEdit(false)
          setFname()
          setLname()
          setEmail()
          setPhone()
          setCrop()
  }
  const handleShowE = () => setShowEdit(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/greenagri/addfarmer',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          firstName:fname,
          lastName:lname,
          email:email,
          phone:phone,
          crop:crop
        })
      })
      .then((response => response.json()))
      .then((response) => {
        alert('Added Successfully')
        fetch(
        "http://localhost:8080/greenagri/farmers",
        {
          method: "GET"
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setFarmer(json)
          setFname()
          setLname()
          setEmail()
          setPhone()
          setCrop()
          handleClose()
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
        `http://localhost:8080/greenagri/farmers/${id}`,
        {
          method: "GET"
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setId(json.id)
          setFname(json.firstName)
          setLname(json.lastName)
          setEmail(json.email)
          setPhone(json.phone)
          setCrop(json.crop)
        })
        .catch((error)=>{
          console.log(error)
        })
        handleShowE(true)
  }

  const editData = async (e)=>{
    e.preventDefault()
    fetch(`http://localhost:8080/greenagri/farmers/${id}`,
    {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
        },
       body: JSON.stringify({
          firstName:fname,
          lastName:lname,
          email:email,
          phone:phone,
          crop:crop
       })
    })
       .then(()=>{
         fetch(
        "http://localhost:8080/greenagri/farmers",
        {
          method: "GET"
        }
      )
      .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setFarmer(json)    
          handleCloseE()     
        })})
        .catch((error) => {
          console.error(error);
     
       })
  }

   const deleteData = async (id)=>{
     await fetch(
       `http://localhost:8080/greenagri/farmers/${id}`,
        {
          method:"DELETE"
        }
      ) 
     .then(()=>{
       alert("Farmer's details deleted!")  
      fetch(
        "http://localhost:8080/greenagri/farmers",
        {
          method: "GET"
        }
      )
      .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setFarmer(json)         
        })})
        .catch((error) => {
          console.error(error);
     })
     
  }

  useEffect(() => {
    const fetchData = async () => {
      fetch(
        "http://localhost:8080/greenagri/farmers",
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setFarmer(json)
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, []);

  return (
    <div className='wrapper'>
      <Container className='themed-container' fluid={true}>
        <h2 className='title'>Our Farmers</h2>
         <Button className="bg-info" onClick={()=>{handleShow(true)}}>Add New Farmer</Button>
      </Container>
      <div className='section section-team text-left'>
        <Container>
          <Table striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Telephone No</th> 
          <th>Product</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {farmer.map((farmers, index) => (
        <tr key={index}>
          <td scope="row">{farmers.firstName}{" "}{farmers.lastName}</td>
          <td>{farmers.email}</td>
          <td>{farmers.phone}</td>
          <td>{farmers.crop}</td>
          <td>
            <Button onClick={()=>getData(farmers.id)}>Edit</Button>
        <Button className="bg-warning" onClick={()=>deleteData(farmers.id)}>Delete</Button>
          </td>
        </tr>
       ))}
      </tbody>
    </Table>   
        </Container>
      </div>
        <Modal isOpen={showModal}>
          <ModalBody>
            <Form>
            <Row>
              <Col md={6}>
              <FormGroup>
            <Label for='fname'>
              First Name
            </Label>
            <Input
              type='text'
              name='fname'
              id='fname'
              value={fname}
              onChange={e => setFname(e.target.value)}
               />
          </FormGroup>
              </Col>
              <Col md={6}> 
              <FormGroup>
            <Label for='lname'>
              Last Name
            </Label>
            <Input
              type='text'
              name='lname'
              id='lname'
              value={lname}
              onChange={e => setLname(e.target.value)}
               />
          </FormGroup>
              </Col>
            </Row>        
          <FormGroup>
            <Label for='email'>
              Email
            </Label>
            <Input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
               />
          </FormGroup>
          <FormGroup>
            <Label for='phone'>
              Phone No
            </Label>
            <Input
              type='text'
              name='phone'
              id='phone'
              value={phone}
              onChange={e => setPhone(e.target.value)}
               />
          </FormGroup>
          <FormGroup>
            <Label for='pname'>
              Crop
            </Label>
            <Input
              type='text'
              name='crop'
              id='crop'
              value={crop}
              onChange={e => setCrop(e.target.value)}
               />
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
            <Row>
              <Col md={6}>
              <FormGroup>
            <Label for='fname'>
              First Name
            </Label>
            <Input
              type='text'
              name='fname'
              id='fname'
              value={fname}
              onChange={e => setFname(e.target.value)}
             />
          </FormGroup>
              </Col>
              <Col md={6}> 
              <FormGroup>
            <Label for='lname'>
              Last Name
            </Label>
            <Input
              type='text'
              name='lname'
              id='lname'
              value={lname}
              onChange={e => setLname(e.target.value)}
               />
          </FormGroup>
              </Col>
            </Row>        
          <FormGroup>
            <Label for='email'>
              Email
            </Label>
            <Input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
               />
          </FormGroup>
          <FormGroup>
            <Label for='phone'>
              Phone No
            </Label>
            <Input
              type='text'
              name='phone'
              id='phone'
              value={phone}
              onChange={e => setPhone(e.target.value)}
               />
          </FormGroup>
          <FormGroup>
            <Label for='pname'>
              Crop
            </Label>
            <Input
              type='text'
              name='crop'
              id='crop'
              value={crop}
              onChange={e => setCrop(e.target.value)}
               />
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
export default Farmer