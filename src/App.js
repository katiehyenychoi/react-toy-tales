import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

const BASE_URL = "http://localhost:3000/toys/"

class App extends React.Component {

  state = {
    display: false,
    toys: []
  }

  componentDidMount() {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(toys =>
        this.setState({
          toys: toys
        }))
  }


  handleClick = () => {
    let newBoolean = !this.state.display //Need it as a separate variable, for toggling
    this.setState({
      display: newBoolean
    })
  }

  //Put the setState changing callback method in the same Comp as the State is in
  createNewToy = (newToy) => {
    this.setState({
      toys: [newToy, ...this.state.toys] //Need ..."this.state".toys
      //BC!! no need to wrap ...this.state.toys with curlies!
      // or is it  {newToy, ...toys } No
      //or is it {[newToy, ...toys]} ? No
      //or is it  {[newToy, {...toys}]}  No
    })
  }

  deleteToy = (delToy) => {
    //We are deleting a specific Toy so we pass in a Toy argument
    let leftToys = this.state.toys.filter(toy => toy.id !== delToy.id)
    // No not here!!!!  The purpose of setState here is to updateDOM (in this case)
    // this.setState({
    //   toys: leftToys
    // })
    fetch("http://localhost:3000/toys/" + delToy.id, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(() =>
        this.setState({
          toys: leftToys
        }))
    // Here, you are passing in empty argument!
  }

  //Updating Like callback method
  likeToy = (lovedToy) => {
    // 1.Find the Toy we clicked/liked on 
    //^ THis means we need to pass in the Toy argument
    let oldToy = this.state.toys.find(toy => lovedToy.id === toy.id)

    // 2.Find the index of the toy in State to remove/splice
    let oldIndex = this.state.toys.indexOf(oldToy)

    // 3.Make a new array with filtering out that toy above
    let filteredToys = this.state.toys.filter(toy => toy.id !== oldToy.id)

    //4.Update the Toy object
    let updatedToy = { ...oldToy, likes: oldToy.likes + 1 }
    //^ must write oldToy.likes + 1 not just likes + 1

    // console.log(updatedToy)

    //Insert back in the same index using splice
    filteredToys.splice(oldIndex, 0, updatedToy)
    // splice(index, 0,insertingObj)
    //splice is DESTRUCTIVE

    //Make a reqObj
    let reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedToy) //bc we're making a req to THAT Specific ID.
    }

    //Make a fetch request
    fetch(BASE_URL + lovedToy.id, reqObj)
      .then(res => res.json())
      .then(() => this.setState({
        toys: filteredToys
      }))
  }


  render() {
    return (
      <>
        <Header />
        {
          this.state.display
            ?
            <ToyForm createNewToy={this.createNewToy} />
            :
            null
        }
        < div className="buttonContainer" >
          <button onClick={this.handleClick}> Add a Toy </button>
        </div >
        <ToyContainer likeToy={this.likeToy} deleteToy={this.deleteToy} toys={this.state.toys} />
      </>
    );
  }

}

export default App;
