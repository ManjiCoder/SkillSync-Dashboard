import React from "react";
import ProfileInfo from "@/components/Profile";
import Sidebar from "@/components/Sidebar";

export default function Profile({ userName }: any) {
  return (
    <>
      <HeaderSEO
        title={`${userName} Profile | SkillSync Dashboard `}
        description={null}
      />
      <main className="flex">
        <Sidebar />
        <ProfileInfo />
      </main>
    </>
  );
}

// SSR
import type { GetServerSideProps } from "next";
import HeaderSEO from "@/components/HeaderSEO";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let user: any = context.query.user;
  user = user.split("");
  user[0] = user[0].toUpperCase();
  user = user.join("");
  return { props: { userName: user } };
};
