import Cart from "../components/Cart";
import { connect } from "react-redux";
import { addToCart } from "../service/action/Action";

const mapStateToProps = (state) => ({
  // data:state.cardItems
});
const mapDispatchToProps = (dispatch) => ({
  addToCartHandler: (data) => dispatch(addToCart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
