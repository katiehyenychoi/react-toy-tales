import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return (
    <div id="toy-collection">
      {props.toys.map((toy) => <ToyCard likeToy={props.likeToy} deleteToy={props.deleteToy} toy={toy} />)}
    </div>
  );
}

export default ToyContainer;
