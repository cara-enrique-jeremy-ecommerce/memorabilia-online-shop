import React from 'react'
import {connect} from 'react-redux'
import {fetchCompletedOrders} from '../store/orders'
import {priceWithCommas} from './SingleProductSnapshot'

class OrderHistory extends React.Component {
  componentDidMount() {
    console.log(this.props)
    this.props.fetchCompletedOrders(this.props.user.id)
  }
  render() {
    return (
      <div className="order-history container">
        <h2>Your orders</h2>
        {this.props.orders.length &&
          this.props.orders.map(order => {
            return (
              <div key={order.id} className="completed-order">
                <div className="order-header">
                  <p>Placed on {order.createdAt.slice(0, 10)}</p>
                  <p>ORDER # 10000{order.id}</p>
                </div>
                <div className="completed-order-items">
                  {order.orderitems.map(orderitem => {
                    return (
                      <div className="completed-order-item" key={orderitem.id}>
                        <div className="completed-order-item-image">
                          <img src={orderitem.product.image} />
                        </div>
                        <div className="completed-order-item-details">
                          <p className="order-item-name">
                            {orderitem.product.name}
                          </p>
                          <p>Qty: {orderitem.quantity}</p>
                          <p>${priceWithCommas(orderitem.currentPrice)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <p className="completed-order-total">
                  Total: ${priceWithCommas(order.total.toFixed(2))}
                </p>
                {/* <div></div> */}
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  orders: state.orders
})

const mapDispatchToProps = dispatch => ({
  fetchCompletedOrders: id => dispatch(fetchCompletedOrders(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
