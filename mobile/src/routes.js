import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Book from './pages/Book';
import List from './pages/List';
import Login from './pages/Login';

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    List,
    Book,
  })
);

export default Routes;