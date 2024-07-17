import { useOrdersContext } from "../../context/DataProvider";
import { OrdersList } from "../../components/ordersComponents/Orders.List";
import {OrdersListPlaceholder} from "../../components/ordersComponents/OrdersList.Placeholder"


export function OrdersMainLayout () {

    const {ordersLoader}= useOrdersContext();

    return (
        <>
            {
                !ordersLoader
                ?
                <OrdersList />
                :
                <OrdersListPlaceholder />
            }
        </>
    )
}