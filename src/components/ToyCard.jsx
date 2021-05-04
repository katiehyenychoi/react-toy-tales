import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.toy.name} className="toy-avatar" />
        <p>{this.props.toy.likes} Likes </p>
        <button onClick={() => this.props.likeToy(this.props.toy)} className="like-btn">Like {'<3'}</button>
        <button onClick={() => this.props.deleteToy(this.props.toy)} className="del-btn">Donate to GoodWill</button>
        {/* BC!! We need to pass it this.props.toy!!! */}
      </div>
    );
  }

}

export default ToyCard;
