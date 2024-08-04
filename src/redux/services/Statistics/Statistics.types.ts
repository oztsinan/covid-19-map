export type GenericResponse<T> = {
  errors: any[];
  get: string;
  parameters: any[];
  results: number;
  response: T;
};

export type StatisticsDTO = {
  cases: {
    "1M_pop": string;
    active: number;
    critical: number;
    new: string;
    recovered: number;
    total: number;
  };
  continent: string;
  country: string;
  day: string;
  deaths: {
    "1M_pop": string;
    new: string;
    total: number;
  };
  population: number;
  tests: {
    "1M_pop": string;
    total: number;
  };
  time: string;
};
