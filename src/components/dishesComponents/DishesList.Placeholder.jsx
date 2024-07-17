export function DishesListPlaceholder() {

    const dishesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    return(
        <div className="px-3 py-1 w3-white">
            <div className="w3-light-gray">
            { dishesArray.map( (darray, index) => (
                <div className="my-1 load-wraper" key={index} style={{ textAlign: 'left', borderBottom: '1px solid #ddd', height: 40}} >
                    <div className="loading"></div>
                </div>
            ) ) }
            </div>
        </div>
    )
}