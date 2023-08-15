import HeaderSEO from "@/components/HeaderSEO";
import UserModel from "@/models/User";
import { verify } from "@/utils/server-utils";
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // Fetch data from external API
  const { token } = req.cookies;
  if (token) {
    const payload: any = await verify(token, process.env.JWT_PRIVATE_KEY);
    const { id } = payload.userId;
    const user = await UserModel.findById(id);
    // console.log(user.name);
    return {
      redirect: {
        destination: `/profile/${user.name}`,
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
