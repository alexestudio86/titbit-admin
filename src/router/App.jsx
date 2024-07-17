import { createBrowserRouter } from "react-router-dom";
import { IsErrorView } from "../views/IsError.View";
import { GeneralLayout } from "../layouts/generalLayouts/General.Layout";
  import './app.css'
  import { IsHomeView } from "../views/IsHome.View";
    import {HomeLayout} from "../layouts/homeLayouts/Home.Layout"
  import { IsPageView } from "../views/IsPage.View";
    import {OrdersLayout} from "../layouts/ordersLayouts/Orders.Layout";
    import { DishesLayout } from "../layouts/dishesLayouts/Dishes.Layout";


export const App = createBrowserRouter([
  {
    element:      <GeneralLayout />,
    errorElement: (<GeneralLayout><IsErrorView /></GeneralLayout>),
    children: [
      {
        index:        true,
        element:      (
          <IsHomeView>
            <HomeLayout />
          </IsHomeView>
        ),
        path:         '/'
      },{
        element:      <IsPageView />,
        path:         '',
        children:     [
          {
            element:    <OrdersLayout />,
            path:       'ordenes'
          },{
            element:    <DishesLayout />,
            path:       'platillos',
          }
        ]
      }
    ]
  }
])