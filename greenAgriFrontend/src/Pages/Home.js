import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";


function Home() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);
  return (
    <>
      <div className="wrapper">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className="title">Who we are?</h2>
              <h5 className="description">
                GreenAgri works to foster the improvement and widespread adoption of organic farming systems. We cultivate organic research,
                education, and federal policies that bring more farmers and acreage into organic production.
              </h5>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section section-team text-center">
            <Container>
              <h2 className="title">Here is our services</h2>
              <div className="team">
                <Row>
                  <Col md="4">
                    <div className="team-player">
                      <img
                        alt="..."
                        className="rounded-circle img-fluid img-raised"
                        src={require("../assets/img/products.jpg").default}
                      ></img>
                      <h4 className="title">Organic products</h4>           
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="team-player">
                      <img
                        alt="..."
                        className="rounded-circle img-fluid img-raised"
                        src={require("../assets/img/helpservice.jpg").default}
                      ></img>
                      <h4 className="title">Farming Suppoters</h4>
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="team-player">
                      <img
                        alt="..."
                        className="rounded-circle img-fluid img-raised"
                        src={require("../assets/img/visit.jpg").default}
                      ></img>
                      <h4 className="title">Farm Visits</h4>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
        </div>
          
    </>
  );
}

export default Home;
