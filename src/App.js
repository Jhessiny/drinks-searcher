import React, { Component } from "react";

import { fetchData } from "./api";
import Drinks from "./components/Drinks/Drinks";
import Header from './components/Header/Header'

class App extends Component {
  state = {
    drinks: {},
    search: "margarita",
    beforeSubmitType: '',
    type: 's',
    surprise: false,
    isFetching: false,
  };
  async componentDidMount() {
    this.setState({isFetching: true})
    const fetchedData = await fetchData(this.state.search, this.state.type);
    this.setState({ drinks: fetchedData });
    console.log("data", this.state.data);
    this.setState({surprise: false, isFetching: false})
  }

  changeInput=(e)=> {
      const newSearch = e.target.value
      this.setState({search: newSearch})
  }

  changeType=(e)=>{
      const newType = e.target.value
      this.setState({beforeSubmitType: newType})
  }

  searchNewDrink = async(e)=>{
       this.setState({type: this.state.beforeSubmitType, isFetching: true})
      const fetchedData = await fetchData(this.state.search, this.state.beforeSubmitType, e);
        this.setState({ drinks: fetchedData, surprise: false, isFetching: false });
  }

  surpriseme=async()=> {
     this.setState({isFetching: true})
      const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      const fetchedData = await fetchData(this.state.search, null, null , url);
        this.setState({ drinks: fetchedData });
        console.log("data", this.state.data);
      this.setState({surprise: true, search: '', isFetching: false})
  }

  render() {
    const { drinks, search, surprise, type, isFetching } = this.state;

    return (
      <React.Fragment>
        <Header search={search} changeType={this.changeType} changeInput={this.changeInput} submit={this.searchNewDrink} surpriseme={this.surpriseme}/>
        <div className="container">
           {!isFetching ? ( <Drinks drinks={drinks} surprise={surprise} type={type}/>) :
           <div class="loader">Loading...</div>
           }
        </div>
       </React.Fragment>
    );
  }
}

export default App;
