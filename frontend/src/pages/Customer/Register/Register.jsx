import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate  } from "react-router-dom";
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { ToastContainer, toast } from 'react-toastify';

import './register.scss';

function Register(props) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone: '',
        gender: ''
    });
    const [showPassword, setShowPassword] = useState([]);
    const navigate = useNavigate();

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(formData.password.length >= 6 && formData.confirm_password.length >= 6){
            const response = await fetch('/api/auth/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/login');
            }else{
                toast.error('Đăng ký thất bại. Vui lòng kiểm tra lại thông tin');
            }
        } else {
            toast.error('Mật khẩu phải ít nhất là 6 ký tự');
        }
    }

    const handleTogglePassword = (index) =>{
        setShowPassword((prevPasswords) => {
            const updatedPasswords = [...prevPasswords];
            updatedPasswords[index] = !updatedPasswords[index];
            return updatedPasswords;
        });
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <Container className="block-register">
            
                
            <form onSubmit={handleSubmit}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
            <div className="card-header d-flex justify-content-center">
                <h3 className="text-center text-primary font-weight-bold">P</h3>
                <h3 className="text-center text-success font-weight-bold">E</h3>
                <h3 className="text-center text-danger font-weight-bold">T</h3>
                <h3 className="text-center text-warning font-weight-bold">S</h3>
                <h3 className="text-center text-info font-weight-bold">H</h3>
                <h3 className="text-center text-secondary font-weight-bold">O</h3>
                <h3 className="text-center text-dark font-weight-bold">P</h3>
            </div>
              <div className="card-body">
                <div className="form-group">
                  <div>
                    <input
                      type="text"
                      className="form-control mb-3"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="Nhập tên của bạn"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      className="form-control mb-3"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Nhập họ của bạn"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control mb-3"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Nhập email của bạn"
                    required
                  />
                </div>

                <div className="form-group">
                  <div>
                    <input
                      type="text"
                      className="form-control mb-3"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>

                <div className="form-group">
                  <input
                    type={showPassword[0] ? 'text' : 'password'}
                    className="form-control mb-3"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu của bạn"
                    required
                  />
                  {showPassword[0] ? (
                    <FaEyeSlash className="toggle-password-icon" onClick={() => handleTogglePassword(0)} />
                  ) : (
                    <FaEye className="toggle-password-icon" onClick={() => handleTogglePassword(0)} />
                  )}
                </div>

                <div className="form-group">
                  <input
                    type={showPassword[1] ? 'text' : 'password'}
                    className="form-control mb-3 "
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu của bạn"
                    required
                  />
                  {showPassword[1] ? (
                    <FaEyeSlash className="toggle-password-icon" onClick={() => handleTogglePassword(1)} />
                  ) : (
                    <FaEye className="toggle-password-icon" onClick={() => handleTogglePassword(1)} />
                  )}
                </div>
                  <select
                    className="form-control mb-3"
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option>Giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
                </div>

                <div className="form-group d-flex justify-content-center">
                  <input
                    type="submit"
                    className="btn btn-primary btn-block"
                    value="Đăng ký"
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

export default Register;