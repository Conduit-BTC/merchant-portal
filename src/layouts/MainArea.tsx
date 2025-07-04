import { Route, Switch } from 'wouter'
import ProductsLayout from './products/ProductsLayout'
import ProductCreateLayout from './products/ProductCreateLayout'
import RelayPoolsLayout from './store/RelayPoolsLayout'
import ShippingOptionsLayout from './store/shipping/ShippingOptionsLayout'
import ProductEditorLayout from './products/ProductEditorLayout'
import StoreProfileLayout from './store/StoreProfileLayout'
import StoreProfileEditLayout from './store/StoreProfileEditLayout'
import CheckoutSettingsLayout from './store/CheckoutSettingsLayout'
import CompletedOrdersLayout from './orders/CompletedOrdersLayout'
import PendingOrdersLayout from './orders/PendingOrdersLayout'
import FailedOrdersLayout from './orders/FailedOrdersLayout'
import CancelledOrdersLayout from './orders/CancelledOrdersLayout'
import CreateNewOrderLayout from './orders/CreateNewOrderLayout'
import StyleGuidePage from '@/layouts/StyleGuide'

import NotFoundPage from './NotFoundPage'

const MainArea = () => {
  return (
    <>
      <Switch>
        <Route path="/store" nest>
          <Route path="/" component={StoreProfileLayout} />
          <Route path="/relays" component={RelayPoolsLayout} />
          <Route path="/shipping" component={ShippingOptionsLayout} />
          <Route path="/checkout" component={CheckoutSettingsLayout} />
          <Route path="/store" component={StoreProfileLayout} />
          <Route path="/store/edit" component={StoreProfileEditLayout} />
        </Route>
        <Route path="/products/create" component={ProductCreateLayout} />
        <Route path="/products/edit/:id" component={ProductEditorLayout} />
        <Route path="/products" component={ProductsLayout} />
        <Route path="/orders" nest>
          <Route path="/completed" component={CompletedOrdersLayout} />
          <Route path="/pending" component={PendingOrdersLayout} />
          <Route path="/failed" component={FailedOrdersLayout} />
          <Route path="/cancelled" component={CancelledOrdersLayout} />
          <Route path="/create" component={CreateNewOrderLayout} />
        </Route>
        <Route path="/style-guide" component={StyleGuidePage} />
        <Route path="/:rest*">
          <WrappedNotFoundPage />
        </Route>
      </Switch>
    </>
  )
}
//fixme temporary solution till routes are better managed
const WrappedNotFoundPage = () => {
  return (
    <div className="fixed inset-0 overflow-hidden bg-paper z-999">
      <NotFoundPage />
    </div>
  )
}

export default MainArea
