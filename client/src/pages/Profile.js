import React, { Component } from "reactn";
import FacebookLogin from 'react-facebook-login';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        //TODO definir les props
        this.state = {
            username: null,
            email: null,
            bio: null,
            avatar: "../avatar.png"

        };
    }

    // componentDidMount() {
    //     this.setState({
    //         username: this.state.username,
    //         email: this.state.email,
    //         bio: this.state.bio
    //     })
    //     localStorage.setItem('User', this.state.username)
    // }

    handleSubmitForm = async (event) => {
        // alert(this.state.username)
        localStorage.setItem('User', this.state.username);
        localStorage.setItem('User_email', this.state.email);
        localStorage.setItem('User_bio', this.state.bio);
        window.location.reload();

        event.preventDefault();
    }

    handleChange = async (event) => {
// alert(this.state.username)
        var value = event.target.value;
        var name = event.target.name;

        this.setState({
            [name]: value,
        });
    }


    render() {
        if (localStorage.getItem('User') == null) {
            // alert("HAHA");
            return (
                <div className="newsession">
                    <div>
                        <form className="newuser">

                            <h4>Je m'inscris en 30 secondes !</h4>
                            <label>Nom</label>
                             <input type="text" name="username" value={this.state.username} onChange={event => this.handleChange(event)} />

                            <label>Email</label>
                            <input type="email" name="email" value={this.state.email} onChange={event => this.handleChange(event)} />

                            <label>Bio</label>
                            <input type="text" name="bio" value={this.state.bio} onChange={event => this.handleChange(event)} />

                            {/* <label for="avatar">Choose a profile picture:</label> */}

                            {/* <input type="file"
                                id="avatar" name="avatar"
                                accept="image/png, image/jpeg" value={this.state.avatar} /> */}


                            <input id="submit" type="submit" value="Enregistrer" onClick={this.handleSubmitForm} />
                        </form>
                    </div>
                </div>
            )
        }
            return (
                <div className="body">
                    <section className="main-member">
                        <img id="avatar" src="https://www.inbenta.com/wp-content/themes/inbenta/img/icons/avatar.svg?ver=2"></img>
                        <div className="infos-event">
                            <h4>{localStorage.getItem('User')}</h4>

                            <div className="statut">
                                <p> <label>Présentation</label >
                                    <br />
                                    {localStorage.getItem('User_bio')}</p><br />

                            </div>
                        </div>
                    </section>

                    <section className="sorties">
                        <div className="sortie">
                            <img src={"/"}></img>
                            <div className="infos">
                                <h3>{}</h3>
                                <p id="text">Nombre de participants: {}</p>
                                {/* <a href={"/event/" + event.id}>En savoir +</a> */}
                            </div>
                        </div>
                    </section>
                </div>
            )
        

    }

}
