import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { EventsDB } from "../api/events";
import Navbar from "./Navbar";
import Welcome from "./Welcome";
import Events from "./events/Events";
import { Accounts } from 'meteor/accounts-base';

// import Tickets from './tickets/Tickets';

class App extends Component {

  render() {
    return (
      <div>
        <div>
          <Welcome></Welcome>
          <Navbar events={this.props.events} ></Navbar>
          <Events events={this.props.events} currentUser={this.props.currentUser}></Events>
        </div>
      </div>
    );
  }
};

export default withTracker(() => {
  Meteor.subscribe('allEvents');
  return {
    events: EventsDB.find({}, { sort: { date: 1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);