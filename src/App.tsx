
import { RouterProvider } from "react-router-dom";
import { router } from './router';

import { GlobalStyle } from "./components/global-style";

export function App() {
  return (
    <GlobalStyle>
      <RouterProvider router={router}></RouterProvider>
    </GlobalStyle>
  )
}

