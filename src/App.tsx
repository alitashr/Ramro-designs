import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from "./config/routes";

export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <div className="Appppp">
      <BrowserRouter>
      <Routes>

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
