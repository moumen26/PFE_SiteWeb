import { FaUserMd } from "react-icons/fa";
import img from "../images/login-bg.png";
import React, { useState, useEffect } from "react";
import AcceeButton from "../components/acceeButton";
import BackButton from "../components/backLoginbutton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [openPanel, setOpenPanel] = useState(false);

  let toggleClassCheck = openPanel ? " sign-in-mode" : "";

  const [loginemail, setloginEmail] = useState('');
  const [loginpassword, setloginpassword] = useState('');
  const { login, isloadingL, errorL } = useLogin();
  async function submitLogin(e) {
    e.preventDefault();
    await login(loginemail,loginpassword);
  }
  const [signinemail, setSigninEmail] = useState('');
  const [signinpassword, setSigninpassword] = useState('');
  const [lname, setLname] = useState('');
  const [fname, setFname] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [phone, setPhone] = useState('');
  const { sign_up, isloading, error } = useSignup();

  async function submitSignup(e) {
    e.preventDefault();
    await sign_up(signinemail,signinpassword, lname, fname, speciality, phone);
  }

  return (
    <div className={`container${toggleClassCheck}`}>
      <div className="forms-container">
        <div className="login-signin">
          
          <form action="/login" onSubmit={submitLogin} className="login-in-form">
            <h2 className="title-login">connexion</h2>
            <div className="input-field email">
              <label htmlFor="">email</label>
              <input type="email" value={loginemail} name="loginEmail" onChange={(e) => {setloginEmail(e.target.value)}} placeholder="Enter your email.." />
            </div>
            <div className="input-field password">
              <label htmlFor="">password</label>
              <input type="password" value={loginpassword} name="loginpassword" onChange={(e) => {setloginpassword(e.target.value)}} placeholder="Enter your password.." />
              <div className="forget-class">
                <a>I forget my password</a>
              </div>
            </div>
            <input
              type="submit"
              value="connexion"
              className="cnx-btn btn-solid"
              disabled={isloadingL}
            />
            {errorL && <div className="error">{errorL.error}</div>}
          </form>

          <form action="/signup" onSubmit={submitSignup} className="sign-in-form">
            <div className="input-field">
              <label htmlFor="">Last name</label>
              <input type="text" value={lname} name="Lname" onChange={(e) => {setLname(e.target.value)}} placeholder="Enter your name.." />
            </div>
            <div className="input-field">
              <label htmlFor="">first name</label>
              <input type="text" value={fname} name="Fname" onChange={(e) => {setFname(e.target.value)}} placeholder="Enter your first name.." />
            </div>
            <div className="input-field">
              <label htmlFor="">email</label>
              <input type="text" value={signinemail} name="SigninEmail" onChange={(e) => {setSigninEmail(e.target.value)}} placeholder="Enter your email.." />
            </div>
            <div className="input-field">
              <label htmlFor="">password</label>
              <input type="password" value={signinpassword} name="Signinpassword" onChange={(e) => {setSigninpassword(e.target.value)}} placeholder="Enter your password.." />
            </div>
            <div className="input-field">
              <label htmlFor="">speciality</label>
              <input type="text" value={speciality} name="speciality" onChange={(e) => {setSpeciality(e.target.value)}} placeholder="Enter your speciality.." />
            </div>
            <div className="input-field">
              <label htmlFor="">hopital</label>
              <select
                class="nouveau-ne-chart"
                name="nouveau-ne-chart"
                id="nouveau-ne-chart"
              >
                <option selected disabled>
                  Enter your hospital..
                </option>
                <option value="h1">Hospital 1</option>
                <option value="h2">Hospital 2</option>
                <option value="h3">Hospital 3</option>
                <option value="h4">Hospital 4</option>
              </select>
            </div>
            <div className="input-field">
              <label htmlFor="">phone number</label>
              <input type="tel" value={phone} name="phone" onChange={(e) => {setPhone(e.target.value)}} placeholder="Enter your phone number.." />
            </div>
            <button className="demande-accee2" disabled={isloading}>demande accee</button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <a href="#">
              H
              <span>
                <FaUserMd size="32px" fill="#3889c1" />
              </span>
              SPITALI
            </a>
            <AcceeButton openPanel={openPanel} setOpenPanel={setOpenPanel} />
          </div>
          <div className="image-login">
            <img src={img} alt="" />
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <a href="#">
              H
              <span>
                <FaUserMd size="32px" fill="#3889c1" />
              </span>
              SPITALI
            </a>
            <p>
              Your request will be checked by the administration, and after a
              few days we will inform you by e-mail and SMS
            </p>
            <BackButton openPanel={openPanel} setOpenPanel={setOpenPanel} />
          </div>
        </div>
      </div>
    </div>
  );
}
