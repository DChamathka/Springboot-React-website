import React from "react";
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  UncontrolledCollapse
} from "reactstrap";
import {Link} from 'react-router-dom'
import { Nav} from 'react-bootstrap';
import Logo from "../assets/img/logo.jpg";
function HNavbar(props){
  return (
    <>
      <Navbar className="bg-success" expand="lg">
        <Container>
           <NavbarBrand>
           <Row>
           <Col><img className="rounded-circle" src={Logo} width="75"/></Col>
           <Col><h3>GreenAgri</h3></Col>     
            </Row>
          </NavbarBrand>
          <button
              className="navbar-toggler"
              id="example-navbar-primary"
              type="button"
            >
              <span className="navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </button>
             <Nav className="ml-auto" navbar>
                    <Nav.Link as={Link} to="/"> <i className="now-ui-icons shopping_shop"></i>{' '}Home</Nav.Link>
                    <Nav.Link as={Link} to="/greenagri/products" > <i className="now-ui-icons shopping_basket"></i>{' '}Products</Nav.Link>
                    <Nav.Link as={Link} to="/greenagri/farmers"> <i className="now-ui-icons users_circle-08"></i>{' '}Farmers</Nav.Link>
                    <Nav.Link as={Link} to="/greenagri/visitingrequests"> <i className="now-ui-icons ui-1_send"></i>{' '}Farm Visit Request</Nav.Link>
            </Nav>
       </Container>  
      </Navbar>
    </>
  );
}

export default HNavbar;