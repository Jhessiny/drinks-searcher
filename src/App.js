import React, { Component } from "react";

import { fetchData } from "./api";
import Drinks from "./components/Drinks/Drinks";
import Header from './components/Header/Header'

class App extends Component {
  state = {
    drinks: {},
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ drinks: fetchedData });
    console.log("data", this.state.data);
  }

  render() {
    const { drinks } = this.state;

    return (
      <React.Fragment>
        <Header/>
        <div className="container">
            <Drinks drinks={drinks} />
        </div>
       </React.Fragment>
    );
  }
}

export default App;
