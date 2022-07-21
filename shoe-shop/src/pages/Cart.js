import React, { useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { mid, mobile, tablet } from "../responsive";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publicRequest, userRequest } from "../requestMethod";
import { removeCart, removeProduct } from "../redux/cartRedux";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";

const KEY = process.env.REACT_APP_STRIPE_KEY;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(70deg, #047ff3, #047ff3 20%, #3f3f3f 20.3%, #292929 100%);
`;
const Topbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px;
  padding: 0px;
`;

const Wrapper = styled.div`
  margin: 0 20px;
  display: flex;
  justify-content: center;
  ${mobile({ flexDirection: "column-reverse", margin: "0 10px" })}
`;
const Left = styled.div`
  flex: 4;
  margin: 20px;
  ${mobile({ margin: "0" })}
`;
const Card = styled.div`
  background-color: #272727;
  /* border: 1px solid red; */
  width: 60vw;
  height: 20vh;
  margin-bottom: 20px;
  display: flex;
  -webkit-box-shadow: 0px 0px 33px 2px #000000;
  box-shadow: 0px 0px 33px 2px #000000;
  ${mobile({ width: "100%", height: "25vh" })}
`;
const Image = styled.img`
  /* flex: 2; */
  height: 100%;
  /* width: 400px; */
  width: 50%;
  object-fit: cover;
  ${mobile({ width: "150px" })}
  ${tablet({ width: "250px" })}
  ${mid({ width: "200px" })}
`;
const Desc = styled.div`
  flex: 4;
  display: flex;
  /* width: 400px; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mobile({ flex: 2 })}
`;
const Title = styled.h1`
  margin-bottom: 10px;
  font-weight: 400;
  text-align: center;
  ${tablet({ fontSize: 18 })}
  ${mid({ fontSize: 16 })}
  ${mobile({ fontSize: 14, margin: 0 })}
`;
const Price = styled.span`
  margin-bottom: 10px;
  ${mobile({ fontSize: 14, margin: 0 })}
`;
const Size = styled.span`
  margin-bottom: 10px;
  ${mobile({ fontSize: 14, margin: 0 })}
`;
const Quantity = styled.span`
  margin-bottom: 10px;
  ${mobile({ fontSize: 12, margin: 0 })}
  ${mid({ fontSize: 14 })}
  ${tablet({ fontSize: 16 })}
`;
const Right = styled.div`
  flex: 2;
  height: 400px;
  margin: 20px;
  ${mobile({ margin: "20px 0", height: "200px" })}
`;
const Checkout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  background-color: #272727;
  -webkit-box-shadow: 0px 0px 33px 2px #000000;
  box-shadow: 0px 0px 33px 2px #000000;
`;
const Top = styled.div`
  font-weight: 800;
  margin-bottom: 10px;
  font-size: 20px;
`;
const Bottom = styled.div`
  font-size: 20px;
  margin-top: 10px;
  font-weight: 400;
`;
const Buttons = styled.div`
  display: flex;
  width: 100%;
  margin: 5px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  ${mid({ flexDirection: "column", justifyContent: "center", alignItems: "center" })}
`;
const Delete = styled.span`
  font-size: 14px;
  color: #0d74fc;
  cursor: pointer;
  margin: 5px;
  ${mid({ marginBottom: "5px", fontSize: 10 })}
  ${tablet({ fontSize: 10 })}
  &:hover {
    opacity: 0.7;
  }
`;

const Empty = styled.span`
  &:hover {
    cursor: pointer;
    color: #026af1;
  }
`;
const Back = styled.div`
  /* margin: 20px;
  padding: 20px; */
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
    color: #026af1;
  }

  ${mobile({ margin: "0 ", padding: "0" })}
`;

const Mid = styled.div`
  padding-bottom: 10px;
  font-weight: 200;
  font-size: 16px;
`;
const Pay = styled.button`
  width: 100%;
  display: flex;
  background-color: transparent;
  border: none;
  border-top: 1px solid #026af1;
  padding: 10px;
  margin: 0;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  font-size: 20px;

  &:hover {
    cursor: pointer;
    color: #026af1;
    opacity: 0.7;
  }
`;
const TopCheckout = styled.div`
  padding: 10px;
`;

const EmptyCart = styled.h1`
  display: flex;
  align-items: center;
  font-weight: 200;
  font-size: 40px;
  ${mobile({ justifyContent: "center" })}
  ${mid({ justifyContent: "center" })}
`;

function Cart() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stripeToken, setStripeToken] = useState(null);

  const removeProducts = (productId, quantity, total) => {
    // dispatch(removeProduct(productId, quantity, total));
  };

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total.toFixed(2) * 100,
        });
        dispatch(removeCart());
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <Container>
      <Navbar />
      <Topbar>
        <Back onClick={() => navigate(-1)}>
          <ArrowBackIcon />
          back
        </Back>
        <Empty onClick={() => dispatch(removeCart())}>Empty cart</Empty>
      </Topbar>
      <Wrapper>
        <Left>
          {cart?.products.length === 0 && <EmptyCart>Your cart is empty</EmptyCart>}
          {cart.products?.map((p, index) => (
            <Card key={index}>
              <Image src={p.img} />
              <Desc>
                <Title>{p.title}</Title>
                <Price>$ {p.pricing}</Price>
                <Size>Size: {p?.size}</Size>
                <Quantity>Quantity: {p.quantity}</Quantity>
                <Buttons>
                  <Delete onClick={() => removeProducts(p._id, p.quantity, p.price * p.quantity)}>Delete</Delete>
                  <Delete>Save later</Delete>
                </Buttons>
              </Desc>
            </Card>
          ))}
        </Left>
        <Right>
          {cart?.total > 0 && (
            <Checkout>
              <TopCheckout>
                <Top>Order Summary</Top>
                <Mid>Items: {cart.quantity}</Mid>
                <Mid>Shipping & handling: $0</Mid>
                <Mid>Subtotal ${cart.total.toFixed(2)}</Mid>
                <Mid>Total before tax ${cart.total.toFixed(2)}</Mid>
                <Mid>Estimated tax ${(cart.total * 0.15).toFixed(2)}</Mid>
                <Bottom>Order Total: ${(cart.total + cart.total * 0.15).toFixed(2)} </Bottom>
              </TopCheckout>
              <StripeCheckout name="Hidden Palace" billingAddress shippingAddress description={`Your total: $${cart.total}`} amount={2000} token={onToken} stripeKey={KEY}>
                <Pay>Checkout</Pay>
              </StripeCheckout>
            </Checkout>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Cart;
