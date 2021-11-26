import IRoute from "../interfaces/route"; 
import HomePage from "../components/pages/HomePage";
import FaqPage from "../components/pages/FAQ";
import HelpPage from "../components/pages/Help";
import AboutPage from "../components/pages/About";
import ElegantPage  from "../components/pages/ElegantPage";
import SignaturePage from "../components/pages/SignaturePage";

const routes: IRoute[]=[
  {
    path: '/',
    name: 'Home Page',
    component: HomePage
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FaqPage
  },
  {
    path: '/help',
    name: 'Help',
    component: HelpPage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/about/number',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/elegant',
    name: 'Elegant Designs',
    component: ElegantPage,
  },
  {
    path: '/signature',
    name: 'Signature Designs',
    component: SignaturePage,
  },
  
]

export default routes