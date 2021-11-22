import * as React from 'react';
import HomePage from "./components/pages/HomePage";


export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <div>
      <HomePage></HomePage>
    </div>
  );
}
