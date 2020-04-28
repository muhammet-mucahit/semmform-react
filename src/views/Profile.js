import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import axios from "axios";

const UserProfile = () => {
  const { loading, user } = useAuth0();

  const [profile, setProfile] = useState("");
  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    const getUser = async (username) => {
      const api = "http://localhost:8000/api/v1";
      const token = await getTokenSilently();

      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      await axios
        .get(`${api}/users/${username}/`, {
          headers: headers,
        })
        .then((response) => {
          setProfile(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const username = formatUsernameWithDot(user.sub);
    getUser(username);
  }, []);

  const formatUsernameWithDot = (username) => {
    return username.replace("|", ".");
  };

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          defaultValue={profile.first_name}
                          placeholder="Company"
                          type="text"
                          className="inputText"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          defaultValue={profile.first_name}
                          placeholder="Last Name"
                          type="text"
                          className="inputText"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                          className="inputText"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Phone</label>
                        <Input
                          defaultValue="Mike"
                          placeholder="Company"
                          type="text"
                          className="inputText"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Birthday</label>
                        <Input
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="text"
                          className="inputText"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue="Mike"
                          placeholder="City"
                          type="text"
                          className="inputText"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text"
                          className="inputText"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number"  className="inputText"/>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href={user.picture}>
                    <img alt="..." className="avatar" src={user.picture} />
                    <h5 className="title">{user.name}</h5>
                  </a>
                  <p className="description">{user.email}</p>
                  <p>{user.sub}</p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserProfile;
