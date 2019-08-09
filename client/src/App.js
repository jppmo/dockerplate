import React from 'react';
import { connect } from 'react-redux';
// React-Router
import { Link, Route, Switch } from 'react-router-dom';
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
import Habituary from './containers/habituary';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="App">

        {/* NavBar */}
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Ritual</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <li><Link to={'/'} className="nav-link"> Home </Link></li>
              <li><Link to={'/diary'} className="nav-link">Diary</Link></li>
              <li><Link to={'/habituary'} className="nav-link">Habituary</Link></li>
              <li><Link to={'/guides'} className="nav-link">Guides</Link></li>
              <li><Link to={'/tracker'} className="nav-link">Skill Tracker</Link></li>
              <li><Link to={'/roadmap'} className="nav-link">Roadmap</Link></li>
            </Nav>
          </Collapse>
        </Navbar>

        {/* Content */}
        <Switch>
          {/* ugly url... maybe change route paths? */}
          <Route exact path="/diary" component={Diary} />
          <Route exact path="/habituary" component={Habituary} />
        </Switch>       
      </div>
    );
  }
  
}


export const mapStateToProps = store => {
  return {
    
  };
};
export const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
