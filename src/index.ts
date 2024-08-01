import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";

import type {
  MetricEnum,
  PlausibleAggregate,
  PlausibleAggregateOptions,
  PlausibleAPIOptions,
  PlausibleError,
  PlausibleTimeseries,
  PlausibleTimeseriesOptions,
} from "./@types";

class PlausibleAPI {
  private axios: AxiosInstance;
  private options: PlausibleAPIOptions;

  constructor(options: PlausibleAPIOptions) {
    if (!options.siteId) {
      throw new Error(
        `Site ID is required. You can get it from the Plausible dashboard: https://plausible.io/docs/stats-api`
      );
    }
    if (!options.accessToken) {
      throw new Error(
        `Access token is required. You can get it from the Plausible dashboard: https://plausible.io/docs/stats-api`
      );
    }

    this.options = {
      baseUrl: "https://plausible.io/api/v1/stats",
      ...options,
    };

    this.axios = axios.create({
      baseURL: this.options.baseUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.options.accessToken}`,
      },
      params: {
        site_id: this.options.siteId,
      },
    });

    this.axios.interceptors.response.use(
      (response: AxiosResponse) => Promise.resolve(response),
      (error: AxiosError<PlausibleError>) => {
        const status = error.response?.status;
        if (status !== undefined && status >= 300 && status < 500) {
          return Promise.reject(`Request failed with status ${status}`);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get the number of realtime visitors.
   * @returns The number of realtime visitors.
   * @throws {PlausibleError} If the API call fails.
   */
  async realtime(): Promise<number> {
    try {
      const response = await this.axios.get<number>("/realtime/visitors");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get aggregated data for specified metrics.
   * @param options - The options for aggregation.
   * @returns The aggregated data.
   * @throws {Error} If the API call fails.
   */
  async aggregate<T extends readonly MetricEnum[]>(
    options: PlausibleAggregateOptions<T>
  ): Promise<{ [K in T[number]]: PlausibleAggregate[K] }> {
    try {
      const { metrics, ...restOptions } = options;
      const filters = options.filters?.map(
        (filter) => `${filter.property}${filter.operator}${filter.value}`
      );

      const params = {
        ...restOptions,
        metrics: metrics.join(","),
        filters: filters?.join("&"),
      };

      const response = await this.axios.get<
        { results: PlausibleAggregate },
        AxiosResponse<{ results: PlausibleAggregate }>
      >("/aggregate", { params });
      return response.data.results;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get timeseries data over a certain time period.
   * If you are familiar with the Plausible dashboard,
   * this endpoint corresponds to the main visitor graph.
   * @param options - The options for timeseries data.
   * @returns The timeseries data.
   * @throws {Error} If the API call fails.
   */
  async timeseries<T extends readonly (keyof PlausibleTimeseries)[]>(
    options: PlausibleTimeseriesOptions<T>
  ): Promise<
    Array<{ date: string } & { [K in T[number]]: PlausibleTimeseries[K] }>
  > {
    try {
      const { metrics, ...restOptions } = options;
      const filters = options.filters?.map(
        (filter) => `${filter.property}${filter.operator}${filter.value}`
      );

      const params = {
        ...restOptions,
        metrics: metrics.join(","),
        filters: filters?.join("&"),
      };

      const response = await this.axios.get<
        { results: PlausibleTimeseries[] }, // Expect array of PlausibleTimeseries
        AxiosResponse<{ results: PlausibleTimeseries[] }>
      >("/timeseries", { params });

      return response.data.results;
    } catch (error) {
      throw error;
    }
  }
}

export { PlausibleAPI };
