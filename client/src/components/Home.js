import React, { Fragment, useState, useEffect } from "react";
import MetaData from "./layout/MetaData";
import Loader from "./layout/Loader";

import Product from "./product/Product";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useAlert } from "react-alert";
import { Carousel } from "react-bootstrap";

import Pagination from "react-js-pagination";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 100000]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0)

  const categories = ['Laptop', 'Tivi', 'Phone', 'Headphones'];

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(
    state => state.products
  );

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage, price, category,rating));
  }, [dispatch, alert, error, keyword, currentPage, price, category,rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if(keyword){
    count=filteredProductsCount
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products Online"} />
          <div className="img-fluid " id="product_image_promotion">
              <Carousel pause="hover">
                    <Carousel.Item >
                      <img
                        className="d-block w-100"  height="250px"
                        src="/images/carousel-2.jpeg"
                        alt="2"
                      />
                    </Carousel.Item>
                    <Carousel.Item >
                      <img
                        className="d-block w-100"  height="250px"
                        src="/images/carousel-1.jpeg"
                        alt="1"
                      />
                    </Carousel.Item>
                  
              </Carousel>
            </div>
            
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
          <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          10000: `$10000`,
                        }}
                        min={1}
                        max={10000}
                        defaultValue={[1, 10000]}
                        tipFormatter={value => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={price => setPrice(price)}
                      />
                      <hr className="my-3" />
                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>
                        <ul className="pl-0">
                          {categories.map(category => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={()=>setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">Ratings</h4>
                        <ul className="pl-0">
                          {[5,4,3,2,1].map(star => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={star}
                              onClick={()=>setRating(star)}
                            >
                              <div className="rating-outer">
                                <div className="rating-inner"
                                style={{
                                  width:`${star*20}%`
                                }}></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                        products.map(product => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products &&
                products.map(product => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
            </div>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;