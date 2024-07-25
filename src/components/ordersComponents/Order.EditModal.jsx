import { Fragment, useEffect } from "react";
import { useOrdersContext } from "../../context/DataProvider";


export function OrderEditModal( {modal, setModal} ) {

  const {order, setOrder, getOrder, updateOrder} = useOrdersContext();

  const statusDefine = ( status ) => {
    switch (status) {
      case 'trabajando':
        return <option value="trabajando" defaultValue >tTrabajando</option>
        break;
      case 'entregado':
        return <option value="entregado" defaultValue >Entregado</option>
      default:
        break;
    }
  };

  const editItem = ( idx, value ) => {
    setOrder({...order, details: order.details.map( (detail, index) => (
      index === idx ? value : detail
    ))});
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

  const timeTranslate = ( evt ) => {
    try{
      return evt.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }catch{
      return evt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  };

  const saveChanges = () => {
    setOrder({...order, loading:true, timestamp: {...order.timestamp, modified: new Date()}});
    if (order.guestName.length <= 3) {
      setOrder({...order, tooltip:true});
    }else{
      const excluded  = ['tooltip', 'loading', 'changed'];
      const filtered  = Object.keys(order).filter(key => !excluded.includes(key));
      const reduced   = filtered.reduce((obj, key) => {
        return {
          ...obj,
          [key]: order[key]
        };
      }, {});
      updateOrder(reduced);
    }
  };

  useEffect( () => {
    getOrder(modal.orderId);
  }, []);

  useEffect( () => {
    order.changed &&
    setTimeout( () => {
      setOrder({
        tooltip:        false,
        loading:        false,
        changed:        false,
      });
      setModal({
        dishId:   null,
        type:     null,
      });
    }, 600);
  },[order.changed]);

  return (
    <div className={"w3-modal w3-show"} id="editModal">
      <div className="w3-modal-content w3-animate-top">
        {
        order.loading
          ?
            <div className="w3-padding-64" style={ {display:'grid', placeItems: 'center', position: 'relative', overflow: 'hidden'}}>
              <div className="loader"></div>
            </div>
          :
            order.changed
              ?
              <div className="w3-padding-64" style={ {display:'grid', placeItems: 'center', position: 'relative', overflow: 'hidden'}}>
                <span>Producto Actualizado correctamente</span>
              </div>
              :
              <form onSubmit={ e => e.preventDefault() }>
                <header className="w3-container w3-light-gray w3-row py-3">
                  <div className="w3-col m10 s8">
                    {
                      order.tooltip
                      &&
                      <div className="tooltip">
                        <span className="tooltiptext px-1 w3-white w3-text-red" id='dishName'>Escriba un nombre válido</span>
                      </div>
                    }
                    <div>
                      <label htmlFor="guest">Cliente</label>
                    </div>
                    <input
                      id="guest"
                      className="w3-input w3-border"
                      type="text"
                      placeholder="ej. Hamburguesa Sencilla"
                      value={order.guestName}
                      onChange={(e) =>
                        setOrder({
                          ...order,
                          guestName: e.target.value,
                          tooltip: false,
                        })
                      }
                    />
                  </div>
                  <div className="w3-col m2 s4">
                    <div className="w3-row">
                      <div className="w3-col m12 w3-right-align">
                        {/* PROGRAMADO */}
                        <label htmlFor='programado'>Programado</label>
                      </div>
                      <div className='w3-col m10 s9 px-2'>
                        <input
                          className={`w3-input w3-border ${order.schedule && !order.schedule.collect ? 'w3-disabled' : ''}`}
                          type="time"
                          value={ order.schedule && timeTranslate(order.schedule.time) }
                          onChange={ e => (order.schedule && setOrder( {...order, schedule:{...order.schedule, time: new Date ( new Date( new Date().setHours( parseInt(e.target.value.split(':')[0]) ) ).setMinutes( parseInt(e.target.value.split(':')[1]) ) ) }} )) }
                        />
                      </div>
                      <div className="w3-col m2 s3 w3-right-align">
                        <input
                          className="w3-check"
                          type="checkbox"
                          id="programado"
                          checked={order.schedule && order.schedule.collect}
                          onChange={ () => (order.schedule && setOrder( {...order, schedule: {...order.schedule, collect:!order.schedule.collect}} ) ) }
                        />
                      </div>
                    </div>
                  </div>
                </header>
                <div className="w3-container w3-padding-32 w3-row">
                  <div className="w3-col m12 w3-padding-small">
                    <span>Detalles</span>
                    <div className="w3-row w3-light-gray p-1">
                      { 
                        !order.details
                        ?//No hay Detalles
                          <>
                            <div className="w3-col m11">
                              <input
                                className="w3-white w3-input w3-border w3-disabled"
                                disabled
                                type="text"
                              />
                            </div>
                            <div className="w3-col m1">
                              <button
                                className="w3-btn w3-text-red w-100 w3-disabled"
                                disabled
                                type="button"
                              >
                                <i className="fas fa-times fa-2x"></i>
                              </button>
                            </div>
                          </>
                        ://Si hay detalles
                          <div className="w3-col m12 w3-white">
                            {
                            order.details.map( (detail, index) =>
                              (
                                order.details.length < 2
                                ?//1 Producto
                                  detail.variants.length < 2
                                  ?//1 Product - One Variant
                                    detail.variants[0].name === ''
                                    ?//Empty
                                    <Fragment key={index}>
                                      <h1 className="w3-col m11 w3-large text-uppercase fw-bold p-1">{detail.product}</h1>
                                      <div className="w3-col m1">
                                        <div className="w3-row" style={{display: "flex",justifyContent: "space-between",}}>
                                          <div className="w3-col s12">
                                            <input
                                              className="w3-input w3-border"
                                              min="1"
                                              max="50"
                                              step="1"
                                              type="number"
                                              value={detail.variants[0].quantity}
                                              onChange={ e => {
                                                setOrder({...order, details:[ {...order.details[0], variants:[{...order.details[0].variants[0], quantity:parseInt(e.target.value)}]} ]})
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </Fragment>
                                    ://Not Empty
                                    <Fragment key={index}>
                                      <h1 className="w3-col m12 w3-large text-uppercase fw-bold p-1">{detail.product}</h1>
                                      <div className="w3-col m12 w3-border-top py-1">
                                        <div className="w3-row">
                                          <h2 className="w3-col m10 w3-medium p-1">{detail.variants[0].name}</h2>
                                          <div className="w3-col m2">
                                            <div className="w3-row" style={{display: "flex",justifyContent: "space-between",}}>
                                              <div className="w3-col m8 s10">
                                                <input
                                                  className="w3-input w3-border"
                                                  min="1"
                                                  max="50"
                                                  step="1"
                                                  type="number"
                                                  value={detail.variants[0].quantity}
                                                  onChange={ e => {
                                                    setOrder({...order, details:[ {...order.details[0], variants:[{...order.details[0].variants[0], quantity:parseInt(e.target.value)}]} ]})
                                                  }}
                                                />
                                              </div>
                                              <div className="w3-col m4 s2 w3-right-align">
                                                <button
                                                  className="w3-button p-1"
                                                  type="button"
                                                  onClick={ () => {
                                                    setOrder({...order, details:order.details.map( (det,ind) => ( ind === index ? {...det, variants:[{name:'', quantity:1, price:0}] } : det ) ) });
                                                  }}
                                                >
                                                  <i className="fa-regular fa-square-minus fa-2x w3-text-light-gray"></i>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Fragment>
                                  ://1 Product - Many variants
                                    <Fragment key={index}>
                                      <h1 className="w3-col m12 w3-large text-uppercase fw-bold p-1">{detail.product}</h1>
                                      {
                                        detail.variants.map( (vrt, idx) => (
                                          vrt.name !== ''
                                          &&
                                          <div className="w3-col m12 w3-border-top py-1" key={idx}>
                                            <div className="w3-row">
                                              <h2 className="w3-col m10 w3-medium p-1">{vrt.name}</h2>
                                              <div className="w3-rest">
                                                <div className="w3-row" style={{display: "flex",justifyContent: "space-between",}}>
                                                  <div className="w3-twothird">
                                                    <input
                                                      className="w3-input w3-border"
                                                      min="1"
                                                      max="9"
                                                      step="1"
                                                      value={vrt.quantity}
                                                      type="number"
                                                    />
                                                  </div>
                                                  <div className="w3-third w3-right-align">
                                                    <button
                                                      className="w3-button p-1"
                                                      type="button"
                                                      onClick={ () => {
                                                        setOrder({ ...order, details:order.details.map( d => ({...d, variants:d.variants.filter( (v,i) => i !== idx )}) ) });
                                                      }}
                                                    >
                                                      <i className="fa-regular fa-square-minus fa-2x w3-text-light-gray"></i>
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ) )
                                      }
                                    </Fragment>
                                ://Many Products
                                  <div className="w3-row w3-light-gray py-1" key={index}>
                                    <div className="w3-col m12 w3-white">
                                      <div className="w3-row">
                                        {
                                        detail.variants.length < 2
                                        ?//Many Products - One Variant
                                          detail.variants[0].name === ''
                                          ?//Empty
                                          <Fragment>
                                            <h1 className="w3-col m10 w3-large text-uppercase fw-bold p-1">{detail.product}</h1>
                                            <div className="w3-col m2">
                                              <div className="w3-row" style={{display: "flex",justifyContent: "space-between",}}>
                                                <div className="w3-col m8 s10">
                                                  <input
                                                    className="w3-input w3-border"
                                                    min="1"
                                                    max="50"
                                                    step="1"
                                                    type="number"
                                                    value={detail.variants[0].quantity}
                                                    onChange={ e => {
                                                      setOrder({...order, details:order.details.map( (det,ind) => (ind === index ? {...det, variants:[{...det.variants[0], quantity: parseInt(e.target.value)}]} : det) )});
                                                    }}
                                                  />
                                                </div>
                                                <div className="w3-col m4 s2 w3-right-align">
                                                  <button
                                                    className="w3-button p-1"
                                                    type="button"
                                                    onClick={ () => {
                                                      setOrder({...order, details:order.details.filter( (d,i) => i !== index)})
                                                    }}
                                                  >
                                                    <i className="fa-regular fa-circle-xmark fa-2x w3-text-light-gray"></i>
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </Fragment>
                                          ://No empty
                                          <Fragment>
                                            <h1 className="w3-col m11 s10 w3-large text-uppercase fw-bold p-1">{detail.product}</h1>
                                            <div className="w3-col m1 s2 w3-right">
                                              <button
                                                className="w3-button p-1"
                                                type="button"
                                                onClick={ () => {
                                                  setOrder({...order, details:order.details.filter( (d,i) => i !== index)});
                                                }}
                                              >
                                                <i className="fa-regular fa-circle-xmark fa-2x w3-text-light-gray"></i>
                                              </button>
                                            </div>
                                            <div className="w3-col m12 w3-border-top py-1">
                                              <div className="w3-row">
                                                <h2 className="w3-col m10 w3-medium p-1">{detail.variants[0].name}</h2>
                                                <div className="w3-col m2">
                                                  <div className="w3-row" style={{display: "flex",justifyContent: "space-between",}}>
                                                    <div className="w3-col m8 s10">
                                                      <input
                                                        className="w3-input w3-border"
                                                        min="1"
                                                        max="50"
                                                        step="1"
                                                        value={detail.variants[0].quantity}
                                                        type="number"
                                                        onChange={ e => {
                                                          setOrder({...order, details:order.details.map( (det,ind) => ( ind === index ? {...det, variants:det.variants.map( (v,i) => (v.name !== '' ? {...v, quantity:parseInt(e.target.value)} : v) )} : det ) ) });
                                                        }}
                                                      />
                                                    </div>
                                                    <div className="w3-col m4 s2 w3-right-align">
                                                      <button
                                                        className="w3-button p-1"
                                                        type="button"
                                                        onClick={ () => {
                                                          setOrder({...order, details:order.details.map( (det,ind) => ( ind === index ? {...det, variants:[{name:'', quantity:1, price:0}]} : det ) ) });
                                                        }}
                                                      >
                                                        <i className="fa-regular fa-square-minus fa-2x w3-text-light-gray"></i>
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </Fragment>
                                        ://Many Products - Many Variants
                                          <Fragment>
                                            <h1 className="w3-col m11 s10 w3-large text-uppercase fw-bold p-1">{detail.product}</h1>
                                            <div className="w3-col m1 s2 w3-right">
                                              <button
                                                className="w3-button p-1"
                                                type="button"
                                                onClick={ () => {
                                                  setOrder({...order, details:order.details.filter( (d,i) => i !== index )});
                                                }}
                                              >
                                                <i className="fa-regular fa-circle-xmark fa-2x w3-text-light-gray"></i>
                                              </button>
                                            </div>
                                            {
                                              detail.variants.map( (vrt, idx) => (
                                                vrt.name !== ''
                                                &&
                                                <div className="w3-col m12 w3-border-top py-1" key={idx}>
                                                  <div className="w3-row">
                                                    <h2 className="w3-col m10 w3-medium p-1">{vrt.name}</h2>
                                                    <div className="w3-col m2">
                                                      <div className="w3-row" style={{display: "flex",justifyContent: "space-between",}}>
                                                        <div className="w3-col m8 s10">
                                                          <input
                                                            className="w3-input w3-border"
                                                            min="1"
                                                            max="50"
                                                            step="1"
                                                            value={vrt.quantity}
                                                            onChange={ e => {
                                                              setOrder({ ...order, details:order.details.map( (det,ind) => ( ind === index ? {...det, variants:det.variants.map( (v,i) => (i === idx ? {...v, quantity:parseInt(e.target.value)} : v ) )} : det ) ) });
                                                            } }
                                                            type="number"
                                                          />
                                                        </div>
                                                        <div className="w3-col m4 s2 w3-right-align">
                                                          <button
                                                            className="w3-button p-1"
                                                            type="button"
                                                            onClick={ () => {
                                                              setOrder({ ...order, details:order.details.map( (det, ind) => ( ind === index ? {...det, variants:det.variants.filter( (v,i) => i !== idx)} : det ) ) });
                                                            }}
                                                          >
                                                            <i className="fa-regular fa-square-minus fa-2x w3-text-light-gray"></i>
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              ) )
                                            }
                                          </Fragment>
                                        }
                                      </div>
                                    </div>
                                  </div>
                                )
                              )
                            }
                          </div>
                      }
                    </div>
                  </div>
                  <div className="-w3-col m12">
                    <div className="w3-row">
                      {/* Comentarios */}
                      <div className="w3-col m8 w3-padding-small">
                        <label htmlFor="comment">Comentarios</label>
                        <textarea
                          className="w3-input w3-border"
                          value={order.comments}
                          id="comment"
                          onChange={ e => {
                            setOrder({...order, comments:e.target.value})
                          }}
                        ></textarea>
                      </div>
                      <div className="w3-col m4">
                        <div className="w3-row">
                          {/* Status */}
                          <div className="w3-col m8 s10 w3-padding-small">
                            <span className="w3-disabled" disabled>
                              Estatus
                            </span>
                            <select
                              className="w3-select w3-border w3-disabled"
                              name="option"
                              disabled
                            >
                              {order.status &&
                                Object.entries(order.status).map(
                                  ([k, v], i) =>
                                    v && <option key={i}>{statusTranslate(k)}</option>
                                )}
                            </select>
                          </div>
                          {/* Factura */}
                          <div className="w3-col m4 s2 w3-padding-small">
                            <div className="w3-right-align">
                              <label className="w3-disabled" htmlFor="invoice">
                                Factura
                              </label>
                            </div>
                            <div className="w3-right-align">
                              {/* Invoice */}
                              <input
                                id="invoice"
                                className="w3-check"
                                type="checkbox"
                                checked={order.invoice}
                                onChange={ e => setOrder({...order, invoice:!order.invoice}) }
                              />
                            </div>
                          </div>
                        </div>
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
                        setOrder([]);
                        setModal({ orderId: null, type: null });
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                  <div className="w3-col s6 w3-center">
                    {/* Target send like $event only when more of 1 function is setted */}
                    <button
                      className={"w3-button w3-white w3-border w3-border-green " + (!order && "w3-disabled")}
                      disabled={!order ? true : false}
                      data-ident="editModal"
                      type="submit"
                      onClick={ saveChanges }
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