import './ordersCreatorPlaceholder.css';


export function OrdersCreatorPlaceholder () {
    return (
        <div className='w3-white p-3'>
            {/* Order Elements */}
            <div className='w3-row'>
                    <div className='w3-col s2'>
                        <div className='load-wraper' style={{height: 20}}>
                            <div className='loading'>
                            </div>
                        </div>
                    </div>
            </div>
            <div className='w3-row'>
                    <div className="w3-col s12">
                        {/* Select list */}
                        <div className="load-wraper my-1" style={{height: 40}}>
                            <div className="loading"></div>
                        </div>
                    </div>
            </div>
            <div className="w3-row">
                    <div className="w3-col s8">
                        <div className='w3-col s11'>
                            <div className="load-wraper my-1" style={{height: 40}}>
                                <div className="loading"></div>
                            </div>
                        </div>
                    </div>
                    <div className='w3-col s4' style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <div className='w3-col s11'>
                            <div className="load-wraper my-1" style={{height: 40}}>
                                <div className="loading"></div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="w3-row my-3">
                    <div className="w3-col s12">
                        <div className="load-wraper" style={{height: 40}}>
                            <div className="loading"></div>
                        </div>
                    </div>
            </div>
            <div className="w3-row">
                    <div className="w3-col s6">
                        <div className="load-wraper w3-col s6" style={{height: 20}}>
                            <div className="loading"></div>
                        </div>
                    </div>
                    <div className="w3-col s6" style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <div className="load-wraper w3-col s4" style={{height: 20}}>
                            <div className="loading"></div>
                        </div>
                    </div>
            </div>
            <div className='w3-row my-2'>
                    <div className="w3-col s10">
                        <div className='w3-col s11'>
                            <div className='load-wraper' style={{height: 70}}>
                                <div className="loading"></div>
                            </div>
                        </div>
                    </div>
                    <div className='w3-col s2' style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <div className='w3-col s6 load-wraper' style={{height: 30}}>
                            <div className="loading"></div>
                        </div>
                    </div>
            </div>
            <div className='my-3'>
                    <div className="w3-row my-1">
                        <div className='w3-col s4'>
                            <div className="w3-col s7 load-wraper" style={{height: 20}}>
                                <div className='loading'></div>
                            </div>
                        </div>
                        <div className='w3-col s8'>
                            <div className="w3-col s3 load-wraper" style={{height: 20}}>
                                <div className='loading'></div>
                            </div>
                        </div>
                    </div>
                    <div className="w3-row my-2">
                        <div className="w3-col s4">
                            <div className="w3-col s3 load-wraper" style={{height: 30}}>
                                <div className='loading'></div>
                            </div>
                        </div>
                        <div className="w3-col s8">
                            <div className="w3-col s12 load-wraper" style={{height: 40}}>
                                <div className='loading'></div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className='my-1'>
                    <div className="w3-row my-2">
                        <div className="w3-col s2 load-wraper" style={{height: 20}}>
                            <div className='loading'></div>
                        </div>
                    </div>
                    <div className="w3-row my-2">
                        <div className="w3-col s12 load-wraper" style={{height: 40}}>
                            <div className='loading'></div>
                        </div>
                    </div>
            </div>
            <div className="w3-row my-4">
                    <div className="w3-col s12">
                        <div className="w3-col s12 load-wraper" style={{height: 40}}>
                            <div className='loading'></div>
                        </div>
                    </div>
            </div>
        </div>
    )
}