import { css } from "styled-components";

export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 920px) {
      ${props}
    }
  `;
};

export const mid = (props) => {
  return css`
    @media only screen and (max-width: 750px) {
      ${props}
    }
  `;
};

export const mobile = (props) => {
  return css`
    @media only screen and (min-width: 250px) and (max-width: 510px) {
      ${props}
    }
  `;
};
