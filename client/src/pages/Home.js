import React, { Component, Fragment } from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from "axios";
import './Home.css';
import FacebookLogin from 'react-facebook-login';
import parse from 'html-react-parser';



let keyD = "KC3vRSZb2cmQsC9k"
let keyA = 'nCWfP5cZNWNHqSPB'
let my_key = keyD

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      events: [],
      categories: [],
      categorie: "",
      category_id: "",
      location: "",
      current_page: 1,
      events_per_page: 8,
      scroll: false,
      perimetre: 10,
      locations: []
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.scrollBackTop);


    console.log(navigator.geolocation, "GEOLOCALISATION")

  }

  componentWillMount() {
    this.getCity();
    this.getCategories();
  }

  scrollTop = () => {
    document.documentElement.scrollTop = 0;
  }
  pageClick = (event) => {
    this.setState({
      current_page: Number(event.target.id)
    })
  }
  getCategories = () => {
    axios.get("http://localhost:4242/allCategorie")
      .then((response) => {
        // console.log(response.data.category, 'ddddddddddddd')
        this.setState({ categories: response.data.category })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  handleChange = (event) => {
    this.setState({
      categorie: event.target.value
    })
  }
  handleChangeCity = (event) => {
    this.setState({
      location: event.target.value
    })
  }


  handleSubmit = (event) => {
    event.preventDefault();
    axios.get('http://api.eventful.com/json/events/search/?app_key=' + my_key + '&categories=' + this.state.categorie + '&location=' + this.state.location)
      .then((response) => {
        // console.log(response, "teeeeeeeeest");
        // console.log(response.data.events.event, "LIST TESTTT")
        // res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
        // res.send(resp.data);
        this.setState({ events: response.data.events.event });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getCity() {
    navigator.geolocation.getCurrentPosition(location => {
      var lat = location.coords.latitude
      var long = location.coords.longitude
      localStorage.setItem('latitude', lat);
      localStorage.setItem('longitude', long);
    })
    let Coord = {
      latitude: localStorage.getItem("latitude"),
      longitude: localStorage.getItem("longitude")
    };
    axios.get(`http://api.eventful.com/json/events/search?app_key=xbM4ZKvWJcRjs7FQ&date=Future&where=${Coord.latitude},${Coord.longitude}&within=${this.state.perimetre}`)
    .then((response) => {
      this.setState({locations : response.data.events.event})
    })
    .catch((error) => {
      console.log(error);
    })
  }

  showPosition = (position) => {
  }

  getEvents = (coords) => {

  }

  render() {
    const { current_page, events_per_page } = this.state;
    const indexOfLastEvent = current_page * events_per_page;
    const indexOfFirstEvent = indexOfLastEvent - events_per_page;
    const currentEvents = this.state.events.slice(indexOfFirstEvent, indexOfLastEvent);

    if (this.state.events.length > 0) {
      console.log(this.state.events, "events")

      var eventsss = this.state.events.map(event => {
        // console.log(event, 'dataaaaaaaa');
        return (
          <div className="event">
            <div className="main_infos">
              {event.image &&
                <img src={event.image.medium.url}></img>
              }
              <div className="infos">
                <h3>{event.title}</h3>
                {event.description &&
                  <p id="text">{parse(event.description)}</p>
                }
              </div>
            </div>
            <div><a href={"event/" + event.id}>En savoir plus</a></div>
          </div>
        )
      })
    }


    if(this.state.locations.length > 0)
    {
      console.log(this.state.locations, "locations")
      var eventss = this.state.locations.map(event => {
        // console.log(event, 'dataaaaaaaa');
        return (
          <div className="event">
            <div className="main_infos">
              {event.image &&
                <img src={event.image.medium.url}></img>
              }
              <div className="infos">
                <h3>{event.title}</h3>
                {event.description &&
                  <p id="text">{parse(event.description)}</p>
                }
              </div>
            </div>
            <div><a href={"event/" + event.id}>En savoir plus</a></div>
          </div>
        )
      })
    }

    return (
      <div className="container-fluid main">
        <div className="menu">
          <h4>Filtres</h4>
          <Form className="event_search" onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Categories</Form.Label>
              <Form.Control as="select" id="category" value={this.state.categorie} onChange={this.handleChange}>
                {this.state.categories.map(cat => {
                  return (
                    <option value={cat.id}>{cat.name}</option>
                  )
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control type="text" id="location" value={this.state.location} onChange={this.handleChangeCity} />
            </Form.Group>
            <Button variant="light" type="submit">Search</Button>
          </Form>
        </div>
        <div className="result">
          <h4>Events à venir</h4>
          {eventsss || eventss}
        </div>
      </div>
    );
  }
}