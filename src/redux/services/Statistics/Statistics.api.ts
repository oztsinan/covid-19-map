import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Services } from "@/redux/enum/Services";
import { GenericResponse, StatisticsDTO } from "./Statistics.types";

export const statisticsApi = createApi({
  reducerPath: Services.STATISTICS,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://covid-193.p.rapidapi.com",
    headers: {
      "Content-Type": "application/json",
    },
    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-host", `covid-193.p.rapidapi.com`);
      headers.set(
        "x-rapidapi-key",
        process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY ||
          "21933315damsh05b07f02c364ee5p148d73jsnc073ae97ce46"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStatictics: builder.query<GenericResponse<StatisticsDTO[]>, any>({
      query: () => `/statistics`,
    }),
  }),
});

export const { useGetStaticticsQuery } = statisticsApi;
