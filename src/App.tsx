import * as React from 'react';
import HomePage from "./components/pages/HomePage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from "./config/routes";
import HelpPage from './components/pages/Help';
import FaqPage from './components/pages/FAQ';

export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <div className="Appppp">
      <BrowserRouter>
      <Routes>
        {/* {routes.map((route, index)=>{
          return (
            <Route key={index}
            path = {route.path}
            render = {(props:any )=>{
              <route.component
              {...props}
              {...route.props} />
            }}
          )
        })} */}

  {routes.map((route, index)=>{
          return (
            <Route key={index}
            path = {route.path}
            element = {<route.component {...props} {...route.props}/>} />
          )
        })} 
      </Routes>
      </BrowserRouter>

    </div>
  );
}
