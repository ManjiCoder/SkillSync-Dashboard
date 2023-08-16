import HeaderSEO from "@/components/HeaderSEO";
import UserModel from "@/models/User";
import { verify } from "@/utils/server-utils";
import dbConnect from "@/utils/dbConnect";
import { destroyCookie } from "nookies";

export default function Home() {
  return (
    <>
      <HeaderSEO title={null} description={null} />
      <main className="bg-slate-600 min-h-screen">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>
    </>
  );
}

// SSR
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const { token } = context.req.cookies;
  if (token) {
    const payload: any = await verify(token, process.env.JWT_PRIVATE_KEY);
    const { id } = payload.userId;
    await dbConnect();
    const user = await UserModel.findById(id);
    if (user) {
      return {
        redirect: {
          destination: `/profile/${user.name}`,
          permanent: true,
        },
      };
    }
    destroyCookie(context, "token");

    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }

  // Pass data to the page via props
  return {
    redirect: {
      destination: "/login",
      permanent: true,
    },
  };
};
