// import React, { Component } from "react";
// import StripeCheckout from "react-stripe-checkout";
// import axios from "axios";

// class AddPaymentPlan extends Component {
//   state = {
//     product: {
//       productQty: 1
//     }
//   };
//   handleChange = e => {
//     const product = { ...this.state.product };
//     product[e.target.name] = e.target.value;
//     this.setState({
//       product
//     });
//     console.log(this.state.product);
//   };
//   handleToken = async e => {
//     const product = { ...this.state.product };
//     await axios.post("http://localhost:4000/api/payment-plans/", product);
//   };
//   render() {
//     return (
//       <React.Fragment>
//         <h1>Add Plan</h1>
//         <h4>Store Fee: $50</h4>
//         <h4>One Product Fee: $10</h4>

//         <form onSubmit={this.handleToken}>
//           <div className="form-group">
//             <label htmlFor="exampleInputEmail1" className="text-dark">
//               Number od Products:
//             </label>
//             <input
//               min="1"
//               type="number"
//               className="form-control"
//               name="productQty"
//               placeholder="Enter number of Products"
//               onChange={this.handleChange}
//               value={this.state.product.productQty}
//             />
//           </div>
//           <div className="row">
//             <div className="col-md-12">
//               <p></p>Total amount: ${this.state.product.productQty * 10 + 50}
//             </div>
//           </div>
//         </form>
//         <StripeCheckout
//           stripeKey="pk_test_n6xOTv03wFH9y3OEIBUM2Pl100yMQXklX0"
//           token={this.handleToken}
//           amount={(this.state.product.productQty * 10 + 50) * 100}
//         />
//       </React.Fragment>
//     );
//   }
// }

// export default AddPaymentPlan;
