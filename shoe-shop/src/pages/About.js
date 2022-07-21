import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { mid, mobile, tablet } from "../responsive";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(70deg, #047ff3, #047ff3 20%, #3f3f3f 20.3%, #292929 100%);
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* position: relative; */
  margin-top: 2%;
`;
const Image = styled.img`
  height: 60vh;
  width: 20vw;
  object-fit: cover;
  margin: 0 20px;
  -webkit-box-shadow: 0px 11px 19px 6px #000000;
  box-shadow: 0px 11px 19px 6px #000000;
  ${tablet({})}
  ${mid({ margin: "0 10px" })}
  ${mobile({ height: "50vh", margin: "0 5px" })}
`;
const ImgContainer = styled.div``;
const AboutWrapper = styled.div`
  /* position: absolute;
  bottom: 10%;
  left: 10%; */
`;
const AboutContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
`;
const Title = styled.h1`
  font-size: 80px;
  font-weight: 300;
  text-align: center;
  ${tablet({ fontSize: "60px" })}
  ${mid({ fontSize: "40px" })}
`;
const Desc = styled.h4`
  text-align: center;
  width: 60%;
  ${tablet({ fontSize: "16px" })}
  ${mid({ fontSize: "16px" })}
  ${mobile({ fontSize: "14px" })}
`;
const Contact = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
`;
const Email = styled.span`
  /* margin-right: 40px; */
`;
const Phone = styled.span``;

function About() {
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src="https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
          <Image src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
          <Image src="https://images.unsplash.com/photo-1626947346165-4c2288dadc2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
          <Image src="https://images.unsplash.com/photo-1612821745127-53855be9cbd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
        </ImgContainer>
        <AboutWrapper>
          <AboutContainer>
            <Title>Hidden Palace</Title>
            <Desc>Hidden Palace is a place to visit to find the design and comfort that fits for you. Tour around the area to discover the products that shows who you are.</Desc>
          </AboutContainer>
          <Contact>
            <Email>Email: jeremy93214@hotmail.com</Email>
            <Phone>Phone: (682)-208-6837</Phone>
          </Contact>
        </AboutWrapper>
      </Wrapper>
    </Container>
  );
}

export default About;
