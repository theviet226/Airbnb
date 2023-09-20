
import { RouterProvider } from "react-router-dom";
import { router } from './router';

import { GlobalStyle } from "./components/global-style";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/config-store";

export function App() {
  return (
    <ReduxProvider store={store}>
      
        <GlobalStyle>
          <RouterProvider router={router}></RouterProvider>
        </GlobalStyle>
      
    </ReduxProvider>
  )
}

