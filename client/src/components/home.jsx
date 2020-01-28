import React, { Component } from "react";
class Home extends Component {
  state = {
    image1: "/images/img-1.jpg",
    image2: "/images/img-2.jpg",
    image3: "/images/img-3.jpg",
    image4: "/images/img-4.jpg",
    image5: "/images/dashboard.png"
  };
  render() {
    return (
      <React.Fragment>
        <section className="bgclr ">
          <div className="container">
            <div className="row  ">
              <div className="col-md-6 margin-t">
                <div className="mt-5 mb-0">
                  <h1 className="display-3 font-weight-bold text-dark">
                    Build your business
                  </h1>
                  <p className="text-dark">
                    You’ve got the will. We’ve got the way.
                  </p>
                  {/* <button type="button" class="btn btn-primary btn-lg ">
                  Start free trial
                </button> */}
                </div>
              </div>
              <div className="col-md-6 margin-t">
                <img
                  src={this.state.image1}
                  alt="no alternate"
                  width="510px"
                  className="bgimg img-fluid"
                />
              </div>
            </div>
            <div className="row container mt-5 ">
              <div className="col-md-4  ">
                <img
                  src={this.state.image2}
                  alt="no alternate"
                  className="img-fluid div1 "
                />
              </div>
              <div className="col-md-4  ">
                <img
                  src={this.state.image3}
                  alt="no alternate"
                  className="img-fluid div1 "
                />
              </div>

              <div className="col-md-4  ">
                <img
                  src={this.state.image4}
                  alt="no alternate"
                  className="img-fluid div1"
                />
              </div>
            </div>
          </div>
        </section>
        <div className="container mt-5 mb-5">
          <div className="row mt-5 mb-5">
            <div className="col-sm-12 text-center">
              <h3 className=" font-weight-bold text-dark">
                With you from first sale to full scale
              </h3>
              <p>
                One platform with all the ecommerce and point of sale
                <br />
                features you need to start, run, and grow
                <br /> your business.
              </p>
            </div>
          </div>

          <div className="row mt-5 mb-5">
            <div className="col-sm-6 ">
              <img
                src="images/e-commerce-mexico.png"
                alt="no alternate"
                className="img-fluid"
                width="510px"
              />
            </div>
            <div className="col-sm-6 mt text-left">
              <h3 className=" font-weight-bold text-dark pl-5">
                <span className="text-primary">Start —</span>
                <br />
                your business journey
              </h3>
              <p className="text-muted pl-5">
                Find a business name, and
                <br />
                create a brand with our free tools.
              </p>
            </div>
          </div>
          <div className="row mt-5 mb-5">
            <div className="col-sm-6 mt text-left">
              <h3 className=" font-weight-bold text-dark">
                <span className="text-primary">Sell —</span>
                <br />
                everywhere
              </h3>
              <p className="text-muted">
                Use one platform to sell products to anyone, anywhere—online
                with your ecommerce store, online
                <br />
                marketplaces, and social media, and in-person with point of
                sale.
              </p>
            </div>
            <div className="col-sm-6">
              <img
                src="/images/1_iAu65xDmvpVdBJgps6EDEw.png"
                alt="no alternate"
                className="img-fluid"
                width="510px"
              />
            </div>
          </div>
          {/* <div className="row mt-5 mb-5">
            <div className="col-sm-6 ">
              <div className="bgimge " />
            </div>
            <div className="col-sm-6 mt text-left">
              <h3 className=" font-weight-bold text-dark pl-5">
                <span className="text-primary">Market —</span>
                <br />
                your business
              </h3>
              <p className="text-muted pl-5">
                Take the guesswork out of marketing with built-in tools that
                help you create,
                <br /> execute, and analyze campaigns on Facebook and Google.
              </p>
            </div>
          </div> */}
          <div className="row mt-5 mb-5">
            <div className="col-sm-6 ">
              <img
                src={this.state.image5}
                alt="no alternate"
                className="img-fluid"
              />
            </div>
            <div className="col-sm-6 mt text-left">
              <h3 className=" font-weight-bold text-dark pl-5">
                <span className="text-primary">Manage —</span>
                <br />
                everything
              </h3>
              <p className="text-muted pl-5">
                Use a single dashboard to manage orders, shipping, and payments
                <br /> anywhere you go. Gain the insights and knowledge you need
                to grow{" "}
              </p>
            </div>
          </div>
          {/* <div className="row mt-5 mb-5">
            <div className="col-sm-6 mt text-left">
              <h3 className=" font-weight-bold text-dark">
                <span className="text-primary">Manage —</span>
                <br />
                everything
              </h3>
              <p className="text-muted">
                Use a single dashboard to manage orders, shipping, and payments
                <br />
                anywhere you go. Gain the insights and knowledge you need to
                grow{" "}
              </p>
          
            </div>
            <div className="col-sm-6">
              <div className="bgimge " />
            </div>
          </div> */}
        </div>
        <section className="bgimage">
          <div className="container">
            <div className="row text-img">
              <div className="col-sm-12 text-left">
                <h1 className="text-white">
                  Empowering independent business
                  <br /> owners everywhere
                </h1>
                <p className="text-white">
                  Store builder businesses around the world have
                  <br />
                  made over $100 billion in sales
                </p>
              </div>
            </div>
            <div className="row imgtext2">
              <div className="col-sm-12">
                <p>
                  The orders in this map do not reflect live
                  <br />
                  results, but are generated from a simulation of
                  <br /> the last reported quarter’s orders.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="container ">
          <div className="row mt-5 mb-5">
            <div className="col-sm-12 text-center">
              <h6 className="display-4 text-dark ">
                Start your business journey with Store builder
              </h6>
            </div>
          </div>
          <div className="row mt-5 mb-5">
            <div className="col-sm-3">
              <div className="card cardbr">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="fa fa-ravelry fa-5x" aria-hidden="true" />
                  </h5>
                  <h6 className="card-subtitle font-weight-bold mt-2 text-dark">
                    Create your brand
                  </h6>
                  <p className="card-text text-muted mt-2">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <p className="card-text text-info font-weight-bold">
                    Start your business brand
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card cardbr">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="fa fa-ravelry fa-5x" aria-hidden="true" />
                  </h5>
                  <h6 className="card-subtitle font-weight-bold mt-2 text-dark">
                    Build your online store
                  </h6>
                  <p className="card-text text-muted mt-2">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <p className="card-text text-info font-weight-bold">
                    Start your business brand
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card cardbr">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="fa fa-ravelry fa-5x" aria-hidden="true" />
                  </h5>
                  <h6 className="card-subtitle font-weight-bold mt-2 text-dark">
                    Buy a business
                  </h6>
                  <p className="card-text text-muted mt-2">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <p className="card-text text-info font-weight-bold">
                    Start your business brand
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card cardbr">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="fa fa-ravelry fa-5x" aria-hidden="true" />
                  </h5>
                  <h6 className="card-subtitle font-weight-bold mt-2 text-dark">
                    Move your business
                  </h6>
                  <p className="card-text text-muted mt-2">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <p className="card-text text-info font-weight-bold">
                    Start your business brand
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5 mb-5">
            <div className="col-sm-12 text-center">
              <h6 className="font-weight-bold fontwi mt-5 text-dark">
                Try our store builder and explore all the tools and services you
                <br />
                need to start, run, and grow your business.
              </h6>
              {/* <button type="button" class="btn btn-primary btn-lg mt-5">
              Start free trial
            </button> */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
