import {  LogoutIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState, playlistIdState } from "../atoms/paylistatom";
import spotifyApi from "../lib/spotify";
import useSpotify from "../hooks/useSpotify";
import Songs from "./songs";
import { toast } from "react-toastify";
const colors = [
  "from-indigo-500",
  "from-purple-500",
  "from-pink-500",
  "from-orange-500",
  "from-green-500",
  "from-teal-500",
  "from-blue-500",
  "from-red-500",
  "from-yellow-500",
  "from-gray-500",
];

const notify = () =>
  toast("Logging out! Please wait...", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    isLoading: true,
    theme: "dark",
    type: "success",
  });

function Center() {
  const { data: session } = useSession();
  const spotify = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlayist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotify
      .getPlaylist(playlistId)
      .then((data) => {
        setPlayist(data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [spotifyApi, playlistId]);

  console.log(playlist);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white"
          onClick={() => {
            notify();
            signOut();
          }}
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2 className="hidden md:inline">{session?.user.name}</h2>
          <LogoutIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 
      bg-gradient-to-b to-black ${color} h-80 text-white p-8 w-full`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p> PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
