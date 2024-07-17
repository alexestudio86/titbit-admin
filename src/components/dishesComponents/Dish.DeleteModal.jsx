import { useEffect,  } from "react";
import { useDishesContext } from "../../context/DataProvider";


export function DishDeleteModal ({modal, setModal}) {

    const {dish, setDish, getDish, deleteDish} = useDishesContext();

    useEffect( () => {
        getDish(modal.dishId);
    },[]);

    useEffect( () => {
        dish.changed &&
        setTimeout( () => {
            setDish({
                tooltip:        false,
                loading:        false,
                changed:        false,
            });
            setModal({
                dishId:   null,
                type:     null,
            });
        }, 500);
    },[dish.changed]);

    return (
        <div className={"w3-modal w3-show"} id="editModal">
            <div className="w3-modal-content w3-animate-top">
                {dish.loading
                ?
                    <div className="w3-padding-64" style={ {display:'grid', placeItems: 'center', position: 'relative', overflow: 'hidden'}}>
                        <div className="loader"></div>
                    </div>
                :
                    dish.changed
                    ?
                    <div className="w3-padding-64" style={ {display:'grid', placeItems: 'center', position: 'relative', overflow: 'hidden'}}>
                        <span>¡El producto se ha sido eliminado con éxito!</span>
                    </div>
                    :
                    <form onSubmit={ e => e.preventDefault() } >
                        <header className="w3-container w3-light-gray">
                            <h2 className="w3-padding-16 w3-large w3-center text-uppercase">{`¿Desea eliminar ${dish.productName}?`}</h2>
                        </header>
                        <div className="w3-padding-32 w3-row">
                            <div className="w3-col s6 w3-center">
                                {/* Cancel */}
                                <button
                                    className="w3-button w3-white w3-border w3-border-red"
                                    onClick={ () => {
                                        setDish({});
                                        setModal({
                                            dishId: null,
                                            type: null,
                                        });
                                    }}
                                >Cancelar</button>
                            </div>
                            <div className="w3-col s6 w3-center">
                                {/* Delete */}
                                <button
                                    className="w3-button w3-white w3-border w3-border-green"
                                    onClick={ () => {
                                        deleteDish(dish)
                                    }}
                                >Eliminar</button>
                            </div>
                        </div>
                        <footer className="w3-padding-16 w3-light-gray w3-center">
                            <p className='fw-bold'>Esta acción no se puede deshacer</p>
                        </footer>
                    </form>
                }
            </div>
        </div>
    )
}