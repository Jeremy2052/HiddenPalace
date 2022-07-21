import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { publicRequest } from "../requestMethod";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(110deg, #ffad77, #f85a1c 48%, #181818 48.3%, #1a1919 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 70vw;
  height: 50vh;
  -webkit-box-shadow: 0px 9px 32px 8px #000000;
  box-shadow: 0px 9px 32px 8px #000000;
  display: flex;
  ${mobile({ flexDirection: "column", width: "90%", height: "80vh" })}/* border: 1px solid white; */
  /* padding: 20px; */
`;
const Left = styled.div`
  flex: 3;
  background-image: url("https://images.unsplash.com/photo-1609011809547-fec587101c8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: 20px;
`;
const Logo = styled.h1``;
const Title = styled.h2``;
const Desc = styled.span``;
const Right = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  padding: 20px;
`;
const Form = styled.form`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  width: 80%;
  flex-direction: column;

  &:span {
    color: orange;
  }
`;
const Input = styled.input`
  margin-bottom: 20px;
  height: 30px;
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid white;

  &::placeholder {
    color: white;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  cursor: pointer;
  font-size: 12px;
  background-color: transparent;
  border: none;
  width: 100px;
  height: 40px;
  border: 1px solid white;

  &:hover {
    background-color: #f85a1c;
  }
`;

function Register() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const createAccount = async (e) => {
    e.preventDefault();
    const user = {
      first: first,
      last: last,
      email: email,
      password: password,
    };
    try {
      await publicRequest.post("/auth/register", user);
      login(dispatch, { email, password });
    } catch (err) {
      setError(true);
    }
    // navigate("/login");
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo>Hidden Palace</Logo>
          </Link>
          <Title>Create an account</Title>
          <Desc>Explore the palace of hidden designs that fits you!</Desc>
        </Left>
        <Right>
          <Form onSubmit={createAccount}>
            <Input placeholder="First name" onChange={(e) => setFirst(e.target.value)} />
            <Input placeholder="Last name" onChange={(e) => setLast(e.target.value)} />
            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <ButtonWrap>
              <Button type="submit">Create</Button>
              <Link to="/login">
                <Button>Already a member</Button>
              </Link>
            </ButtonWrap>
            {error && <span>Something went wrong try again</span>}
          </Form>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Register;
