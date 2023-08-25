import React, { useEffect } from "react";
import type { GetServerSideProps } from "next";
import { destroyCookie } from "nookies";

import Sidebar from "@/components/Sidebar";
import HeaderSEO from "@/components/HeaderSEO";
import ConnectionsInfo from "@/components/ConnectionInfo";
import Header from "@/components/Header";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux-slices/User";

export default function Profile({ user }: any) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logIn(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <HeaderSEO
        title={`${user.userName} Connections | SkillSync Dashboard `}
        description={null}
      />
      <Header />
      <main className="flex">
        <Sidebar />
        <ConnectionsInfo />
      </main>
    </>
  );
}

// SSR

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  if (token) {
    let headersList: any = {
      "x-auth-token": token,
    };

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/connections/getall`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();

    return { props: { user: data.user } };
  }
  destroyCookie(context, "token");
  return {
    redirect: {
      destination: "/login",
      permanent: true,
    },
  };
};
