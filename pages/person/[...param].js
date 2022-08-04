import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function Detail(params) {
  const router = useRouter();
  const id = router.query.param;
  const [billId, setBillId] = useState();
  useEffect(() => {
    (async () => {
      const results = await (
        await fetch(`https://billions-api.nomadcoders.workers.dev/person/${id}`)
      ).json();
      setBillId(results);
    })();
  }, [id]);

  return (
    <div className="grid items-center justify-center min-w-screen py-6 bg-slate-800">
      <Head>
        <title>Billions - {billId?.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid grid-rows-2 items-center justify-center text-center w-screen">
        <div className="flex flex-col gap-2 items-start justify-start bg-slate-900 w-[800px] h-[800px] border-solid border-2 border-indigo-800 overflow-hidden">
          <img
            src={billId?.squareImage}
            alt=""
            width="300px"
            className="ml-8 mt-20"
          />
          <div className="text-white text-4xl ml-8">{billId?.name}</div>
          <div className="text-white text-2xl ml-8">
            Networth: {parseInt(billId?.netWorth / 1000, 10)} billions
          </div>
          <div className="text-white text-lg ml-8">
            country: {billId?.country}
          </div>
          <div className="text-white text-lg ml-8">
            industries: {billId?.industries[0]}
          </div>
          <div className="text-white text-sm ml-8 mr-8">
            {billId?.bio[0]}
            {billId?.bio[1]}
            {billId?.bio[2]}
            {billId?.bio[3]}
            {billId?.bio[4]}
          </div>
        </div>
        <div className="bg-slate-900 w-[800px] h-[400px] border-solid border-2 border-indigo-800 overflow-hidden">
          <div className="flex items-start mt-20 ml-20 text-white text-4xl">
            Financial Assets
          </div>
          <div className="grid grid-cols-4 items-center justify-center gap-4 mt-10 mx-10">
            <div className="flex flex-col border-solid border-gray-500 border w-44 h-20">
              <div className="text-white text-xl">
                ticker: {billId?.financialAssets[0]?.ticker}
              </div>
              <div className="text-white text-xl">
                shares: {billId?.financialAssets[0]?.numberOfShares}
              </div>
            </div>
            <div className="flex flex-col border-solid border-gray-500 border w-44 h-20">
              <div className="text-white text-xl">
                ticker: {billId?.financialAssets[1]?.ticker}
              </div>
              <div className="text-white text-xl">
                shares: {billId?.financialAssets[1]?.numberOfShares}
              </div>
            </div>
            <div className="flex flex-col border-solid border-gray-500 border w-44 h-20">
              <div className="text-white text-xl">
                ticker: {billId?.financialAssets[2]?.ticker}
              </div>
              <div className="text-white text-xl">
                shares: {billId?.financialAssets[2]?.numberOfShares}
              </div>
            </div>
            <div className="flex flex-col border-solid border-gray-500 border w-44 h-20">
              <div className="text-white text-xl">
                ticker: {billId?.financialAssets[3]?.ticker}
              </div>
              <div className="text-white text-xl">
                shares: {billId?.financialAssets[3]?.numberOfShares}
              </div>
            </div>
            <div className="flex flex-col border-solid border-gray-500 border w-44 h-20">
              <div className="text-white text-xl">
                ticker: {billId?.financialAssets[4]?.ticker}
              </div>
              <div className="text-white text-xl">
                shares: {billId?.financialAssets[4]?.numberOfShares}
              </div>
            </div>
            <div className="flex flex-col border-solid border-gray-500 border w-44 h-20">
              <div className="text-white text-xl">
                ticker: {billId?.financialAssets[5]?.ticker}
              </div>
              <div className="text-white text-xl">
                shares: {billId?.financialAssets[5]?.numberOfShares}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
