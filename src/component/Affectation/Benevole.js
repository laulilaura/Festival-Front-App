import React from "react";
import { Draggable } from "@hello-pangea/dnd";

function Benevole({ benevole, index }) {
  return (
    <Draggable draggableId={benevole._id} index={index} key={benevole._id}>
      {(provider) => (
        <div
          {...provider.draggableProps}
          {...provider.dragHandleProps}
          ref={provider.innerRef}
        >
          <h3>
            {benevole.prenomBenevole} {benevole.nomBenevole}
          </h3>
          <p>{benevole.emailBenevole}</p>
        </div>
      )}
    </Draggable>
  );
}

export default Benevole;
