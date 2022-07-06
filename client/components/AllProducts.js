import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { connect } from "react-redux";
import ProductFilterbar from "./ProductFilterbar";
import ReactPaginate from "react-paginate";

const AllProducts = (props) => {
  const categories = [
    "ALL",
    "LEGOS",
    "TRANSFORMERS",
    "JURASSIC",
    "BARBIE",
    "STUFFED ANIMALS",
  ];

  const [filteredProducts, setFilteredProducts] = useState({});

  const [products, setProducts] = useState([{}]);
  const [filter, setFilter] = useState();
  const fetchCartFromLocalStorage = JSON.parse(
    window.localStorage.getItem("cart") || "[]"
  );

  const [cart, setCart] = useState(fetchCartFromLocalStorage);

  // pagination:

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 12;

  const paginate = (data) => {
    try {
      let numberOfProductsVistited = page * productsPerPage;
      setTotalPages(Math.ceil(data.length / productsPerPage));
      return data.slice(
        numberOfProductsVistited,
        numberOfProductsVistited + productsPerPage
      );
    } catch (error) {
      console.log(error);
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const getProducts = () => {
    try {
      (async () => {
        if (filter && filter !== "ALL") {
          setProducts(paginate(filteredProducts[filter]));
        } else {
          const { data } = await axios.get("/api/products");
          setProducts(paginate(data));
        }
      })();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async (userId, productId) => {
    try {
      const getOrderSessionId = await axios.get(`/api/ordersessions/${userId}`);
      const { data } = await axios.get(
        `/api/shoppingcarts/${getOrderSessionId.data.id}`
      );
      const [foundProduct] = data.filter(
        (product) => product.productId == productId
      );
      if (foundProduct) {
        const getOrderSessionId = await axios.get(
          `/api/ordersessions/${userId}`
        );
        await axios.put(
          `/api/shoppingcarts/${getOrderSessionId.data.id}/${productId}/increment`
        );
      } else {
        await axios.post("/api/shoppingcarts", {
          orderSessionId: getOrderSessionId.data.id,
          productId: productId,
          itemQuantity: 1,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mergeLocalCart = async (userId) => {
    try {
      const getOrderSessionId = await axios.get(`/api/ordersessions/${userId}`);
      if (!getOrderSessionId.data) return null;
      const { data } = await axios.get(
        `/api/shoppingcarts/${getOrderSessionId.data.id}`
      );
      cart.map(async (prodData) => {
        await axios.post(`/api/shoppingcarts`, {
          orderSessionId: getOrderSessionId.data.id,
          productId: prodData.id,
          itemQuantity: prodData.itemQuantity,
        });
      });
      localStorage.setItem("cart", JSON.stringify([]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    if (props.userId) {
      mergeLocalCart(props.userId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [props.userId, cart, filter, page]);

  useEffect(() => {
    try {
      (async () => {
        const fProduct = {};
        for (let i = 1; i < categories.length; i++) {
          const { data } = await axios.get(`/api/products/${categories[i]}`);
          fProduct[categories[i]] = data.filteredProducts;
        }
        setFilteredProducts(fProduct);
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <ProductFilterbar
        filter={filter}
        setFilter={setFilter}
        categories={categories}
      />
      <div className="allProducts">
        {products.map((product, i) => {
          return (
            <div className="product-info" key={i}>
              <img
                className="products-photo"
                src={product.image}
                onClick={() => {
                  location.href = `/products/${product.id}`;
                }}
              />
              <div className="product-name-price">
                <div>{product.productName}</div>
                <div>${product.price}</div>
              </div>
              <button
                onClick={() => {
                  props.isLoggedIn
                    ? handleAddToCart(props.userId, product.id)
                    : guestCart(cart, product, setCart);
                }}
              >
                <FaShoppingCart />
                Add To Cart
              </button>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={totalPages}
        onPageChange={changePage}
        containerClassName={"navigationButtons"}
        previousLinkClassName={"previousButton"}
        nextLinkClassName={"nextButton"}
        disabledClassName={"navigationDisabled"}
        activeClassName={"navigationActive"}
      />
      ;<div className="fa-3x"></div>
    </div>
  );
};

const isProductInCart = (arr, productId) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === productId) {
      return [true, i];
    }
  }
  return [false, -1];
};

const guestCart = (cart, product, setCart) => {
  const [isInCart, index] = isProductInCart(cart, product.id);
  if (isInCart) {
    cart[index].itemQuantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    product.itemQuantity = 1;
    setCart((prevCart) => [...prevCart, product]);
  }
};

const mapState = (state) => {
  return {
    username: state.auth.username,
    userId: state.auth.id,
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState)(AllProducts);

// export default AllProducts;
