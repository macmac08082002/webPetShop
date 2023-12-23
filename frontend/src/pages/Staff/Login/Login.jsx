import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate  } from "react-router-dom";
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

import "./login.scss";

function Login(props) {
  const [accessToken, setAccessToken] = useState(null);
  const [infoLogin, setInfoLogin] = useState({
    email: "",
    password: "",
    page: "admin",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () =>{
    setShowPassword(!showPassword);
  }

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    if(infoLogin.password.length >= 6){
      const response = await fetch("/api/auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoLogin),
      });
      const data = await response.json();
  
      if(response.ok){
        setAccessToken(data.accessToken);
        sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      } else {
        toast.error('Đăng nhập thất bại');
      }
    } else {
      toast.error('Mật khẩu phải ít nhất là 6 ký tự');
    }
  };

  const loginAccessToken = async () =>{
    const response = await fetch('/api/auth/', {
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
    });
    const user = await response.json();
    
    if(user){
        sessionStorage.setItem('user', JSON.stringify(user));
        navigate('/staff');
    }
  }

  if(accessToken) loginAccessToken();

  return (
    <section className="login">
        <ToastContainer 
            position="top-right"
            autoClose={3000}
        />
        <Container fluid>
        <Row className="justify-content-center">
            <Col xs={8}>
                <div className="login__main">
                
                  <div className='card-header d-flex justify-content-center'>
                    <h3 className='text-center text-primary font-weight-bold'>P</h3>
                    <h3 className='text-center text-success font-weight-bold'>E</h3>
                    <h3 className='text-center text-danger font-weight-bold'>T</h3>
                    <h3 className='text-center text-warning font-weight-bold'>S</h3>
                    <h3 className='text-center text-info font-weight-bold'>H</h3>
                    <h3 className='text-center text-secondary font-weight-bold'>O</h3>
                    <h3 className='text-center text-dark font-weight-bold'>P</h3>
                  </div>


                    <form className="login__form" action="post" onSubmit={handleSubmitLogin}>
                        <div className="form-group">
                            <input
                                placeholder="Email"
                                type="text"
                                name="email"
                                onChange={(event) =>
                                    setInfoLogin({ ...infoLogin, email: event.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                placeholder="Password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                onChange={(event) =>
                                    setInfoLogin({ ...infoLogin, password: event.target.value })
                                }
                                required
                            />
                            {showPassword ? (
                                <FaEyeSlash onClick={handleTogglePassword} />
                            ) : (
                                <FaEye onClick={handleTogglePassword} />
                            )}
                        </div>
                        <button type="submit" className="btn btn-success">
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </Col>
        </Row>
        </Container>
    </section>
  );
}

export default Login;
