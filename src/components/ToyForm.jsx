import React, { Component } from 'react';

class ToyForm extends Component {
  // BC- Put the states here 
  // Forms have initial states.
  state = {
    id: "",
    name: "",
    image: "",
    likes: 0
  }

  //Callback method for changing State should be in the same Comp as the State is.
  submitHandler = (event) => {
    event.preventDefault()
    //1. Contains a new toy obj
    //That is the {...this.state}

    //2. Make a reqObj
    let reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...this.state })
    }
    //3.Make a fetch POST req
    fetch("http://localhost:3000/toys", reqObj)
      .then(res => res.json())
      .then(updatedToyObj => {
        // Must console log below to see what the response object is !!
        // console.log(updatedToyObj)
        this.props.createNewToy(updatedToyObj)

        this.setState({
          id: "",
          name: "",
          image: "",
          likes: 0
        })
      })

  }

  render() {
    return (
      <div className="container">
        <form onSubmit={(e) => this.submitHandler(e)} className="add-toy-form">
          <h3>Create a toy!</h3>
          <input value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} type="text" name="name" placeholder="Enter a toy's name..." className="input-text" />
          <br />
          <input value={this.state.image} onChange={(event) => this.setState({ image: event.target.value })} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" />
          <br />
          <input type="submit" name="submit" value="Create New Toy" className="submit" />
        </form>
      </div>
    );
  }

}

export default ToyForm;
