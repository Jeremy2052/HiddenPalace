import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { tablet } from "../responsive";

const Card = styled.div`
  height: 400px;
  width: 600px;
  border: 1px solid #3a3a3a;
  margin: 20px;
  cursor: pointer;
  transition: ease 0.8s;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  &:hover {
    transform: scale(1.1);
    -webkit-box-shadow: 0px 0px 26px 5px rgba(0, 0, 0, 0.89);
    box-shadow: 0px 0px 26px 5px rgba(0, 0, 0, 0.89);
  }
  ${mobile({ height: "300px", width: "400px", margin: "20 10" })}
`;

const Image = styled.img`
  height: 80%;
  width: 100%;
  object-fit: cover;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px;
`;
const Title = styled.h3`
  ${mobile({ fontSize: "16px" })}
`;
const Price = styled.span``;

function Product({ id, img, title, price, size }) {
  return (
    <>
      <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
        <Card>
          <Image src={img} />
          <Description>
            <Title>{title}</Title>
            <Price>$ {price}</Price>
          </Description>
        </Card>
      </Link>
    </>
  );
}

export default Product;
