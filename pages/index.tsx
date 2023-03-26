import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <>
      <h1 className="text-2xl">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <p className="text-white">Login as {user?.name}</p>
      <button
        onClick={() => signOut()}
        className="bg-red-600 h-10 text-white w-full py-3 mt-10 rounded-md hover:bg-red-700 transition"
      >
        Sign out
      </button>
    </>
  );
}
