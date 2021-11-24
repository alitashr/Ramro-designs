import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from "./config/routes";
import { Provider } from 'react-redux';
import store from './redux/store';
export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
