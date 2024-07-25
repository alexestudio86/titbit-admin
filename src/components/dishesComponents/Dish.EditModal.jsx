import { useDishesContext } from "../../context/DataProvider";
import { useEffect } from "react";


export const DishEditModal = ( {modal, setModal} ) => {

    const {dish, setDish, getDish, updateDish} = useDishesContext();

    const editItem = ( event, index ) => {
        setDish({...dish, variants: dish.variants.map( (variant, idx) => (
            idx === index ? {name: event, price:0} : variant
        ))});
    };

    const removeVariant = ( idx ) => {
        setDish({...dish, variants: dish.variants.filter( (v, i) => i !== idx )});
    };

    const addVariant = () => {
        setDish({...dish, variants: [...dish.variants, {name:'', price:0}]});
    };

    const saveChanges = () => {
        setDish({...dish, loading:true});
        if (dish.productName.length <= 3) {
            setDish({...dish, tooltip:true});
        }else{
            const cleanDish = {...dish, variants: [...dish.variants.filter( v => v.name !== '' )] };
            const excluded  = ['tooltip', 'loading', 'changed'];
            const filtered  = Object.keys(cleanDish).filter(key => !excluded.includes(key));
            const reduced   = filtered.reduce((obj, key) => {
                return {
                    ...obj,
                    [key]: cleanDish[key]
                };
            }, {});
            updateDish(reduced);
        }
    };

    useEffect( () => {
        getDish(modal.dishId)
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
        }, 600);
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
                    <span>Producto Actualizado correctamente</span>
                </div>
                :
                <form onSubmit={ e => e.preventDefault() } >
                    <header className="w3-container w3-light-gray w3-row py-3">
                        <div className="w3-col m12">
                            {
                            dish.tooltip
                            &&
                            <div className="tooltip">
                                <span className="tooltiptext px-1 w3-white w3-text-red" id='dishName'>Escriba un nombre válido</span>
                            </div>
                            }
                            <input
                                className="w3-input w3-border"
                                type="text"
                                placeholder="ej. Hamburguesa Sencilla"
                                value={dish.productName}
                                onChange={(e) => 
                                    setDish({ ...dish, productName: e.target.value, tooltip:false })
                                }
                            />
                        </div>
                    </header>
                    <div className="w3-container w3-padding-32 w3-row" >
                        <div className="w3-col s12 w3-padding-small">
                        <span>Detalles</span>
                        <div className="w3-light-gray w3-padding">
                            <div className="w3-row w3-padding-small">
                                {dish.variants &&
                                    dish.variants.map((variant, index) => (
                                    <div key={index} className="w3-row my-1">
                                        {/* Variant Name */}
                                        <div className="w3-col m11 s10">
                                            <input
                                                className="w3-input w3-border"
                                                type="text"
                                                placeholder="ej. Pollo"
                                                value={variant.name}
                                                onChange={(event) =>
                                                editItem(event.target.value, index)
                                                }
                                            />
                                        </div>
                                        {/* Remove Variant */}
                                        <div className="w3-col m1 s2">
                                            <button
                                                className="w3-button w3-block"
                                                style={{padding: '2px 0'}}
                                                type="button"
                                                onClick={ e => removeVariant(index) }
                                            >
                                                <i className="far fa-times-circle w3-xxlarge w3-text-red"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {/* Add Variant */}
                                <button
                                    className={"w3-button w3-white w3-padding w3-center"}
                                    type="button"
                                    style={{
                                    border: "1 solid",
                                    borderColor: "#9e9e9e",
                                    borderStyle: "dashed",
                                    width: "100%",
                                    }}
                                    onClick={ addVariant}
                                >
                                    <i className="fas fa-plus-circle fa-2x"></i>
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <footer className="w3-padding-16 w3-light-gray w3-center w3-row">
                        <div className="w3-col s6 w3-center">
                            {/* Cancel */}
                            <button
                                className={"w3-button w3-white w3-border w3-border-red"}
                                data-ident="editModal"
                                onClick={() => {
                                    setDish({});
                                    setModal({
                                        dishId: null,
                                        type: null
                                    });
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                        <div className="w3-col s6 w3-center">
                            {/* Save - Target send like $event only when more of 1 function is setted */}
                            <button
                                type="submit"
                                className={"w3-button w3-white w3-border w3-border-green"}
                                onClick={saveChanges}
                            >
                                Guardar
                            </button>
                        </div>
                    </footer>
                </form>
            }
        </div>
      </div>
    );
}