import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import { Suspense } from "react";
export function BaseTemplate() {
  return (
    <>
      <Header />
      <Suspense fallback={<>Loading...</>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}
