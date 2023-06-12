import styled from "styled-components";
import axios from "axios";
import { buttonsLigthBlue } from "../Constants/Colors";
import { useState, useContext } from "react";
import Logo from "../Assets/mind.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AppContext/auth";
import { ThreeDots } from "react-loader-spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { saveToken, saveImg } = useContext(AuthContext);

  function loginApp(e) {
    e.preventDefault();
    setLoading(true);
    const URL =
    process.env.REACT_APP_API_URL;
    const body = { email, password };
    const promise = axios.post(URL, body);
    promise.then((res) => {
      saveToken(res.data.token);
      saveImg(res.data.image);
      navigate("/hoje");
      setLoading(false);
    });
    promise.catch((err) => {
      setLoading(false);
      alert(err.response.data.message);
    });
  }

  return (
    <LoginContainer>
      <LogoStyle>
        <img src={Logo} />
      </LogoStyle>

      <FormStyle onSubmit={loginApp}>
        <input
          disabled={loading ? true : false}
          data-test="email-input"
          placeholder="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <input
          disabled={loading ? true : false}
          data-test="password-input"
          placeholder="senha"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          data-test="login-btn"
          type="submit"
          disabled={loading ? true : false}
        >
          {loading ? <ThreeDots color="#ffffff" /> : "Entrar"}
        </button>
      </FormStyle>
      <LinkStyle>
        <Link to="/cadastro" data-test="singup-link">
          Não tem uma conta? Cadastre-se!
        </Link>
      </LinkStyle>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  height: 100vh;
  background-color: #152238;
`;

const LogoStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 68px;
  padding-bottom: 40px;
  img{
    height:250px;
  }
`;
const FormStyle = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    width: 303px;
    height: 45px;
    margin-bottom: 6px;
    font-size: 20px;
    padding-left: 7px;
  }
  input::placeholder {
    color: dark-gray;
  }
  button {
    background-color: ${buttonsLigthBlue};
    border-color: ${buttonsLigthBlue};
    border-radius: 5px;
    width: 303px;
    height: 45px;
    color: #ffffff;
    font-weight: 400;
    font-size: 21px;
    line-height: 26px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const LinkStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 25px;
  a {
    color: ${buttonsLigthBlue};
  }
`;
