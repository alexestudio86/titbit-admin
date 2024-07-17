import { useDishesContext } from "../../context/DataProvider"
import { OrdersCreator } from "../../components/ordersComponents/Orders.Creator";
import { OrdersCreatorPlaceholder } from "../../components/ordersComponents/OrdersCreator.Placeholder"

export function OrdersSidebarLayout () {

    const {dishesLoader} = useDishesContext();

    return (
        <>
            {
                !dishesLoader
                ?
                <OrdersCreator />
                :
                <OrdersCreatorPlaceholder />
            }
        </>
    )
}