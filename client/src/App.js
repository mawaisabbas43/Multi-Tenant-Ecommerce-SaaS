import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./components/home";
import OnlineStore from "./components/onlineStore";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import LogoutForm from "./components/logoutForm";
import RegisterForm from "./components/registerForm";
import AppRoute from "./components/layouts/appRoutes";
import MainLayout from "./components/layouts/mainLayout";
import AdminDAshboard from "./components/layouts/adminDashoard";
import CreateStore from "./components/adminpanel/Store/createStore";
import Category from "./components/adminpanel/category/indexCategory";
import editStore from "./components/adminpanel/Store/editStore";
import IndexStore from "./components/adminpanel/Store/indexStore";
import ParentCategory from "./components/adminpanel/category/parentCategory";
import SubCategory from "./components/adminpanel/category/subCategory";
import EditCategory from "./components/adminpanel/category/editCategory";
import IndexAbout from "./components/adminpanel/aboutus/indexAbout";
import CreateAbout from "./components/adminpanel/aboutus/createAbout";
import CreateContact from "./components/adminpanel/contactus/createContactUs";
import Contact from "./components/adminpanel/contactus/indexContactUs";
import EditAbout from "./components/adminpanel/aboutus/editAbout";
import DynamicInput from "./components/adminpanel/contactus/dyynamic";
import StringArray from "./components/adminpanel/contactus/StringArray";
import EditContact from "./components/adminpanel/contactus/editContact";
import CreateProduct from "./components/adminpanel/product/createProduct";
import Product from "./components/adminpanel/product/indexProduct";
import AddPRoduct from "./components/adminpanel/product/addProduct";
import AddProductImage from "./components/adminpanel/product/addImage";
import ViewImage from "./components/adminpanel/product/viewImage";
import IndexFeedback from "./components/adminpanel/feedback/indexFeedback";
import StoreLogo from "./components/adminpanel/Logo/Logo";
import IndexLogo from "./components/adminpanel/Logo/indexLogo";
import StoreImage from "./components/adminpanel/Store/storeImage";
import IndexStoreImage from "./components/adminpanel/Store/indeStoreImage";
import AddPaypalCredentials from "./components/adminpanel/paymentMethods/Paypal/addPaypal";
import IndexPaypal from "./components/adminpanel/paymentMethods/Paypal/indexPaypal";
import EditPaypal from "./components/adminpanel/paymentMethods/Paypal/editPaypal";
import AddStripeCredentials from "./components/adminpanel/paymentMethods/Stripe/addStripe";
import IndexStripe from "./components/adminpanel/paymentMethods/Stripe/indexStripe";
import EditStripe from "./components/adminpanel/paymentMethods/Stripe/editStripe";
import AddCashOnDelivery from "./components/adminpanel/paymentMethods/CashOnDelivery/addCashOnDelivery";
import IndexOrder from "./components/adminpanel/orders/indexOrder";
import ViewOrder from "./components/adminpanel/orders/viewOrder";
import EditProduct from "./components/adminpanel/product/editProduct";
import "./App.css";
import EditOrderStatus from "./components/adminpanel/orders/editOrderStatus";
import IndexSuperAdmin from "./components/super-admin/StoreOwners/indexSuperAdmin";

import StoreList from "./components/super-admin/Stores/listStores";
import StoreDetailLink from "./components/super-admin/Stores/storeDetailLinks";
import StoreCategory from "./components/super-admin/Category/indexCategory";
import StoreFeedBack from "./components/super-admin/Feedback/indexFeedBack";
import StoreContactUs from "./components/super-admin/contactus/indexContactUs";
import StoreAbout from "./components/super-admin/aboutus/indexAbout";
import StoreProduct from "./components/super-admin/product/indexProduct";
import IndexPamentPlan from "./components/adminpanel/PymentPlan/indexPlan";
import AddPaymentPlan from "./components/adminpanel/PymentPlan/addPlan";
import EditProductCategory from "./components/adminpanel/product/editProductCategory";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <AppRoute
            path="/register"
            layout={MainLayout}
            component={RegisterForm}
          />
          <AppRoute path="/login" layout={MainLayout} component={LoginForm} />
          <AppRoute path="/logout" layout={MainLayout} component={LogoutForm} />

          <AppRoute path="/home" layout={MainLayout} component={Home} />

          <AppRoute
            path="/onlinestore"
            layout={MainLayout}
            component={OnlineStore}
          />

          <AppRoute
            path="/not-found"
            layout={MainLayout}
            component={NotFound}
          />
          <Redirect from="/" exact to="/home" />

          {/* admin routes */}

          {/* Store routes */}
          <Route path="/createStore" component={CreateStore} />
          <AppRoute
            path="/editStore/:id"
            layout={AdminDAshboard}
            component={editStore}
          />
          <AppRoute
            path="/indexStore"
            layout={AdminDAshboard}
            component={IndexStore}
          />

          <AppRoute
            path="/createsubcategory/:id"
            layout={AdminDAshboard}
            component={SubCategory}
          />
          <AppRoute
            path="/editcategory/:id"
            layout={AdminDAshboard}
            component={EditCategory}
          />
          <AppRoute
            path="/indexCategory"
            layout={AdminDAshboard}
            component={Category}
          />
          <AppRoute
            path="/parentCategory"
            layout={AdminDAshboard}
            component={ParentCategory}
          />
          <AppRoute
            path="/About-Us"
            layout={AdminDAshboard}
            component={IndexAbout}
          />
          <AppRoute
            path="/createAbout"
            layout={AdminDAshboard}
            component={CreateAbout}
          />
          <AppRoute
            path="/editAbout/:id"
            layout={AdminDAshboard}
            component={EditAbout}
          />
          <AppRoute
            path="/Contact-Us"
            layout={AdminDAshboard}
            component={Contact}
          />
          <AppRoute
            path="/createContact"
            layout={AdminDAshboard}
            component={CreateContact}
          />
          <AppRoute
            path="/editContact/:id"
            layout={AdminDAshboard}
            component={EditContact}
          />
          <AppRoute
            path="/dynamicInput"
            layout={AdminDAshboard}
            component={DynamicInput}
          />
          <AppRoute
            path="/stringArray"
            layout={AdminDAshboard}
            component={StringArray}
          />
          <AppRoute
            path="/createProduct"
            layout={AdminDAshboard}
            component={CreateProduct}
          />
          <AppRoute
            path="/indexProduct"
            layout={AdminDAshboard}
            component={Product}
          />
          <AppRoute
            path="/createProduct"
            layout={AdminDAshboard}
            component={CreateProduct}
          />
          <AppRoute
            path="/addProduct"
            layout={AdminDAshboard}
            component={AddPRoduct}
          />

          <AppRoute
            path="/addImage/:id"
            layout={AdminDAshboard}
            component={AddProductImage}
          />
          <AppRoute
            path="/editProduct/:id"
            layout={AdminDAshboard}
            component={EditProduct}
          />
          <AppRoute
            path="/showImages/:id"
            layout={AdminDAshboard}
            component={ViewImage}
          />
          <AppRoute
            path="/Feedback"
            layout={AdminDAshboard}
            component={IndexFeedback}
          />
          <AppRoute
            path="/addLogo"
            layout={AdminDAshboard}
            component={StoreLogo}
            // component={props => <StoreLogo {...props} name="Rehan" />}
          />
          <AppRoute
            path="/Logo"
            layout={AdminDAshboard}
            component={IndexLogo}
          />
          <AppRoute
            path="/addStoreImage"
            layout={AdminDAshboard}
            component={StoreImage}
          />
          <AppRoute
            path="/StoreImage"
            layout={AdminDAshboard}
            component={IndexStoreImage}
          />
          <AppRoute
            path="/addPaypal"
            layout={AdminDAshboard}
            component={AddPaypalCredentials}
          />
          <AppRoute
            path="/indexPaypal"
            layout={AdminDAshboard}
            component={IndexPaypal}
          />
          <AppRoute
            path="/editPaypalDetail"
            layout={AdminDAshboard}
            component={EditPaypal}
          />
          <AppRoute
            path="/addStripe"
            layout={AdminDAshboard}
            component={AddStripeCredentials}
          />
          <AppRoute
            path="/indexStripe"
            layout={AdminDAshboard}
            component={IndexStripe}
          />
          <AppRoute
            path="/editStripeDetail"
            layout={AdminDAshboard}
            component={EditStripe}
          />
          <AppRoute
            path="/addCashDelivery"
            layout={AdminDAshboard}
            component={AddCashOnDelivery}
          />
          <AppRoute
            path="/indexOrder"
            layout={AdminDAshboard}
            component={IndexOrder}
          />
          <AppRoute
            path="/viewOrder/:id"
            layout={AdminDAshboard}
            component={ViewOrder}
          />
          <AppRoute
            path="/editOrderStatus/:id"
            layout={AdminDAshboard}
            component={EditOrderStatus}
          />
          <AppRoute
            path="/indexSuperAdmin"
            layout={AdminDAshboard}
            component={IndexSuperAdmin}
          />
          <AppRoute
            path="/ListStores"
            layout={AdminDAshboard}
            component={StoreList}
          />
          <AppRoute
            path="/storeLinks/:id"
            layout={AdminDAshboard}
            component={StoreDetailLink}
          />
          <AppRoute
            path="/storeCategory/:id"
            layout={AdminDAshboard}
            component={StoreCategory}
          />
          <AppRoute
            path="/storeFeedBack/:id"
            layout={AdminDAshboard}
            component={StoreFeedBack}
          />
          <AppRoute
            path="/storeContactUs/:id"
            layout={AdminDAshboard}
            component={StoreContactUs}
          />
          <AppRoute
            path="/storeAbout/:id"
            layout={AdminDAshboard}
            component={StoreAbout}
          />
          <AppRoute
            path="/storeProduct/:id"
            layout={AdminDAshboard}
            component={StoreProduct}
          />
          <AppRoute
            path="/indexPlan"
            layout={AdminDAshboard}
            component={IndexPamentPlan}
          />
          <AppRoute
            path="/editProductCategory/:id"
            layout={AdminDAshboard}
            component={EditProductCategory}
          />
          {/* <AppRoute
            path="/addPlan"
            layout={AdminDAshboard}
            component={AddPaymentPlan}
          /> */}
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
