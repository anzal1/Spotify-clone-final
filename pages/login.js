import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-toastify";

function Login({ providers }) {
  const notify = () =>
    toast("Logging in! Please wait...", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      isLoading: true,
      theme: "dark",
      type:"success"
    });
  return (
    <div
      className="flex flex-col items-center bg-black
    min-h-screen w-full justify-center"
    >
      <Image
        src="https://rb.gy/y9mwtb"
        height={250}
        width={600}
        objectFit="contain"
        className="animate-pulse"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider}>
          <button
            onClick={() => {
              notify();
              signIn(provider.id, { callbackUrl: "/" });
            }}
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
