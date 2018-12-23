// import 'babel-polyfill' // 88kb/28.7kb
import React from "react";
import { render } from "react-dom";

import { protect, unprotect, config } from '@kard/auth-guard';

import "./index.scss";

const authorize = () => sessionStorage.setItem('isAuthorized', 'yes');
const unAuthorize = () => sessionStorage.setItem('isAuthorized', '');
const isAuthorized = () => sessionStorage.getItem('isAuthorized');

config({
  useHash: true,
  testProtected: (path) => (path != '/' && path != '/404'),
  loginPath: '/login',
  prefix: 'apx:'
})

if(!isAuthorized()){ protect() }

render(
  <div>
    <h1>auth-guard example</h1>
    <h2>{`Authorized: ${!!isAuthorized()}`}</h2>
    <div className="controls">
      { !isAuthorized() && <button onClick={ ()=>{
        authorize()
        unprotect()
      } }>Login</button> }
      { !!isAuthorized() && <button onClick={ ()=>{
        unAuthorize()
        protect()
      } }>Logout</button> }
    </div>
  </div>
, document.getElementById("root"));
