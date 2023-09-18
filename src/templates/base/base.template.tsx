import { Outlet } from "react-router-dom"
import Header from "../header"
import Footer from "../footer"

export function BaseTemplate() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

