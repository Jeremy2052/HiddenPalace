import React from "react";
import LocalMallOutlined from "@mui/icons-material/LocalMallOutlined";
import styled from "styled-components";
import { Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { mobile } from "../responsive";
import { tablet } from "../responsive";
import CastleIcon from "@mui/icons-material/Castle";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";

const Container = styled.div`
  /* border-bottom: 1px solid #000000; */
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: space-evenly;
  padding: 5px;
  ${mobile({ height: "60px" })}
`;

const Logo = styled.h1`
  font-weight: 500;
  font-size: 50px;
  cursor: pointer;
  border-bottom: 2px solid white;
  &:hover {
    color: #026af1;
  }
  ${mobile({ display: "none" })}
  ${tablet({ fontSize: "20px" })}
`;
const Buttons = styled.h4`
  cursor: pointer;
  &:hover {
    color: #026af1;
  }

  ${mobile({ fontSize: "12px" })}
`;

const Login = styled.div`
  /* margin-right: 20px; */
  cursor: pointer;
  &:hover {
    color: #026af1;
  }
  ${mobile({ fontSize: "12px" })}
`;
const Icon = styled.div`
  cursor: pointer;
  color: blue;
`;

const Name = styled.span`
  color: #2e89ff;
  font-size: 16px;
  margin-right: 5px;
  font-weight: bold;
  ${mobile({ display: "none" })}
`;

const MuiIcon = styled(CastleIcon)`
  &.materialIcon {
    display: none;
    cursor: pointer;
    font-size: 30px;
    &:hover {
      color: #026af1;
    }
    ${mobile({ display: "block" })}
  }
`;

function Navbar() {
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Container>
      <Link to="/products/" style={{ textDecoration: "none" }}>
        <Buttons>Products</Buttons>
      </Link>
      <Link to="/products/men" style={{ textDecoration: "none" }}>
        <Buttons>Men</Buttons>
      </Link>
      <Link to="/products/women" style={{ textDecoration: "none" }}>
        <Buttons>Women</Buttons>
      </Link>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Logo>Hidden Palace</Logo>
        <MuiIcon className="materialIcon" />
      </Link>
      <Link to="/about" style={{ textDecoration: "none" }}>
        <Buttons>About</Buttons>
      </Link>

      <Icon>
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <Name>{user?.first}</Name>
          <Badge badgeContent={quantity} color="primary">
            <LocalMallOutlined />
          </Badge>
        </Link>
      </Icon>
      {user ? (
        <Login onClick={() => handleClick()}>Logout</Login>
      ) : (
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Login>Login</Login>
        </Link>
      )}
    </Container>
  );
}

export default Navbar;
