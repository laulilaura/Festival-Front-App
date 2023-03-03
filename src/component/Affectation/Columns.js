import React from "react";
import Benevole from "./Benevole";
import { Droppable } from "@hello-pangea/dnd";

function Columns({ column, benevoles }) {
  return (
    <div>
      <h2>{column.nom}</h2>

      <Droppable droppableId={column._id}>
        {(provider) => (
          <div
            {...provider.droppableProps}
            ref={provider.innerRef}
            className="benevoles"
          >
            {benevoles.map((benevole, index) => (
              <Benevole key={benevole._id} benevole={benevole} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Columns;
