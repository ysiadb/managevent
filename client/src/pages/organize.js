import React, { Component } from "reactn";
import FacebookLogin from 'react-facebook-login';
import SimpleMap from './map'


export default class Organize extends Component {

    render() {
        return (
            <div className="body">
                <div className="Title">
                    <h3>Sortie : Titre de l'event</h3>
                </div>

                <section className="map">
                    <div>
                        <SimpleMap/>
                        {/* MAP GOOGLE AVEC LES COORDONNEES GEOGRAPHIE DE LEVENT */}
                    </div>
                </section>
                <section className="main-section">
                    <section className="participants">
                        <h4>Participants</h4>
                        <section className="users">
                            <div>
                                <img src={"/"}></img>
                                <p>user</p>
                            </div>
                            <div>
                                <img src={"/"}></img>
                                <p>user</p>
                            </div><div>
                                <img src={"/"}></img>
                                <p>user</p>
                            </div>
                            <div>
                                <img src={"/"}></img>
                                <p>user</p>
                            </div>
                        </section>
                    </section>

                    <section className="chat">
                        <div className="messages">
                            <div className="newmessage">
                                <img src={"/"}></img>
                                <p>user</p>
                                <div><p>corps du message</p></div>
                            </div>
                        </div>
                    </section>
                </section>

            </div>
        )
    }

}
