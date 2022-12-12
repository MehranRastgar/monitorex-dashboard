import React, { useEffect } from "react";
import Layout from "../src/components/layout/Layout";
// import Router from "next/router";

export default function _error() {
  useEffect(() => {
    // Router.push("/");
  });

  return (
    <>
      <Layout>there is error</Layout>
    </>
  );
}
