import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { tablet } from "../responsive";

const Container = styled.div`
  background-color: #131313;
  background-image: url("https://images.unsplash.com/photo-1597594839610-79160ac6a654?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 90px);
`;

const Slider = styled.div`
  font-size: 14vw;
  /* font-size: 180px; */
  opacity: 0.6;

  ${mobile({ fontSize: "70px" })}
`;

function Home() {
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Slider>Experience Comfort</Slider>
      </Wrapper>
    </Container>
  );
}

export default Home;
