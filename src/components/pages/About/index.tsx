import * as React from 'react';
import { RouteMatch, RouteProps, RouterProps, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import IPage from '../../../interfaces/page';


export default function AboutPage (props: RouterProps) {
  const params = useParams();
  console.log(params);

  React.useEffect(()=>{

    console.log(props);
   
    
  }, [])
 
  return (
    <div>
      THis is Help page
    </div>
  );
}
