import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import { Suspense } from "react";
import css from "./base.module.scss"
export function BaseTemplate() {
  return (
    <>
      <Header />
      <Suspense fallback={<>
        <div className={css["loading-center"]}>
      <div className={css["loading-ring"]}></div>
        <span className={css["loading-span"]}>loading...</span>
    </div>
      </>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}
