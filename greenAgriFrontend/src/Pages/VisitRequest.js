import React, { useState, useEffect } from 'react'
import { Button, Table, Container, Row,  Card, CardImg, CardText, Form, FormGroup, Label, Input, FormText,CardBody, Modal, ModalBody, CardTitle, CardSubtitle, Col} from 'reactstrap'
import DateTimePicker from 'react-datetime-picker'

function VisitRequest () {
  const [visitRequest, setVisitRequest] = useState([{id:"",reqName:"", institute:"",count:"",contact:"",reqDate:"", reqOn:""}])
  const [id, setId] = useState()
  const [reqName, setReqName] = useState()
  const [institute, setinstitute] = useState()
  const [count, setcount] = useState()
  const [contact, setcontact] = useState()
  const [reqDate, setreqDate] = useState()
  const [reqOn, setreqOn] = useState()

  const [showModal, setShow] = useState(false)
  const [showEdit, setShowEdit]=useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
    const handleCloseE = () => {
    setShowEdit(false)
    setId()
    setReqName()
    setinstitute()
    setcontact()
    setcount()
    setreqDate()
  }
  const handleShowE = () => setShowEdit(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/greenagri/request',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          requester: reqName,
          institute:institute,
          contactNo: contact,
          noOfVisitors:count,
          requestDate:reqDate
        })
      })
      .then((response => response.json()))
      .then((response) => {
        alert('Added Successfully')
        fetch(
        "http://localhost:8080/greenagri/visitingrequests",
        {
          method: "GET"
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setVisitRequest(json)
          setReqName()
          setinstitute()
          setcontact()
          setcount()
          setreqDate()
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
  
  const deleteData = async (id)=>{
     await fetch(
       `http://localhost:8080/greenagri/visitingrequest/${id}`,
        {
          method:"DELETE"
        }
      ) 
      .then(()=>{
        alert("Delete Request Successfully")
      })
      const fetchData = async () => {
      fetch(
        "http://localhost:8080/greenagri/visitingrequests",
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setVisitRequest(json)
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }

   const getData = async (id)=>{
    await fetch(
        `http://localhost:8080/greenagri/visitingrequests/${id}`,
        {
          method: "GET"
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setId(json.id)
          setReqName(json.requester)
          setinstitute(json.institute)
          setcontact(json.contactNo)
          setcount(json.noOfVisitors)
          setreqDate(json.requestDate)
        })
        .catch((error)=>{
          console.log(error)
        })
        handleShowE(true)
  }

   const editData = async (e)=>{
    e.preventDefault()
    fetch(`http://localhost:8080/greenagri/request/${id}`,
    {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
        },
       body: JSON.stringify({
          requester: reqName,
          institute:institute,
          contactNo: contact,
          noOfVisitors:count,
          requestDate:reqDate
       })
    })
       .then(()=>{
         fetch(
        "http://localhost:8080/greenagri/visitingrequests",
        {
          method: "GET"
        }
      )
      .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setVisitRequest(json)    
          handleCloseE()     
        })})
        .catch((error) => {
          console.error(error);
     
       })
  }

  useEffect(() => {
    const fetchData = async () => {
      fetch(
        "http://localhost:8080/greenagri/visitingrequests",
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setVisitRequest(json)
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, []);

  return (
      <>
      <Container className='themed-container' fluid={true}>
        <h2 className='title'>Farm Visit Requests</h2>
        <Button className="bg-info" onClick={()=>{handleShow(true)}}>Send Your Request</Button>
      </Container>
      <div className='text-left'>
        <Container fluid={true}>
          <Table striped>
      <thead>
        <tr>
          <th>Requester Name</th>
          <th>School/Institite</th>
          <th>Conatct No</th> 
          <th>Count of Visitors</th>
          <th>Require Date</th>
          <th>Request On</th> 
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {visitRequest.map((visitRequests, index) => (
        <tr key={index}>
          <td scope="row">{visitRequests.requester}</td>
          <td>{visitRequests.institute}</td>
          <td>{visitRequests.contactNo}</td>
          <td>{visitRequests.noOfVisitors}</td>
          <td>{visitRequests.requestDate}</td>
          <td>{visitRequests.createDate}</td>
          <td>
            <Button onClick={()=>{getData(visitRequests.id);handleShowE(true)}}>Edit</Button>
        <Button className="bg-warning" onClick={()=>deleteData(visitRequests.id)}>Delete</Button>
          </td>
        </tr>
       ))}
      </tbody>
    </Table>   
        </Container>
        <Modal isOpen={showModal}>
          <ModalBody>
            <Form>
              <FormGroup>
            <Label for='fname'>
              Requester
            </Label>
            <Input
              type='text'
              name='reqName'
              id='reqName'
              value={reqName}
              onChange={e => setReqName(e.target.value)}
              required/>
          </FormGroup>
              <FormGroup>
            <Label for='institute'>
              Institute/School
            </Label>
            <Input
              type='text'
              name='institute'
              id='institute'
              value={institute}
              onChange={e => setinstitute(e.target.value)}
              required/>
          </FormGroup>    
          <FormGroup>
            <Label for='contact'>
              Conatct No
            </Label>
            <Input
              type='text'
              name='contact'
              id='contact'
              value={contact}
              onChange={e => setcontact(e.target.value)}
              required />
          </FormGroup>
          <FormGroup>
            <Label for='count'>
              No of Visiters
            </Label>
            <Input
              type='text'
              name='count'
              id='count'
              value={count}
              onChange={e => setcount(e.target.value)}
              required/>
          </FormGroup>
          <FormGroup>
          <Label for="reqDate">Request Date</Label>
          <DateTimePicker
            value={reqDate}
            onChange={(date) => setreqDate(date)}
        required/>
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
              <FormGroup>
            <Label for='fname'>
              Requester
            </Label>
            <Input
              type='text'
              name='reqName'
              id='reqName'
              value={reqName}
              onChange={e => setReqName(e.target.value)}
               />
          </FormGroup>
              <FormGroup>
            <Label for='institute'>
              Institute/School
            </Label>
            <Input
              type='text'
              name='institute'
              id='institute'
              value={institute}
              onChange={e => setinstitute(e.target.value)}
              />
          </FormGroup>    
          <FormGroup>
            <Label for='contact'>
              Conatct No
            </Label>
            <Input
              type='text'
              name='contact'
              id='contact'
              value={contact}
              onChange={e => setcontact(e.target.value)}
               />
          </FormGroup>
          <FormGroup>
            <Label for='count'>
              No of Visiters
            </Label>
            <Input
              type='text'
              name='count'
              id='count'
              value={count}
              onChange={e => setcount(e.target.value)}
              />
          </FormGroup>
          <FormGroup>
          <Label for="reqDate">Request Date</Label>
          <DateTimePicker
            id="reqDate"
            value={reqDate}
            onChange={(date) => setreqDate(date)}
        />
      </FormGroup>
          <Button onClick={e => editData(e)}>
            Edit
          </Button>
          <Button onClick={()=> handleCloseE()}>Cancel</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    </>
  )
}
export default VisitRequest