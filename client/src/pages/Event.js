import React, { Component } from "reactn";
import axios from "axios";
import './Home.css';
import parse from 'html-react-parser';

let splitURL = window.location.href.split('/');
let EventId = splitURL[4];
export default class Event extends Component {
    constructor() {
        super();
        this.state = {
            events: [],
            found: "",
            scroll: false,
            image: [],
            images: [],
            description: "",
            descript: ""
        }
    }

    componentDidMount = () => {
        const events = async () => {
            await axios.get('http://localhost:4242/event/' + EventId).then(response => {
                // console.log(response.data, "NEW RESPOOOOONSE")

                if (response.data.images !== null) {
                    this.setState({
                        events: response.data,
                        image: response.data.images.image.medium,
                        images: response.data.images,
                        description: response.data.description,
                        descript: this.state.description
                    });
                }

                else {
                    this.setState({
                        events: response.data,
                        description: response.data.description,
                        descript: this.state.description
                    });
                }
            })
        }
        events();
    }
    getEventId = () => {
        this.getEventInfo(window.location.href.slice(28))
    }

    // getdescription = () => {
    //     var test = JSON.parse(descript)
    //     return test
    // }


    render() {
        if (this.state.events.description == null) {
            return (
                <div className="body">
                    <div className="Title">
                        <h3>{this.state.events.title}</h3>
                    </div>

                    <section className="main-event">
                    <img src={this.state.image.url}></img>

                        {/* <img src={this.state.events.images.image.medium.url}></img> */}
                        <div className="infos-event">
                            <div className="Date">
                                <label for="date">Date</label><input name="date" id="date" value={this.state.events.start_time} /><div id="agenda"></div><br />
                            </div>

                            <div className="Lieu">
                                <p> <label>Lieu :</label > {this.state.events.city}, {this.state.events.address}</p><div id="localisation"></div><br />

                            </div>
                            <a href="/organize">Organiser une sortie</a>
                        </div>
                    </section>
                    <h3>Description </h3>
                    <p id="text">Il n'y  pas de desciption pour cet événement</p>
                </div>
            );
        }

        if (this.state.images == null) {
            return (
                <div className="body">
                    <div className="Title">
                        <h3>{this.state.events.title}</h3>
                    </div>

                    <section className="main-event">

                        <div className="infos-event">
                            <div className="Date">
                                <label for="date">Date</label><input name="date" id="date" value={this.state.events.start_time} /><div id="agenda"></div><br />
                            </div>

                            <div className="Lieu">
                                <p> <label>Lieu :</label > {this.state.events.city}, {this.state.events.address}</p><div id="localisation"></div><br />

                            </div>
                            <a href="/organize">Organiser une sortie</a>
                        </div>
                    </section>
                    <h3>Description </h3>
                    <p id="text">{this.state.events.description}</p>
                </div>
            );
        }

        if (this.state.events.description == null && this.state.images == null) {
            return (
                <div className="body">
                    <div className="Title">
                        <h3>{this.state.events.title}</h3>
                    </div>

                    <section className="main-event">
                        <div className="infos-event">
                            <div className="Date">
                                <label for="date">Date</label><input name="date" id="date" value={this.state.events.start_time} /><div id="agenda"></div><br />
                            </div>

                            <div className="Lieu">
                                <p> <label>Lieu :</label > {this.state.events.city}, {this.state.events.address}</p><div id="localisation"></div><br />

                            </div>
                            <a href="/organize">Organiser une sortie</a>
                        </div>
                    </section>
                    <h3>Description </h3>
                    <p id="text">Il n'y  pas de description pour cet événement</p>
                </div>
            );
        }

        return (

            <div className="body">
                <div className="Title">
                    <h3>{this.state.events.title}</h3>
                </div>

                <section className="main-event">
                    {/* <img src={this.state.events.images}></img> */}
                    <img src={this.state.image.url}></img>

                    <div className="infos-event">
                        <div className="Date">
                            <label for="date">Date</label><input name="date" id="date" value={this.state.events.start_time} /><div id="agenda"></div><br />
                        </div>

                        <div className="Lieu">
                            <p> <label>Lieu :</label > {this.state.events.city}, {this.state.events.address}</p><div id="localisation"></div><br />

                        </div>
                        <a href="/organize">Organiser une sortie</a>
                    </div>
                </section>
                <h3>Description </h3>
                <div id="text"> {parse(this.state.description)} </div>
            </div>
        );
    }
}


//PAGE REDIRIGÉE VERS LEVENT