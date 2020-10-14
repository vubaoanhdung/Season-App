import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Loader from "./Loader";

class App extends React.Component {
	state = { latitude: null, errorMessage: "" };

	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
			(position) => this.setState({ latitude: position.coords.latitude }),
			(err) => this.setState({ errorMessage: err.message })
		);
	}

	renderContent() {
		if (this.state.errorMessage && !this.state.latitude) {
			return <div>Error: {this.state.errorMessage}</div>;
		}
		if (!this.state.errorMessage && this.state.latitude) {
			return <SeasonDisplay latitude={this.state.latitude} />;
		}
		return <Loader message="Please accept location request" />;
	}

	render() {
		return <div className="border red">{this.renderContent()}</div>;
	}
}
ReactDOM.render(<App />, document.querySelector("#root"));
