import { Fragment } from "react";
import { useDishesContext } from "../../context/DataProvider";


export const DishesListEditor = ({setModal}) => {

    const {dishes} = useDishesContext();

    return (
      <>
        <div className="w3-row w3-padding">
          <h3 className="w3-col m12 w3-right-align w3-large text-uppercase">
            Registros Totales: {dishes.length}
          </h3>
        </div>
        {dishes.map((dish, index) => (
          <article key={index} className="w3-row w3-white mb-3 px-3 py-1">
            <div className="w3-col m10">
              {/* Summary */}
              <details>
                <summary className="w3-button w3-block w3-small w3-light-gray w3-left-align text-uppercase">{dish.productName} {dish.variants.length > 0 && `[${dish.variants.length}]`}</summary>
                {dish.variants.length > 0
                &&
                <div className="py-2">
                  <div className="w3-light-gray w3-padding w3-small">
                    {
                    dish.variants.map((d, i) => (
                      <Fragment key={i}>
                        <p >{d.name}</p>
                      </Fragment>
                    ))
                    }
                  </div>
                </div>
                }
              </details>
            </div>
            <div className="w3-rest">
              <div className="w3-right-align">
                <button
                  type="button"
                  className="w3-button w3-white w3-text-red mx-1 w3-padding-small"
                  data-ident="deleteModal"
                  onClick={ () => {
                    setModal({
                      dishId:   dish.id,
                      type:     'delete'
                    });
                  }}
                >
                  <i className="fas fa-trash text-danger w3-large"></i>
                </button>
                <button
                  type="button"
                  className="w3-button w3-white w3-text-blue mx-1 w3-padding-small"
                  data-ident="editModal"
                  onClick={() => {
                    setModal({
                      dishId:   dish.id,
                      type:     'edit',
                    });
                  }}
                >
                  <i className="fas fa-edit text-primary w3-large"></i>
                </button>
              </div>
            </div>
          </article>
        ))}
      </>
    );
}