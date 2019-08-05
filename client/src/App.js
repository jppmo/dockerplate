import React from 'react';
import { connect } from 'react-redux'
// React-Router
import { Link, Route, Switch } from 'react-router-dom'
// CSS/Assets
import './App.css';
// Reacstrap
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav } from 'reactstrap';
  // Components / Containers
import Diary from './containers/diary';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      token: false
    };
  }

  componentDidMount() {
    
    let code
    let token // TODO: DON'T STORE THE TOKEN ON THE CLIENT FRONT END!!! Put it in a session cookie or something to be more secure
    let tokenType
    const secret = 'browserTestSecret' // probs shouldn't be stored locally on the frontend
    const id = 'browser'  // probs shouldn't be stored locally on the frontend
    
    const urlParams = new URLSearchParams(window.location.search) // retrieve the authorization code from the url
    code = urlParams.get('code')
    
    console.log("componentDidMount: URL PARAMS - ", urlParams)

    fetch('/oauth/token', {
      method: 'POST',
      body: `code=${code}&client_secret=${secret}&client_id=${id}&grant_type=authorization_code`, // this is how we send that data up
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',  // This is REALLY important
      },
    })
    .then(res => res.json())
    .then(res => {
      console.log('Credentials', res)
      token = res.access_token
      tokenType = res.token_type
      this.setState({
        token: token
      });
      //JA TEMOS O TOKEN PARA FAZER PEDIDOS!!!! :D:D:D:D:DD
    })
    .catch(err => {
      console.log(err)
      //AQUI MOSTRAR A PAGINA DE ERRO!!!!! 
      //NAVEGAS-TE PARA O http://localhost:4010/ sem auth code!! tas a perceber???
    })
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      
      <div className="App">
      { this.state.token &&
        <div>  
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Ritual</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <li><Link to={'/'} className="nav-link"> Home - {this.state.token}</Link></li>
              <li><Link to={'/diary'} className="nav-link">Diary</Link></li>
              <li><Link to={'/habituary'} className="nav-link">Habituary</Link></li>
              <li><Link to={'/guides'} className="nav-link">Guides</Link></li>
              <li><Link to={'/tracker'} className="nav-link">Skill Tracker</Link></li>
              <li><Link to={'/roadmap'} className="nav-link">Roadmap</Link></li>
            </Nav>
          </Collapse>
        </Navbar>

        <Switch>
          <Route exact path="/diary" component={Diary} />
        </Switch>
        </div>
      }       
        </div>
    );
  }
  
}


export const mapStateToProps = store => {
  return {
    
  }
}
export const mapDispatchToProps = dispatch => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

// export default App;
