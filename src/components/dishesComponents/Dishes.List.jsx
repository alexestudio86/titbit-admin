import { useState } from "react";
import { DishesListEditor } from "./DishesList.Editor";
import { DishEditModal } from "./Dish.EditModal";
import { DishDeleteModal } from "./Dish.DeleteModal";

export function DishesList ( ) {

  const [modal, setModal] = useState({
    dishID:   null,
    type:     null
  });


  return (
    <>
      <DishesListEditor setModal={setModal} />
      { modal.type === 'edit' &&
        <DishEditModal modal={modal} setModal={setModal} />
      }
      {
        modal.type === 'delete' &&
        <DishDeleteModal modal={modal} setModal={setModal} />
      }
    </>
  );
}