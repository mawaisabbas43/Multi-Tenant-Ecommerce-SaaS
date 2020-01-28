import React, { Component } from "react";
import * as productService from "../../../services/productService";
import * as categoryService from "../../../services/categoryService";
import EditCategoryList from "./editCategoryList";
import auth from "../../../services/authService";
import * as storeService from "../../../services/storeService";
import _ from "lodash";

class EditProduct extends Component {
  state = {
    product: {
      fname: "",
      lname: "",
      summary: "",
      description: "",
      price: "",
      sku: "",
      count: "",
      variantName: ""
    },
    variants: [],
    attributes: [{}],
    dataTree: [],
    selectedCategory: []
  };
  async componentDidMount() {
    console.log(this.props.match.params.id);

    const { data: Serverproduct } = await productService.getSingleProduct(
      this.props.match.params.id
    );

    this.setState({
      product: {
        fname: Serverproduct.fname,
        lname: Serverproduct.lname,
        summary: Serverproduct.summary,
        description: Serverproduct.description,
        price: Serverproduct.price,
        sku: Serverproduct.sku,
        count: Serverproduct.count,
        variantName: Serverproduct.variantName,
        categories: Serverproduct.categories
      }
    });
    this.setState({
      variants: Serverproduct.variants,
      attributes: Serverproduct.attributes
    });
    console.log(this.state);
    const user = await auth.getCurrentUser();
    const { data: store } = await storeService.getUserStore(user);
    this.setState({ store: store[0] });
    const storeObject = this.state.store;
    const { data: categories } = await categoryService.getCategories(
      storeObject
    );
    this.setState({ dataTree: categories });
  }
  handleVariants = (e, index) => {
    const { value } = e.target;
    const variants = [...this.state.variants];
    variants[index] = value;
    this.setState({
      variants
    });
  };
  handleChangeForm = e => {
    const product = { ...this.state.product };
    product[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      product
    });
    // console.log("Product-->", this.state.product);
  };
  handleChangeAttr(i, e) {
    const { name, value } = e.target;
    let attributes = [...this.state.attributes];
    attributes[i] = { ...attributes[i], [name]: value };
    this.setState({ attributes });
    //console.log("attributes--->>", this.state.attributes);
  }
  createUIAttr() {
    return this.state.attributes.map((el, i) => (
      <div key={i}>
        <input
          placeholder="Attribute Name"
          name="name"
          value={el.name || ""}
          onChange={this.handleChangeAttr.bind(this, i)}
        />
        <input
          placeholder="Attribute value"
          name="value"
          value={el.value || ""}
          onChange={this.handleChangeAttr.bind(this, i)}
        />
      </div>
    ));
  }
  // handleSelectCategory = (e, id) => {
  //   console.log(id);
  //   let selectedCategory = [...this.state.selectedCategory];
  //   this.setState({
  //     selectedCategory: [...selectedCategory, id]
  //   });
  // };
  handleSubmitForm = async e => {
    e.preventDefault();

    // const store = this.state.store;
    const product = this.state.product;
    const attributes = this.state.attributes;

    const variants = this.state.variants;
    const selectedCategory = this.state.selectedCategory;
    console.log("onSubmit category", selectedCategory);
    // console.log("store--->", store);
    console.log("product--->", product);
    console.log("attributes--->", attributes);

    console.log("variants--->", variants);

    await productService.updateProduct(
      this.props.match.params.id,
      product,
      attributes,
      variants,
      _.uniq(selectedCategory)
    );
    this.props.history.push("/indexProduct");
  };
  render() {
    return (
      <React.Fragment>
        <div className="col-md-12 container">
          <h1>Edit Product </h1>
          <div className="row m-5">
            <div className="col-md-8">
              <form onSubmit={this.handleSubmitForm}>
                {/* Select category:
                {this.state.dataTree.length !== 0 && (
                  <EditCategoryList
                    data={this.state.dataTree}
                    select={this.handleSelectCategory}
                  />
                )} */}
                <div className="form-group">
                  <label htmlFor="name">Product name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    name="fname"
                    onChange={this.handleChangeForm}
                    value={this.state.product.fname}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lname">Product brand name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    name="lname"
                    onChange={this.handleChangeForm}
                    value={this.state.product.lname}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">Summary:</label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="4"
                    name="summary"
                    onChange={this.handleChangeForm}
                    value={this.state.product.summary}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea2">
                    Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea2"
                    rows="4"
                    name="description"
                    onChange={this.handleChangeForm}
                    value={this.state.product.description}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Product price:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="number"
                    name="price"
                    onChange={this.handleChangeForm}
                    value={this.state.product.price}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Product SKU#:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sku"
                    name="sku"
                    onChange={this.handleChangeForm}
                    value={this.state.product.sku}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Product Quantity:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="count"
                    name="count"
                    onChange={this.handleChangeForm}
                    value={this.state.product.count}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Product attributes:</label>

                  {this.createUIAttr()}
                </div>
                <div className="form-group">
                  <label htmlFor="name">Variant name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="variantName"
                    name="variantName"
                    onChange={this.handleChangeForm}
                    value={this.state.product.variantName}
                  />
                </div>
                <label>Options:</label>
                <br />
                {this.state.variants.map((va, index) => {
                  return (
                    <div key={index}>
                      <input
                        type="text"
                        className="form-control"
                        id="sku"
                        onChange={e => this.handleVariants(e, index)}
                        value={va}
                      />
                    </div>
                  );
                })}
                <button type="submit" className="btn btn-primary btn-block">
                  Update
                </button>
              </form>
            </div>
            <div className="col-md-4" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EditProduct;
