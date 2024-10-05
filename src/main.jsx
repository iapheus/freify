import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { store } from './redux/store';
import { Provider, useSelector} from 'react-redux';
import RoutedPage from './router/RoutedPage.jsx';
import ChangeTheme from './components/ChangeTheme.jsx';

const Main = () => {
  return (
    <Provider store={store}>    
      <AppWrapper />
    </Provider>
  );
};

const AppWrapper = () => {
  const themeValue = useSelector((state) => state.general.theme);
  return (
    <Theme appearance={themeValue}>
        <ChangeTheme/>
        <RoutedPage/>
    </Theme>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Main />
);
