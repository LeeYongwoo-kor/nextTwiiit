import type { NextPage } from "next";
import { Suspense } from "react";

const Home: NextPage = () => {
  <Suspense fallback={<span>Loading...</span>}></Suspense>;
  // Not Login -> replace Login
  return "Hi";
};

export default Home;
