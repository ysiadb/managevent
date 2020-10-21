import React, { Component } from 'reactn';
import { Navbar, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import avatar from './avatar.png';
import Routes from './Routes';
import FacebookLoginWithButton from 'react-facebook-login';


const LoginButton = ({ facebookResponse }) => (
  <FacebookLoginWithButton
    appId="1206715649505081"
    // autoLoad
    fields="name,email,picture"
    // onClick={componentClicked}
    callback={facebookResponse}
    icon="fa-facebook" />
)

const UserScreen = ({user}) => (
  <>
    <h1>Welcome {user.name}!</h1>
    <p>{ user.email }</p>
    <img src={user.picture.data.url} height={user.picture.height} width={user.picture.width} alt="avatar"/>
  </>
)

export default class App extends Component {
   logout = () => {
    localStorage.removeItem('User');
            window.location.reload()
    }
  render() {

    if(localStorage.getItem('User'))
    {
      return (
        <div className="App">
          <Navbar sticky="top">
            <Navbar.Brand>
              <Link to="/"><h1>Our_events</h1></Link>
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Link to="/profile">
                <NavItem><img src={avatar} width="30" height="30" alt="Profile avatar" /></NavItem>
              </Link>
              <div style={{ margin: "auto", textAlign: "center", paddingTop: "15px" }}>
                {/* {this.state.user ? <UserScreen user={this.state.user} /> : */}
                  <LoginButton facebookResponse={this.facebookResponse} />
                
              </div>
              <NavItem><img src="https://cdn.onlinewebfonts.com/svg/img_248752.png" width="30" height="30" alt="logout" onClick={this.logout} /></NavItem>


            </Navbar.Collapse>
          </Navbar>
          <Routes />
        </div>
      );
    }


    return (
      <div className="App">
        <Navbar sticky="top">
          <Navbar.Brand>
            <Link to="/"><h1>Our_events</h1></Link>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Link to="/profile">
              <NavItem><img src={avatar} width="30" height="30" alt="Profile avatar" /></NavItem>
            </Link>
            <div style={{ margin: "auto", textAlign: "center", paddingTop: "15px" }}>
              {/* {this.state.user ? <UserScreen user={this.state.user} /> : */}
                <LoginButton facebookResponse={this.facebookResponse} />
              
            </div>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    );
  }
}
