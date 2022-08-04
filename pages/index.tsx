import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: NextPage = (props) => {
  const router = useRouter();
  const onClick = (id) => {
    router.push(`/person/${id}`);
  };
  const [bilionaries, setBilionaries] = useState();
  useEffect(() => {
    (async () => {
      const results = await (
        await fetch(`https://billions-api.nomadcoders.workers.dev/`)
      ).json();
      setBilionaries(results);
    })();
  }, []);

  return (
    <div className="grid items-center justify-center min-h-screen py-6 bg-slate-800">
      <Head>
        <title>Billions - API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid grid-cols-4 gap-12 mt-8 items-center justify-center text-center">
        {bilionaries?.slice(0, 40).map((bill) => (
          <div
            className="flex flex-col justify-around items-baseline bg-slate-900 w-72 h-80 border-solid border-2 border-indigo-800 overflow-hidden"
            key={bill.id}
            onClick={() => onClick(bill.id)}
          >
            <img src={bill.squareImage} className="text-white" />
            <div className="text-white text-2xl pl-2">{bill.name}</div>
            <div className="text-white mb-12 pl-2">
              {parseInt(bill.netWorth / 1000)}Billions / {bill.industries[0]}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
