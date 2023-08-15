import React from "react";
import Sidebar from "@/components/Sidebar";

import HeaderSEO from "@/components/HeaderSEO";
import ConnectionsInfo from "@/components/ConnectionInfo";

export default function Profile({ userName }: any) {
  return (
    <>
      <HeaderSEO
        title={`${userName} Connections | SkillSync Dashboard `}
        description={null}
      />
      <main className="flex">
        <Sidebar />
        <ConnectionsInfo />
      </main>
    </>
  );
}

// SSR
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let user: any = context.query.user;
  user = user.split("");
  user[0] = user[0].toUpperCase();
  user = user.join("");
  return { props: { userName: user } };
};
