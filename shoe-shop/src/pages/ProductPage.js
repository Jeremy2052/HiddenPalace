import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import { HomeImg } from "../data";
import { mobile } from "../responsive";
import { tablet } from "../responsive";
import { publicRequest } from "../requestMethod";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  background-color: #1a1a1a;
  min-height: 100vh;
  overflow-x: hidden;
`;
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SlideContainer = styled.div`
  height: 30vh;
  width: 100%;
  /* margin: 20px; */
  display: flex;
  overflow: hidden;
  position: relative;
`;

const SlideWrapper = styled.div`
  display: flex;
  height: 100%;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  transition: all 1.5s ease;
  align-items: center;
`;
const Slide = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;
const ImgContainer = styled.div`
  /* flex: 2; */
  height: 100%;
  width: 80%;
  /* border: 1px solid blue; */
  display: flex;
  justify-content: center;
  ${mobile({ width: "100%" })}
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  ${mobile({ height: "700px" })}
`;

function ProductPage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const delay = 4000;
  const timeoutRef = useRef(null);
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await publicRequest.get(cat ? `/products?category=${cat}` : "/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [cat]);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => setSlideIndex((prevSlide) => (prevSlide === HomeImg.length - 1 ? 0 : prevSlide + 1)), delay);
    return () => {
      resetTimeout();
    };
  }, [slideIndex]);

  return (
    <Container>
      <Navbar />
      <SlideContainer>
        <SlideWrapper slideIndex={slideIndex}>
          {HomeImg.map((e) => (
            <Slide key={e.id}>
              <ImgContainer>
                <Image src={e.img} />
              </ImgContainer>
              {/* <Description>{e.desc}</Description> */}
            </Slide>
          ))}
        </SlideWrapper>
      </SlideContainer>

      <Wrapper>
        {products.map((product) => (
          <Product key={product._id} id={product._id} img={product.img} title={product.title} price={product.price} size={product.size} />
        ))}
      </Wrapper>
    </Container>
  );
}

export default ProductPage;
