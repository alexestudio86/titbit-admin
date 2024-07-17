import { useDishesContext } from "../../context/DataProvider";
import { DishesListPlaceholder } from "../../components/dishesComponents/DishesList.Placeholder";
import { DishesList } from "../../components/dishesComponents/Dishes.List";

export function DishesMainLayout () {

    const {dishesLoader} = useDishesContext();

    return (
        <>
            {
                !dishesLoader
                ?
                <DishesList />
                :
                <DishesListPlaceholder />
            }
        </>
    )
}