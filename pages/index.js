import { getSession } from "next-auth/react";
import Head from "next/head";
import Center from "../components/center";
import Player from "../components/player";
import Sidebar from "../components/sidebar";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify-2.0</title>
      </Head>
      <main className="flex ">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
      <Player />
      </div>
    </div>
  );
}


export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}