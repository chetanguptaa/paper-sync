import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import './styles/landingPage.css';

export const LandingPage = () => {
  return (
    <>
        <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <div className="row">
                <div className="col-md-8">
                    <Link to="/login">
                        <Card>
                        <Card.Body>
                            <Card.Title>Log In</Card.Title>
                            <Card.Text>Click here to log in</Card.Text>
                        </Card.Body>
                        </Card>
                    </Link>
                </div>
                <div className="col-md-8">
                    <Link to="/signup">
                        <Card>
                        <Card.Body>
                            <Card.Title>Sign Up</Card.Title>
                            <Card.Text>Click here to sign up</Card.Text>
                        </Card.Body>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    </>
  );
};