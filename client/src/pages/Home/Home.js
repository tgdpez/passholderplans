import React, { Component } from "react";
import "./home.css";
import Navigation from '../../components/Navigation';
import Materialize from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import axios from 'axios';
import ParkSelect from "../../components/ParkSelect";
import Attractions from "../../components/Attractions";
import Everyone from "../../components/Everyone";

class Home extends Component{

    state = {
        activeComponent: "",
		user: "",
		userEvents: []
    }

    componentDidMount = ()=> {
		this.setState({
			activeComponent: "parkselect"
		});
    }

	changeComponent= (incomingPage)=> {
		this.setState({
			activeComponent: incomingPage
		});
	}

	verifyKey = (userId, eventUniqueKey) => {
		console.log("Logging user id: " + userId + " and event key: " + eventUniqueKey + " All coming back from Attraction component");
		let usersCurrentEvents = this.state.userEvents;
		// usersCurrentEvents.push(eventUniqueKey);
		// console.log("userEvents from state: " + this.state.userEvents);

		axios.post("/user/userdata", {
			events: eventUniqueKey
		})
		.then(function (response) {
			console.log("Looging response on the front end: " + response);
		})
		.catch(function (error) {
			console.log(error);
		});


		//Set state with this information
		// this.setState({
		// 	user: userId,
		// 	userEvents: userEvents
		// })
		// console.log("Logging user events from state: " + this.state.userEvents);
	}

	pageSwitch() {
		let pageModule;
		if(this.state.activeComponent == "parkselect"){
			pageModule = <ParkSelect auth={this.props.auth.username} next={this.changeComponent}/>
			return pageModule;
		} else if(this.state.activeComponent == "attractions") {
			pageModule = <Attractions auth={this.props.auth.username} id={this.props.auth.userId} next={this.changeComponent} verKey={this.verifyKey}/>
			return pageModule;
		} else if(this.state.activeComponent == "everyone") {
			pageModule = <Everyone auth={this.props.auth.username} next={this.changeComponent} recieveEvent={this.state.event}/>
			return pageModule;
		} else{

		}
	}


	render(pageModule) {
        return(
            <div>
                <Navigation handleLogout={this.props.handleLogout} auth={this.props.auth.username}/>
				{/* <Everyone auth={this.props.auth.username} next={this.changeComponent}/> */}
				{this.pageSwitch()}
            </div>
        );  
	}

};

export default Home;