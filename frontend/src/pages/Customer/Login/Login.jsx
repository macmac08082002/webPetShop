import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import './login.scss';
import { fetchInitCart } from '../../../actions/cart';

function Login() {
  const [accessToken, setAccessToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    page: 'user',
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const loginAccessToken = async () => {
    const response = await fetch('/api/auth/', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = await response.json();

    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    }
  };

  if (accessToken) {
    loginAccessToken();
    fetchInitCart(accessToken);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password.length >= 6) {
      const response = await fetch('/api/auth/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setAccessToken(data.accessToken);
        sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      } else {
        toast.error('Đăng nhập thất bại');
      }
    } else {
      toast.error('Mật khẩu phải ít nhất là 6 ký tự');
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Container className='block-login'>
        <form onSubmit={handleSubmit}>
          <div className='container mt-5'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-header d-flex justify-content-center'>
                    <h3 className='text-center text-primary font-weight-bold'>P</h3>
                    <h3 className='text-center text-success font-weight-bold'>E</h3>
                    <h3 className='text-center text-danger font-weight-bold'>T</h3>
                    <h3 className='text-center text-warning font-weight-bold'>S</h3>
                    <h3 className='text-center text-info font-weight-bold'>H</h3>
                    <h3 className='text-center text-secondary font-weight-bold'>O</h3>
                    <h3 className='text-center text-dark font-weight-bold'>P</h3>
                  </div>
               <div className="card-body">
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control mb-3'
                      name='email'
                      onChange={handleChange}
                      placeholder='Nhập email của bạn'
                      required
                    />
                  </div>

                  <div className='form-group'>
                    <div className='input-group'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className='form-control mb-3'
                        name='password'
                        onChange={handleChange}
                        placeholder='Nhập mật khẩu của bạn'
                        required
                      />
                        {showPassword ? (
                          <FaEyeSlash className="password" onClick={handleTogglePassword} />
                        ) : (
                          <FaEye className="password"  onClick={handleTogglePassword} />
                        )}
              
                      
                    </div>
                    <input type='hidden' name='page' />
                  </div>

                  <div className='form-group d-flex justify-content-center'>
                    <input
                      type='submit'
                      className='btn btn-primary btn-block'
                      value='Đăng nhập'
                    />
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </>
  );
}

export default Login;
