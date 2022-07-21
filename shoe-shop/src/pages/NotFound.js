import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 80px;
  padding: 10px;
  color: black;
`;
const Title = styled.h1`
  font-size: 60px;
  color: black;
`;
const Desc = styled.h3`
  font-size: 24px;
  color: black;
`;
const Span = styled.span`
  color: black;
`;
const Back = styled.div`
  color: black;
`;
const Links = styled.span`
  cursor: pointer;
  color: #158fe0;
`;

function NotFound() {
  return (
    <Container>
      <Title>404</Title>
      <Desc>Not Found</Desc>
      <Span>The page you are looking for doesn't exist or an other error occured.</Span>
      <Back>
        <Span>Go to </Span>
        <Link to="/">
          <Links>Home</Links>
        </Link>
      </Back>
    </Container>
  );
}

export default NotFound;
