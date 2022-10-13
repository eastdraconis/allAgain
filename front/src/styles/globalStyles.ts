import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');

  * {
    box-sizing: border-box;
  }

  html,
  body {
    background: ${({ theme }) => theme.colors.bodyBg};
    font-family: 'Noto Sans KR', sans-serif;
    font-size: ${({ theme }) => theme.fontSizes.bodyText};
    font-weight: 400;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.bodyText};
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: nonoe;
    background: tranparent;
  }

  a:hover,
  a:active,
  a:visited,
  a:link {
    color: inherit;
    text-decoration: none;
    background-color: transparent;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
  
  button,
  input {
    overflow: visible;
  }
  
  button,
  select {
    text-transform: none;
  }

  button {
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
  }
  
  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }
  
  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  
  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  img {
    width: 100%;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #e0d6be;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #AFA58D;
  }

`

export default GlobalStyle;