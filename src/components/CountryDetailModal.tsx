"use client";
import { useEffect, useState } from "react";
import { CustomModal } from "./CustomModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetStaticticsQuery } from "@/redux/services/Statistics";
import Lottie from "lottie-react";
import { Animations } from "@/assets/animations";
import { CustomLabelWithValue } from "./CustomLabelWithValue";
import { CustomSeparator } from "./CustomSeparator";
import { formatDate } from "@/lib/utils";

export const CountryDetailModal = () => {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const country = searchParams.get("country");

  const { data, isLoading, isError } = useGetStaticticsQuery({});

  const selectedCountryStatistics = data?.response.find(
    (item) => item.country === country
  );

  const onHandleSetOpen = (open: boolean) => {
    setModal(open);

    if (!open) {
      router.push("/");
    }
  };

  const renderStatistics = () => {
    if (isLoading) {
      return <Lottie className="h-20" animationData={Animations.loading} />;
    }

    if (isError) {
      return <Lottie className="h-40" animationData={Animations.error} />;
    }

    return (
      <div className="flex flex-col">
        <label className="text-center text-2xl mb-2">{country}</label>
        <CustomLabelWithValue
          label="Continent"
          value={selectedCountryStatistics?.continent}
          labelClassName="text-muted-foreground"
          valueClassName="text-lg font-light"
        />
        <CustomLabelWithValue
          label="Country"
          value={selectedCountryStatistics?.country}
          labelClassName="text-muted-foreground"
          valueClassName="text-lg font-light"
        />
        <CustomLabelWithValue
          label="Population"
          value={selectedCountryStatistics?.population}
          labelClassName="text-muted-foreground"
          valueClassName="text-lg font-light"
        />

        <CustomSeparator />

        <CustomLabelWithValue
          label="New Case Count"
          value={selectedCountryStatistics?.cases.new}
          labelClassName="text-muted-foreground"
          valueClassName="text-red-500"
        />
        <CustomLabelWithValue
          label="Active Case Count"
          value={selectedCountryStatistics?.cases.active}
          labelClassName="text-muted-foreground"
          valueClassName="text-red-500"
        />
        <CustomLabelWithValue
          label="Critical Case Count"
          value={selectedCountryStatistics?.cases.critical}
          labelClassName="text-muted-foreground"
          valueClassName="text-red-500"
        />
        <CustomLabelWithValue
          label="Recovered Case Count"
          value={selectedCountryStatistics?.cases.recovered}
          labelClassName="text-muted-foreground"
          valueClassName="text-green-500"
        />
        <CustomLabelWithValue
          label="1M Population Case Count"
          value={selectedCountryStatistics?.cases["1M_pop"]}
          labelClassName="text-muted-foreground"
          valueClassName="text-blue-500"
        />
        <CustomLabelWithValue
          label="Total Case Count"
          value={selectedCountryStatistics?.cases.total}
          labelClassName="text-muted-foreground"
          valueClassName="text-red-500"
        />

        <CustomSeparator />

        <CustomLabelWithValue
          label="New Death Count"
          value={selectedCountryStatistics?.deaths.new}
          labelClassName="text-muted-foreground"
          valueClassName="text-red-500"
        />
        <CustomLabelWithValue
          label="1M Population Death Count"
          value={selectedCountryStatistics?.deaths["1M_pop"]}
          labelClassName="text-muted-foreground"
          valueClassName="text-red-500"
        />
        <CustomLabelWithValue
          label="Total Death Count"
          value={selectedCountryStatistics?.deaths.total}
          labelClassName="text-muted-foreground"
          valueClassName="text-red-500"
        />

        <CustomLabelWithValue
          label="Last Updated"
          value={formatDate(selectedCountryStatistics?.time)}
          labelClassName="text-muted-foreground"
          valueClassName="text-lg font-light"
        />
      </div>
    );
  };

  useEffect(() => {
    if (country) {
      setModal(true);
    }
  }, [country]);

  return (
    <CustomModal open={modal} setOpen={onHandleSetOpen}>
      {renderStatistics()}
    </CustomModal>
  );
};
