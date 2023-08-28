import React, { useEffect } from "react";
import type { GetServerSideProps } from "next";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux-slices/User";
import { destroyCookie } from "nookies";

import ProfileInfo from "@/components/Profile";
import Sidebar from "@/components/Sidebar";
import HeaderSEO from "@/components/HeaderSEO";
import Header from "@/components/Header";

export default function Profile({ user }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logIn(user));
    // console.log("login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log(user?.name, "[user]");
  }, [user]);

  return (
    <>
      <HeaderSEO
        title={`${user.userName} | SkillSync Dashboard `}
        description={null}
      />
      <Header />

      <main className="flex">
        <Sidebar />
        <ProfileInfo />
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/get`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();

    if (
      context.query.user?.toString().toLowerCase() !==
      data.user.userName.toLowerCase()
    ) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
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
