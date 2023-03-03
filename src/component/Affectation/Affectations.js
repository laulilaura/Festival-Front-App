import React, { useState } from "react";
import data from "../../data";
import Columns from "./Columns";
import { DragDropContext } from "@hello-pangea/dnd";

function Affectations() {
  const [datas, setDatas] = useState(data);

  // console.log(datas);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    console.log("destination", destination);
    console.log("source", source);
    console.log("draggableId", draggableId);

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    console.log(datas.columns);
    console.log("ici", source.droppableId);
    // si on bouge les éléments
    const column = datas.columns.find((start) => {
      console.log("source", start._id);
      console.log("source.droppableId", source.droppableId);
      if (start._id == source.droppableId) {
        return start;
      }
    });
    console.log("column", column);
    // on choppe les ids des bénévoles actuels
    const newBenevoleIds = Array.from(column.benevoleIds);
    console.log("newBenevoleIds", newBenevoleIds);
    // on remplace les places ds l'array
    newBenevoleIds.splice(source.index, 1);
    console.log("newBenevoleIds", newBenevoleIds);
    newBenevoleIds.splice(destination.index, 0, draggableId);
    console.log("newBenevoleIds", newBenevoleIds);
    //on crée une copie de la colonne des bénévoles modifiés
    const newColumn = {
      ...column,
      benevoleIds: newBenevoleIds,
    };
    console.log("newColumn", newColumn);
    // et on met à jour le state
    setDatas({
      ...datas,
      columns: {
        ...datas.columns,
        [newColumn._id]: newColumn,
      },
    });
    console.log("datas", datas);
    return;
  };

  return (
    <div>
      <h1>Affectations</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        {datas.columns.map((column) => {
          console.log(column);
          const benevoles = column.benevoleIds.map((benevoleId) => {
            console.log(benevoleId);
            return datas.benevoles.find(
              (benevole) => benevole._id === benevoleId
            );
          });
          console.log(benevoles);
          return (
            <Columns key={column._id} column={column} benevoles={benevoles} />
          );
        })}

        {/* {datas.columns.forEach((column) => {
          console.log(column)
          const benevoles = column.benevoleIds.map((benevoleId) => {
            console.log(benevoleId)
            return datas.benevoles.find(
              (benevole) => benevole._id === benevoleId
            );
          });
          console.log(benevoles)
          return (
            <Columns key={column._id} column={column} benevoles={benevoles} />
          );
        })} */}
      </DragDropContext>
    </div>
  );
}

export default Affectations;
