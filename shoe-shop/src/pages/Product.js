import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { addProduct } from "../redux/cartRedux";
import { mid, mobile } from "../responsive";
import { tablet } from "../responsive";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { publicRequest } from "../requestMethod";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background: #212531;
  background: linear-gradient(
    30deg,
    #026af1,
    #026af1 20%,
    #292929 20.3%,
    #292929 100%
  );
  /* position: relative; */
  overflow: hidden;
  ${mobile({})};
`;

const Wrapper = styled.div`
  display: flex;
  /* border: 1px solid red; */
  /* height: 80vh; */
  width: 100%;
  align-items: center;

  justify-content: center;
  ${mobile({ flexDirection: "column", marginTop: "20px", height: "80vh" })}
`;
const Card = styled.div`
  /* position: absolute; */
  /* top: 20%;
  left: 10%; */
  border: 1px solid white;
  height: 70vh;
  width: 90%;
  display: flex;
  /* margin: 20px 0; */
  /* justify-content: center; */
  -webkit-box-shadow: 0px 9px 32px 8px #000000;
  box-shadow: 0px 9px 32px 8px #000000;
  ${mobile({ flexDirection: "column", height: "100%" })}
`;
const Image = styled.img`
  /* border: 1px solid blue; */
  flex: 2;
  height: 100%;
  width: 70%;
  object-fit: cover;
  ${mobile({ flex: 1.5, width: "100%" })}
`;
const Desc = styled.div`
  /* border: 1px solid yellow; */
  flex: 3;
  display: flex;
  flex-direction: column;
  /* background: linear-gradient(130deg, #026af1, #026af1 40%, #292929 40.3%, #292929 100%); */
  background: linear-gradient(
    130deg,
    #202020,
    #424242 40%,
    #292929 40.3%,
    #292929 100%
  );
  ${mobile({ flex: 2 })};
`;
const Title = styled.h1`
  padding: 20px;
  ${mid({ fontSize: 18 })};
  ${mobile({ padding: 10 })}
`;
const Price = styled.span`
  margin-bottom: 30px;
  font-size: 30px;
  ${mid({ fontSize: 20, marginBottom: 10 })};
`;
const Sizes = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  /* flex-wrap: wrap; */
  ${mobile({ height: "20px", marginTop: 0 })}
`;
const Size = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 50%;
  /* height: 20px;
  width: 20px; */
  cursor: pointer;
  &:focus {
    color: #026af1;
  }
  &:hover {
    background-color: #363636;
    transform: scale(1.1);
  }
`;
const Wrap = styled.div`
  flex: 7;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  ${mobile({ flex: 3 })}
`;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  font-size: 20px;
  cursor: pointer;
  background-color: transparent;
`;
const ButtonWrap = styled.div`
  flex: 0.5;
  display: flex;
  border-top: 1px solid #026af1;
  justify-content: flex-end;
  &:hover {
    background-color: #026af1;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;
const Quantity = styled.h2`
  margin: 0 10px;
`;

const Back = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  margin-left: 30px;
  /* padding: 30px; */

  width: fit-content;
  /* padding-left: 5vw; */
  cursor: pointer;
  ${mobile({ margin: 0, fontSize: 14 })}
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 10px;
  padding: 10px;
  font-weight: 100;
  ${mid({ fontSize: 12 })};
`;

const Error = styled.span`
  color: #026af1;
  text-align: center;
  padding: 20px;
`;

function Product() {
  const [size, setSize] = useState("");
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  //fetch the product by its unique id and set it to its state to be able to render on to the page
  //use useEffect to rerender when the id value changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await publicRequest.get("/products/" + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);

  // add product to cart but check if size was chosen if not prompt an error to the page for user
  // else dispatch the action to add the product to the cart with redux
  const handleClick = () => {
    if (size === "") {
      setError(true);
    } else {
      dispatch(
        addProduct({
          ...product,
          quantity,
          size,
          pricing: product.price * quantity,
        })
      );
      navigate("/cart");
    }
  };
  // change product size state
  const addSize = (s) => {
    setSize(s);
  };
  // change wuantity state
  const adjust = (action) => {
    if (action === "minus") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const back = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Navbar />
      <Back onClick={back}>
        <ArrowBackIcon></ArrowBackIcon>back
      </Back>
      <Wrapper>
        <Card>
          <Image src={product.img} />
          <Desc>
            <Wrap>
              <Title>{product.title}</Title>
              <Price>$ {product.price}</Price>
              <span>Sizes:</span>
              <Sizes>
                {product.size?.map((s) => {
                  return (
                    <Size key={s} tabIndex="0" onClick={() => addSize(s)}>
                      {s}
                    </Size>
                  );
                })}
              </Sizes>
              <QuantityContainer>
                <RemoveIcon onClick={() => adjust("minus")} />
                <Quantity>{quantity}</Quantity>
                <AddIcon onClick={() => adjust("add")} />
              </QuantityContainer>

              <Description>{product.description}</Description>
            </Wrap>
            {error && <Error>Please choose a size</Error>}
            <ButtonWrap>
              <Button onClick={handleClick}>Add to cart</Button>
            </ButtonWrap>
          </Desc>
        </Card>
      </Wrapper>
    </Container>
  );
}

export default Product;
