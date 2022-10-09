import type { NextPage } from "next";
import { Suspense } from "react";

const Home: NextPage = () => {
  // Not Login -> replace Login
  return <Suspense fallback={<span>Loading...</span>}></Suspense>;
};

export default Home;
