export function OrdersListPlaceholder () {

    const articles = [1, 2, 3, 4, 5];

    return (
        <>
            <div className="w3-row my-3" style={{display: 'flex', justifyContent: 'flex-end'}}>
                <div className="w3-col m4">
                    <div className="load-wraper" style={{height: 20}}>
                        <div className="loading"></div>
                    </div>
                </div>
            </div>
            {
                articles.map( (art, idx) => (
                    <article className="w3-white mb-3 px-3 py-1" key={idx} >
                        <div className="w3-row">
                            <div className="w3-col m2" style={{display: 'flex', justifyContent: 'center'}}>
                                <div className="w3-col m11">
                                    {/* Image */}
                                    <div className="load-wraper" style={{height: 70}}>
                                        <div className="loading"></div>
                                    </div>
                                    {/* Estado */}
                                    <div className="load-wraper my-1" style={{height: 10}}>
                                        <div className="loading"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="w3-col m6" style={{display: 'flex', justifyContent: 'center'}}>
                                <div className="w3-col m11">
                                    {/* Title */}
                                    <div className="load-wraper" style={{height: 20}}>
                                        <div className="loading"></div>
                                    </div>
                                    {/* Details */}
                                    <div className="load-wraper my-1" style={{height: 60}}>
                                        <div className="loading" style={{height: 80}}></div>
                                    </div>
                                    {/* Comments */}
                                    <div className="load-wraper my-1" style={{height: 20}}>
                                        <div className="loading" style={{height: 40}}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="w3-col m2" style={{display: 'flex', justifyContent: 'center'}}>
                                <div className="w3-col m11">
                                    {/* Invoice Button */}
                                    <div className="load-wraper" style={{height: 20}}>
                                        <div className="loading" ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="w3-col m2" style={{display: 'flex', justifyContent: 'center'}}>
                                <div className="w3-col m11">
                                    <div className="w3-row">
                                        <div className="w3-half">
                                            {/* Delete Button */}
                                            <div className="load-wraper w3-col m11" style={{height: 40}}>
                                                <div className="loading" ></div>
                                            </div>
                                        </div>
                                        <div className="w3-half">
                                            {/* Edit Button */}
                                            <div className="load-wraper w3-col m11" style={{height: 40}}>
                                                <div className="loading" ></div>
                                            </div>                    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                ))
            }
        </>
    )
}