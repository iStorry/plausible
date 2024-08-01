export type PeriodEnum =
  | "12mo"
  | "6mo"
  | "month"
  | "30d"
  | "7d"
  | "day"
  | "custom";

export type MetricEnum =
  | "visitors"
  | "visits"
  | "pageviews"
  | "views_per_visit"
  | "bounce_rate"
  | "visit_duration"
  | "events"
  | "conversion_rate"
  | "time_on_page";

export type PropertiesEnum =
  | "event:goal"
  | "event:page"
  | "event:hostname"
  | "visit:entry_page"
  | "visit:exit_page"
  | "visit:source"
  | "visit:referrer"
  | "visit:utm_medium"
  | "visit:utm_source"
  | "visit:utm_campaign"
  | "visit:utm_content"
  | "visit:utm_term"
  | "visit:device"
  | "visit:browser"
  | "visit:browser_version"
  | "visit:os"
  | "visit:os_version"
  | "visit:country"
  | "visit:region"
  | "visit:city";

export type IntervalEnum = "date" | "month";

export type PlausibleAPIOptions = {
  /**
   * The base URL of the Plausible API.
   * Defaults to "https://plausible.io/api/v1/stats".
   * @example "https://plausible.io/api/v1/stats"
   */
  baseUrl?: string;

  /**
   * The site ID of the Plausible site.
   * @example "your-site-id"
   */
  siteId: string;

  /**
   * The access token of the Plausible site.
   * @example "your-access-token"
   */
  accessToken: string;
};

export type PlausibleFilter = {
  /**
   * The property to filter by.
   * @example "event:goal"
   */
  property: PropertiesEnum;

  /**
   * The operator to filter by.
   * @example "=="
   */
  operator: "==" | "!=" | "|" | ";" | "*";

  /**
   * The value to filter by.
   * See https://plausible.io/docs/stats-api#filtering for more information.
   * @example "Signup"
   */
  value: string;
};

export type PlausibleAggregateOptions<T> = {
  /**
   * The date range to aggregate over. Defaults to "30d".
   * See https://plausible.io/docs/stats-api#get-apiv1statsaggregate for more information.
   * @example "30d"
   */
  period?: PeriodEnum;

  /**
   * The date relative to which the period is calculated. Defaults to the current date.
   * When using a custom range, the date parameter expects two dates in the format YYYY-MM-DD.
   * See https://plausible.io/docs/stats-api#time-periods for more information.
   * @example "2023-01-01"
   */
  date?: string;

  /**
   * Comma-separated list of metrics to aggregate.
   * See https://plausible.io/docs/stats-api#metrics for more details.
   * @example ["visitors", "pageviews"]
   */
  metrics: T;

  /**
   * Whether to include imported stats in the returned results. Defaults to false.
   * See https://plausible.io/docs/stats-api#imported-stats for more details.
   * @example true
   */
  withImported?: boolean;

  /**
   * Whether to compare the current period with the previous period. Defaults to false.
   * The previous period will be of the exact same length as specified in the period parameter.
   * See https://plausible.io/docs/stats-api#compare-periods for more details.
   * @example "previous_period"
   */
  compare?: "previous_period";

  /**
   * A list of filters to apply to the aggregated data.
   * See https://plausible.io/docs/stats-api#filtering for more information.
   * @example [{ property: "event:goal", operator: "==", value: "Signup" }]
   */
  filters?: PlausibleFilter[];
};

export type PlausibleTimeseriesOptions<T> = {
  /**
   * The date range to aggregate over. Defaults to "30d".
   * See https://plausible.io/docs/stats-api#get-apiv1statsaggregate for more information.
   * @example "30d"
   */
  period?: PeriodEnum;

  /**
   * A list of filters to apply to the aggregated data.
   * See https://plausible.io/docs/stats-api#filtering for more information.
   * @example [{ property: "event:goal", operator: "==", value: "Signup" }]
   */
  filters?: PlausibleFilter[];

  /**
   * Comma-separated list of metrics to aggregate.
   * See https://plausible.io/docs/stats-api#metrics for more details.
   * @example ["visitors", "pageviews"]
   */
  metrics: T;

  /**
   * Whether to include imported stats in the returned results. Defaults to false.
   * See https://plausible.io/docs/stats-api#imported-stats for more details.
   * @example true
   */
  withImported?: boolean;

  /**
   * The interval at which the timeseries data is aggregated. Defaults to "30d".
   * See https://plausible.io/docs/stats-api#get-apiv1statstimeseries for more information.
   * @example "30d"
   */
  interval?: IntervalEnum;
};
