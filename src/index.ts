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
      (response: AxiosResponse) => Promise.resolve(response.data),
      (error: AxiosError<PlausibleError>) => {
        return Promise.reject(error.response?.data.error ?? "Unknown error");
      }
    );
  }

  /**
   * Get the number of realtime visitors.
   * @returns The number of realtime visitors.
   * @throws {PlausibleError} If the API call fails.
   */
  async realtimeVisitors(): Promise<number> {
    return await this.axios.get<PlausibleError, number>("/realtime/visitors");
  }

  async aggregate<T extends readonly MetricEnum[]>(
    options: PlausibleAggregateOptions<T>
  ) {
    try {
      const { metrics = ["visitors"], ...restOptions } = options;
      const filters = options.filters?.map((filter) => {
        return `${filter.property}${filter.operator}${filter.value}`;
      });

      const params = {
        ...restOptions,
        metrics: metrics.join(","),
        filters: filters?.join("&"),
      };

      type AggregatedResponse<T extends readonly MetricEnum[]> = {
        results: {
          [K in T[number]]: PlausibleAggregate[K];
        };
      };

      const result = await this.axios.get<AxiosError, AggregatedResponse<T>>(
        "/aggregate",
        { params }
      );

      return result.results;
    } catch (error) {
      throw new Error(`Failed to fetch aggregate data: ${error}`);
    }
  }
}

export { PlausibleAPI };
