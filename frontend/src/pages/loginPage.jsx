import { FaUserMd } from "react-icons/fa";
import img from "../images/login-bg.png";
import React, { useState, useEffect } from "react";
import AcceeButton from "../components/buttons/buttonAccee";
import BackButton from "../components/buttons/buttonBackLogin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Login() {
  const notify = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const [openPanel, setOpenPanel] = useState(false);
  const [alertError, setAlertError] = useState(false);

  let toggleClassCheck = openPanel ? " sign-in-mode" : "";

  const [loginemail, setloginEmail] = useState("");
  const [loginpassword, setloginpassword] = useState("");
  const [isloadingL, setIsLoadingL] = useState(null);
  const [errorL, setErrorL] = useState(null);

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  async function submitLogin(e) {
    e.preventDefault();
    setIsLoadingL(true);
    const reponse = await fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: loginemail, password: loginpassword }),
    });

    const json = await reponse.json();

    if (!reponse.ok) {
      setIsLoadingL(false);
      notify(json.message);
    }
    if (reponse.ok) {
      notify(json.message);
      //save the user in local storage
      localStorage.setItem("user", JSON.stringify(json));
      //apdate the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoadingL(false);
      //redirect to home page
      if (!json.progress) {
        navigate("/profile");
      } else {
        navigate("/");
      }
    }
  }
  const [signinemail, setSigninEmail] = useState("");
  const [signinpassword, setSigninpassword] = useState("");
  const [lname, setLname] = useState("");
  const [fname, setFname] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [phone, setPhone] = useState("");
  const [Hopital, setHopital] = useState("");
  const [isloading, setIsLoading] = useState(null);

  async function submitSignup(e) {
    e.preventDefault();
    setIsLoading(true);
    const reponse = await fetch("http://localhost:8000/user/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: signinemail,
        password: signinpassword,
        Lname: lname,
        Fname: fname,
        speciality: speciality,
        phone: phone,
        Hopital: Hopital,
      }),
    });

    const json = await reponse.json();
    if (!reponse.ok) {
      setIsLoading(false);
      notify(json.message);
    }
    if (reponse.ok) {
      notifySuccess(json.message);
    }
  }

  return (
    <div className={`Login container${toggleClassCheck}`}>
      <div className="forms-container">
        <div className="login-signin">
          <form
            action="/login"
            onSubmit={submitLogin}
            className="login-in-form"
          >
            <h2 className="title-login">connexion</h2>
            <div className="input-field email">
              <label htmlFor="">email</label>
              <input
                type="email"
                value={loginemail}
                name="loginEmail"
                onChange={(e) => {
                  setloginEmail(e.target.value);
                }}
                placeholder="Enter your email.."
              />
            </div>
            <div className="input-field password">
              <label htmlFor="">password</label>
              <input
                type="password"
                value={loginpassword}
                name="loginpassword"
                onChange={(e) => {
                  setloginpassword(e.target.value);
                }}
                placeholder="Enter your password.."
              />
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
          </form>

          <form
            action="/signup"
            onSubmit={submitSignup}
            className="sign-in-form"
          >
            <div className="input-field">
              <label htmlFor="">Last name</label>
              <input
                type="text"
                value={lname}
                name="Lname"
                onChange={(e) => {
                  setLname(e.target.value);
                }}
                placeholder="Enter your name.."
              />
            </div>
            <div className="input-field">
              <label htmlFor="">first name</label>
              <input
                type="text"
                value={fname}
                name="Fname"
                onChange={(e) => {
                  setFname(e.target.value);
                }}
                placeholder="Enter your first name.."
              />
            </div>
            <div className="input-field">
              <label htmlFor="">email</label>
              <input
                type="text"
                value={signinemail}
                name="SigninEmail"
                onChange={(e) => {
                  setSigninEmail(e.target.value);
                }}
                placeholder="Enter your email.."
              />
            </div>
            <div className="input-field">
              <label htmlFor="">password</label>
              <input
                type="password"
                value={signinpassword}
                name="Signinpassword"
                onChange={(e) => {
                  setSigninpassword(e.target.value);
                }}
                placeholder="Enter your password.."
              />
            </div>
            <div className="input-field">
              <label htmlFor="">speciality</label>
              <input
                type="text"
                value={speciality}
                name="speciality"
                onChange={(e) => {
                  setSpeciality(e.target.value);
                }}
                placeholder="Enter your speciality.."
              />
            </div>
            <div className="input-field">
              <label htmlFor="">hopital</label>
              <select
                class="nouveau-ne-chart"
                name="nouveau-ne-chart"
                id="nouveau-ne-chart"
                value={Hopital}
                onChange={(e) => setHopital(e.target.value)}
              >
                <option selected disabled>
                  Enter your hospital..
                </option>
                <option value="Hospital 1">Hospital 1</option>
                <option value="Hospital 2">Hospital 2</option>
                <option value="Hospital 3">Hospital 3</option>
                <option value="Hospital 4">Hospital 4</option>
              </select>
            </div>
            <div className="input-field">
              <label htmlFor="">phone number</label>
              <input
                type="tel"
                value={phone}
                name="phone"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="Enter your phone number.."
              />
            </div>
            <button className="demande-accee2" disabled={isloading}>
              demande accee
            </button>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <a href="">
              <div className="logo flex items-center justify-items-center">
                H
                <FaUserMd size="37px" fill="#3889c1" className="pb-2" />
                SPITALI
              </div>
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
              <div className="logo flex items-center justify-items-center">
                H
                <FaUserMd size="37px" fill="#3889c1" className="pb-1" />
                SPITALI
              </div>
            </a>
            <p>
              Your request will be checked by the administration, and after a
              few days we will inform you by e-mail and SMS
            </p>
            <BackButton openPanel={openPanel} setOpenPanel={setOpenPanel} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
