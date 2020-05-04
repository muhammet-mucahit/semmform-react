import React, { useEffect, useState } from "react";
import Loading from "components/Loading";
import { useAuth0 } from "react-auth0-spa";
import axios from "axios";
import formatUsernameWithDot from "utils/helper";
import { notify } from "utils/notification";
import API_Config from "../api_config.json";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

const UserProfile = () => {
  const { loading, user, getTokenSilently } = useAuth0();
  const [profile, setProfile] = useState("");
  const [isBusy, setIsBusy] = useState(true);

  useEffect(() => {
    const getUser = async (username) => {
      const api = API_Config.url;
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
          setIsBusy(false);
        })
        .catch((error) => {
          notify(error, "danger");
          console.error(error);
        });
    };
    const username = formatUsernameWithDot(user.sub);
    getUser(username);
  }, [getTokenSilently, user]);

  if (loading || isBusy) {
    return <Loading />;
  }

  const updateUserProfile = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const api = "http://localhost:8000/api/v1";
    const token = await getTokenSilently();

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const username = formatUsernameWithDot(user.sub);

    await axios
      .patch(`${api}/users/${username}/`, data, {
        headers: headers,
      })
      .then((response) => {
        console.log("success");
        notify("The profile updated successfully!", "success");
        setProfile(response.data);
      })
      .catch((error) => {
        notify(error, "danger");
        console.error(error);
      });
  };

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
                <Form onSubmit={updateUserProfile}>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          id="first_name"
                          name="first_name"
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
                          id="last_name"
                          name="last_name"
                          defaultValue={profile.last_name}
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
                          id="address"
                          name="address"
                          defaultValue={profile.address}
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
                          id="phone"
                          name="phone"
                          defaultValue={profile.phone}
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
                          id="dob"
                          name="dob"
                          defaultValue={profile.dob}
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
                          id="city"
                          name="city"
                          defaultValue={profile.city}
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
                          id="country"
                          name="country"
                          defaultValue={profile.country}
                          placeholder="Country"
                          type="text"
                          className="inputText"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input
                          id="zip"
                          name="zip"
                          defaultValue={profile.zip}
                          placeholder="ZIP Code"
                          type="number"
                          className="inputText"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button type="submit" className="btn-fill" color="primary">
                    Save
                  </Button>
                </Form>
              </CardBody>
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
