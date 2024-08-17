import { createGlobalStyle } from "styled-components";

import { ErrorMessage, Field } from "formik";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    /* margin: 0; */
    padding: 0;
}

  body {
    font-family: Arial, sans-serif;
    background-color:#E6EEFA;
    /* margin: 0; */
    padding: 0;
    color:#05163E;
    height: 100vh;  }
 
`;

export default GlobalStyle;

export const InputGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

export const Input = styled(Field)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  box-sizing: border-box;

  &:focus {
    border-color: #0f71f2;
    outline: none;
  }
`;
export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;
export const ErrorText = styled(ErrorMessage)`
  color: #ff3b30;
  font-size: 14px;
  margin-top: 4px;
`;

export const Button = styled.button`
  background-color: #0f71f2;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0568d3;
  }

  &:disabled {
    background-color: #9e9e9e;
    cursor: not-allowed;
  }
`;
