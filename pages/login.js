import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black
    min-h-screen w-full justify-center">
      <Image
        src="https://rb.gy/y9mwtb"
        height={250}
        width={600}
        objectFit="contain"
        className="animate-pulse"
      />
      {Object.values(providers).map((provider) => (
        <div>
          <button className="bg-[#18D860] text-black p-5 rounded-full 
          hover:bg-[#006e2a]  hover:text-white"
          onClick={() => signIn(provider.id ,{callbackUrl: "/"})}
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
