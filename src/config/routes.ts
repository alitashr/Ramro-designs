import IRoute from "../interfaces/route"; 
import FaqPage from "../components/pages/FAQ";
import HelpPage from "../components/pages/Help";
import AboutPage from "../components/pages/About";
import EntryPage from "../components/pages/EntryPage";
import CartPage from "../components/pages/CartPage";

const routes: IRoute[]=[
  {
    path: '/',
    name: 'Entry Page',
    component: EntryPage
  },
  {
    path: '/:page',
    name: 'Home Page',
    component: EntryPage
  },
  {
    path: '/:cart',
    name: 'Cart Page',
    component: CartPage
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
  }
  
]

export default routes