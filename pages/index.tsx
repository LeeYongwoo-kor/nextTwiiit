import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface IProfileResponse {
  ok: boolean;
  profile: IUser;
}

const Home: NextPage = () => {
  console.log("Hello");
  const router = useRouter();
  const { data, error } = useSWR<IProfileResponse>("/api/users/me");

  useEffect(() => {
    if ((data && !data.ok) || error) {
      router.replace("/create-account");
    }
  }, [data, error, router]);

  return (
    <div>
      <h1>Welcome </h1>
      <span>Your email is: </span>
    </div>
  );
};

export default Home;
