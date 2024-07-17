import { useState } from "react";
import { OrdersListEditor } from "./OrdersList.Editor";
import { OrderEditModal } from "./Order.EditModal";
import { OrderDeleteModal } from "./Order.DeleteModal";


export function OrdersList ( ) {

    const [modal, setModal] = useState({
        orderId:    null,
        type:       null
    });

    return (
        <>
            <OrdersListEditor setModal={setModal}/>
            { modal.type === 'edit' &&
                <OrderEditModal modal={modal} setModal={setModal} />
            }
            { modal.type === 'delete' &&
                <OrderDeleteModal modal={modal} setModal={setModal} />
            }
        </>
    );

}