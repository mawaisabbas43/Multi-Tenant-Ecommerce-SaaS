import React from "react";

const Pricing = () => {
  return (
    <div className="mt-5">
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 mt-5 text-center">
            <h1 className="font-weight-bold ">
              Set up your store, pick a plan later
            </h1>
            <h1 className="display-5 text-muted">
              Try Shopify free for 14 days, no credit card required
            </h1>
            <button type="button" className="btn btn-primary btn-lg mt-5 mb-5">
              Start free trial
            </button>
          </div>
        </div>

        <div className="row mt-5 text-center">
          <div className="col-sm-1" />
          <div className="col-sm-10">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th />
                          <th>
                            <p>Basic Shopify</p>
                            <p class="text-muted">
                              All the basics for starting a new <br />
                              business
                            </p>
                          </th>
                          <th>
                            <p>Shopify</p>
                            <p class="text-muted">
                              Everything you need for a growing
                              <br /> business
                            </p>
                          </th>
                          <th>
                            <p>Advanced Shopify</p>
                            <p class="text-muted">
                              Advanced features for scaling your
                              <br /> business
                            </p>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="align-middle text-left">Monthly price</td>
                          <td>
                            <sup>USD $</sup>
                            <span className="font-weight-bold pr">29</span>/mo
                          </td>
                          <td>
                            <sup>USD $</sup>
                            <span className="font-weight-bold pr">79</span>/mo
                          </td>
                          <td>
                            <sup>USD $</sup>
                            <span className="font-weight-bold pr">299</span>/mo
                          </td>
                        </tr>
                        <tr>
                          <td colspan="4" className="text-left">
                            <p className="font-weight-bold">FEATURES</p>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>Online Store</p>
                            <p class="font-weight-light">
                              Includes ecommerce website and blog.
                            </p>
                          </td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>Unlimited products</p>
                          </td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>Staff accounts</p>
                          </td>
                          <td className="align-middle text-centre">2</td>
                          <td className="align-middle text-centre">5</td>
                          <td className="align-middle text-centre">15</td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>24/7 support</p>
                          </td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>Sales channels</p>
                            <p class="font-weight-light">
                              Sell on online marketplaces and social media.
                              Channel availability varies by country.
                            </p>
                          </td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>Manual order creation</p>
                          </td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>Discount codes</p>
                          </td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>Free SSL certificate</p>
                          </td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>Abandoned cart recovery</p>
                          </td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>Gift cards</p>
                          </td>
                          <td className="align-middle text-centre">–</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>Professional reports</p>
                          </td>
                          <td className="align-middle text-centre">–</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>Advanced report builder</p>
                          </td>
                          <td className="align-middle text-centre">–</td>
                          <td className="align-middle text-centre">–</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>Third-party calculated shipping rates</p>
                            <p class="font-weight-light">
                              Show calculated rates with your own account or
                              third-party apps at checkout.
                            </p>
                          </td>
                          <td className="align-middle text-centre">–</td>
                          <td className="align-middle text-centre">–</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                        </tr>
                        <tr>
                          <td colspan="4" className="text-left">
                            <p className="font-weight-bold">SHOPIFY SHIPPING</p>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>Third-party calculated shipping rates</p>
                            <p class="font-weight-light">
                              Show calculated rates with your own account or
                              third-party apps at checkout.
                            </p>
                          </td>
                          <td className="align-middle text-centre">
                            up to 64%
                          </td>
                          <td className="align-middle text-centre">
                            up to 72%
                          </td>
                          <td className="align-middle text-centre">
                            up to 74%
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>Print shipping labels</p>
                          </td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>USPS Priority Mail Cubic® pricing</p>
                          </td>
                          <td className="align-middle text-centre">–</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                        </tr>
                        <tr>
                          <td colspan="4" className="text-left">
                            <p className="font-weight-bold">SHOPIFY PAYMENTS</p>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <p>Fraud analysis</p>
                          </td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                          <td className="align-middle text-centre">&#x2713;</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="5" className="text-center">
                            Choose according to your plan and start online
                            business
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-1" />
        </div>
      </div>
      <div className="container-fluid">
        <div className="row bg-light">
          <div className="col-sm-12 mt-5 text-center">
            <h1 className="font-weight-bold ">
              Set up your store, pick a plan later
            </h1>
            <button type="button" className="btn btn-primary btn-lg mt-5 mb-5">
              Start free trial
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row   ">
          <div className="col-sm-1" />
          <div className="col-sm-10">
            <div className="row">
              <div className="col-sm-6">
                <h1 className="mb-5">General questions</h1>
                <p className="font-weight-bold">Is there a setup fee?</p>
                <p class="text-muted">
                  No. There are no setup fees on any of our plans.
                </p>
                <p className="font-weight-bold">
                  Do I need to enter my credit card details to sign up?
                </p>
                <p class="text-muted">
                  No. You can sign up and use Shopify for 14 days without
                  entering your credit card details. At the end of your trial,
                  or when you decide to launch your store, you will need to pick
                  a plan and enter your credit card details.
                </p>
                <p className="font-weight-bold">
                  Can I cancel my account at any time?
                </p>
                <p class="text-muted">
                  Yes. If you ever decide that Shopify isn’t the best ecommerce
                  platform for your business, simply cancel your account.
                </p>
                <p className="font-weight-bold">How long are your contracts?</p>
                <p class="text-muted">
                  All Shopify plans are month to month unless you sign up for an
                  annual or biennial plan.
                </p>
                <p className="font-weight-bold">
                  Do you offer any discounted plans?
                </p>
                <p class="text-muted">
                  Yes, we offer a 10% discount on annual plans and a 20%
                  discount on biennial plans, when they are paid upfront.
                </p>
                <p className="font-weight-bold">
                  Can I change my plan later on?
                </p>
                <p class="text-muted">
                  Absolutely! You can upgrade or downgrade your plan at any
                  time.
                </p>
                <p className="font-weight-bold">
                  Is Shopify PCI Compliant or PCI Certified?
                </p>
                <p class="text-muted">
                  Yes. Shopify is certified Level 1 PCI DSS compliant. This
                  means all your data and customer information is ultra secure.
                </p>
                <p className="font-weight-bold">
                  Do I have to sell the same products in-store as I do online?
                </p>
                <p class="text-muted">
                  No, you can choose exactly what products to sell online,
                  in-store, or both.
                </p>
                <p className="font-weight-bold">
                  What is the rate if I type in a credit card?
                </p>
                <p class="text-muted">
                  If you chose to type in a credit card number instead of using
                  the Shopify credit card reader, you will be charged the same
                  rate as your online rate.
                </p>
                <p className="font-weight-bold">
                  Are there any transaction fees?
                </p>
                <p class="text-muted">
                  Use Shopify Payments and pay no transaction fee.
                </p>
              </div>
              <div className="col-sm-6 ">
                <h1 className="mb-5">Online questions</h1>
                <p className="font-weight-bold">
                  Can I use my own domain name?
                </p>
                <p class="text-muted">
                  Yes. You can purchase a domain name within Shopify, or use an
                  existing one that you own. We also provide a free
                  myshopify.com domain name to all stores on sign up.
                </p>
                <p className="font-weight-bold">
                  What are your bandwidth fees?
                </p>
                <p class="text-muted">
                  There are none. All Shopify plans include unlimited bandwidth
                  for free.
                </p>
                <p className="font-weight-bold">Do I need a web host?</p>
                <p class="text-muted">
                  Shopify includes secure, unlimited ecommerce hosting on all
                  plans except Shopify Lite. You can also use the Buy Button to
                  add ecommerce to any existing website.
                </p>
                <p className="font-weight-bold">Do I need a web host?</p>
                <p class="text-muted">
                  Shopify includes secure, unlimited ecommerce hosting on all
                  plans except Shopify Lite. You can also use the Buy Button to
                  add ecommerce to any existing website.
                </p>
                <h1 className="font-weight-bold mt-5 mb-5">POS questions</h1>
                <p className="font-weight-bold">
                  I currently pay $49 for my Retail Package (POS features). Do I
                  qualify for POS to be included in my plan price?
                </p>
                <p class="text-muted">
                  Yes! The +$49 Retail Package was discontinued and its features
                  were added to the Shopify and Advanced plans. To update your
                  plan and receive the retail features for free, select the
                  Shopify plan or higher in your Shopify admin.
                </p>
                <p className="font-weight-bold">
                  Where can I buy a cash register, receipt printer, and other
                  hardware?
                </p>
                <p class="text-muted">
                  You can buy hardware kits and individual items of supported
                  hardware from the Shopify Hardware Store in Canada, the United
                  Kingdom, Ireland, and the continental United States. Outside
                  of these countries, supported hardware is available from
                  authorized resellers.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-1" />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
