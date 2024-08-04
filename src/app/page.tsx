"use client";

import { Animations } from "@/assets/animations";
import { CountryDetailModal } from "@/components/CountryDetailModal";
import { Header } from "@/components/Header";
import Lottie from "lottie-react";
import dynamic from "next/dynamic";
import { Suspense, useMemo } from "react";

const Page = () => {
  const CountryBoundsMap = useMemo(
    () =>
      dynamic(() => import("@/components/CountryBoundsMap"), {
        loading: () => (
          <Lottie className="mx-auto h-20" animationData={Animations.loading} />
        ),
        ssr: false,
      }),
    []
  );

  return (
    <Suspense>
      <div className="flex flex-col flex-1 h-screen md:p-5 p-2 gap-4 transition-all">
        <Header />
        <div className="overflow-hidden flex flex-1 rounded-lg">
          <CountryBoundsMap />
        </div>
        <CountryDetailModal />
      </div>
    </Suspense>
  );
};

export default Page;
