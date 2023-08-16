import React from "react";
import type { GetServerSideProps } from "next";
import { destroyCookie } from "nookies";

import Sidebar from "@/components/Sidebar";
import HeaderSEO from "@/components/HeaderSEO";
import ConnectionsInfo from "@/components/ConnectionInfo";
import Header from "@/components/Header";

export default function Profile({ userName }: any) {
  return (
    <>
      <HeaderSEO
        title={`${userName} Connections | SkillSync Dashboard `}
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

    let response = await fetch("http://localhost:3000/api/connections/getall", {
      method: "GET",
      headers: headersList,
    });

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
