import { Fragment } from "react";
import { useOrdersContext } from "../../context/DataProvider";

export function OrdersListEditor ({setModal}) {

    const {orders} = useOrdersContext();

    const dateConvertion = ( ) => {
        return new Date().toDateString();
    };

    const timeConvertion = ( evt ) => {
        return evt.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const statusTranslate = ( evt ) => {
        switch (evt) {
            case 'delay':
                return 'Retrasado'
                break;
            case 'delivered':
                return 'Entregado'
                break;
            case 'working':
                return 'Trabajando'
                break;
            default:
                return 'S/S'
                break;
        }
    };

    return (
        <>
            <div className="w3-row w3-padding">
                <div className="w3-col m6 w3-left">
                    <span className="w3-medium">{dateConvertion()}</span>
                </div>
                <h3 className="w3-col m6 w3-right-align w3-large text-uppercase">Registros Totales: {orders.length}</h3>
            </div>
            { 
                orders.map( (order, index) => (
                    <article key={index} className="w3-white mb-3 px-3 py-1">
                        <div className="w3-row">
                            <div className="w3-col s3">
                                {/* Image */}
                                <img className="w-100" src="/logo-titbit_grayscale.webp" alt="Logo Titbit escala de grises" width="70" height='auto' style={ {height: 70, objectFit: 'cover', objectPosition: 'center', padding: '8 0'}} />
                                {/* Entrega */}
                                {order.schedule.collect
                                &&
                                <div className="w3-center w3-padding" title='Hora de entrega' >
                                    <span className="w3-padding-small">
                                        <small><i>{ timeConvertion(order.schedule.time) }</i></small>
                                    </span>
                                    <i className="fa-solid fa-truck w3-medium"></i>
                                </div>
                                }
                            </div>
                            <div className="w3-col s9">
                                <div className="w3-row">
                                    <div className="w3-col m9">
                                        <div className="w3-row">
                                            <div className="w3-col s8">
                                                <h1 className="w3-large">{order.guestName}</h1>
                                            </div>
                                            <div className="w3-col s4 w3-center" v-if='order.delivered'>
                                                { Object.entries(order.status).map( ([key, value], idx) => (
                                                    value &&
                                                        <div key={idx} >
                                                            <small><b>{statusTranslate(key)}</b></small>
                                                        </div>
                                                    ) )
                                                }
                                            </div>
                                        </div>
                                        {/* Details */}
                                        { order.details.map( (detail, index) => (
                                            <div className="py-1" key={index}>
                                                { detail.variants.map( (d, i) => (
                                                    <div className="w3-small" key={i}>
                                                        {`${detail.product}${d.name && ', '+d.name} x ${d.quantity}`}
                                                    </div>
                                                ) )}
                                            </div>
                                        ))}
                                        { order.comments.length > 0 && 
                                            <div className="py-2">
                                                <p className="w3-panel w3-light-gray py-2 w3-small" style={{margin:0}}>{order.comments}</p>
                                            </div>
                                        }
                                    </div>
                                    <div className="w3-col m3">
                                        <div className="w3-right-align">
                                            <button
                                                className="w3-button w3-white w3-border w3-border-red w3-round mx-1"
                                                data-ident='deleteModal'
                                                onClick={ () => {
                                                    setModal(
                                                        {
                                                            orderId:    order.id,
                                                            type:       'delete'
                                                        }
                                                    )
                                                }}
                                            >
                                                <i className="fas fa-trash text-danger w3-large"></i>
                                            </button>
                                            <button
                                                className="w3-button w3-white w3-border w3-border-blue w3-round mx-1"
                                                data-ident='editModal'
                                                onClick={ () => {
                                                    setModal(
                                                        {
                                                            orderId:    order.id,
                                                            type:       'edit'
                                                        }
                                                    );
                                                }}
                                            >
                                                <i className="fas fa-edit text-primary w3-large"></i>
                                            </button>
                                        </div>
                                        {/* Invoice */}
                                        {order.invoice &&
                                            <div className="w3-right-align py-2">
                                                <span className="w3-tag w3-gray w3-text-white w3-round p-1">Factura</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                ) )
            }

        </>
    );

}