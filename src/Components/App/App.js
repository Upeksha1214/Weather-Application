import React, { useState } from "react";
import "./App.css";
import weatherApi from "../../util/weatherApi";
import SearchBar from "../SearchBar/SearchBar";
import TodayData from "../TodayData/TodayData";
import Login from "../login/Login"; // Import the Login component

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [weatherData, setWeatherData] = useState({
    firstTime: true,
    city: "",
    weekday: "",
    temp: "",
    weatherDescription: "",
    weatherIcon: "",
    country: "",
    timezone: "",
    time: "",
    forecast3hrs: [],
    forecastWeekly: []
  });

  const updateTodayState = (data) => {
    setWeatherData((prevData) => ({
      ...prevData,
      firstTime: false,
      temp: data.temp,
      weatherDescription: data.weatherDescription,
      weatherIcon: data.weatherIcon,
      country: data.country,
      timezone: data.timezone,
      time: data.time,
      weekday: data.weekday,
      city: data.city
    }));
  };

  const updateWeeklyState = (data) => {
    setWeatherData((prevData) => ({
      ...prevData,
      forecastWeekly: data,
      forecast3hrs: data.slice(0, 8)
    }));
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const search = (term) => {
    weatherApi.getTodayData(term).then((data) => updateTodayState(data));
    weatherApi.get3HoursData(term).then((data) => updateWeeklyState(data));
  };

  const warningBanner = () => {
    if (weatherData.firstTime) {
      return null;
    }

    return (
      <div className="warningBanner">
        We couldn’t find any results. Try checking your spelling.
      </div>
    );
  };

  const displayResult = () => {
    return typeof weatherData.city !== "undefined" && weatherData.city !== "";
  };

  return (
    <div className="main">
      {!isAuthenticated && <Login onLogin={handleLogin} />}

      {isAuthenticated ? (
        <>

          <div className="navbar-main  ">
            <Navbar expand="lg" className="bg-body-tertiary">
              <Container fluid>
                <Navbar.Brand href="#" >WEATHER APP</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                  >
                    <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">Link</Nav.Link>
                    <NavDropdown title="Link" id="navbarScrollingDropdown">
                      <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#" disabled>
                      Link
                    </Nav.Link>
                  </Nav>

                  <Button variant="outline-success">Log out</Button>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>

          <SearchBar onSearch={search} />
          {displayResult() ? (
            <TodayData
              city={weatherData.city}
              country={weatherData.country}
              temp={weatherData.temp}
              time={weatherData.time}
              weekday={weatherData.weekday}
              weatherDescription={weatherData.weatherDescription}
              weatherIcon={weatherData.weatherIcon}
              forecast3hrs={weatherData.forecast3hrs}
              forecastWeekly={weatherData.forecastWeekly}
            />
          ) : (
            warningBanner()
          )}
        </>
      ) : null}
    </div>
  );
};

export default App;
