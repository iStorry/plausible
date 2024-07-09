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

type PropertiesEnum =
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

export type PlausibleAPIOptions = {
  /**
   * The base URL of the Plausible API.
   * Defaults to "https://plausible.io/api/v1/stats".
   */
  baseUrl?: string;
  /**
   * The site ID of the Plausible site.
   */
  siteId: string;
  /**
   * The access token of the Plausible site.
   */
  accessToken: string;
};

export type PlausibleFilter = {
  /**
   * The property to filter by.
   */
  property: PropertiesEnum;
  /**
   * The operator to filter by.
   */
  operator: "==" | "!=" | "|" | ";" | "*";
  /**
   * The value to filter by.
   * See https://plausible.io/docs/stats-api#filtering for more information.
   */
  value: string;
};

export type PlausibleAggregateOptions<T> = {
  /**
   * The date range to aggregate over. Defaults to "30d".
   * See https://plausible.io/docs/stats-api#get-apiv1statsaggregate for more information.
   */
  period?: PeriodEnum;
  /**
   * Period is reative to this date. Defaults to the current date.
   * When using a custom range, the date parameter expects two dates in the format YYYY-MM-DD.
   * See https://plausible.io/docs/stats-api#time-periods for more information.
   */
  date?: string;
  /**
   * Comma-separated list of metrics to aggregate, e.g. visitors,pageviews,bounce_rate
   * If not specified, will default to visitors.
   * See https://plausible.io/docs/stats-api#metrics for more details.
   */
  metrics?: T;
  /**
   * A boolean determining whether to include imported stats in the returned results or not. If not specified, it will default to false. See imported stats for more details.
   * https://plausible.io/docs/stats-api#imported-stats
   */
  with_imported?: boolean;

  /**
   * A string determining whether to compare the current period with the previous period or not. If not specified, it will default to false.
   * The previous period will be of the exact same length as specified in the period parameter.
   * https://plausible.io/docs/stats-api#compare-periods
   */
  compare?: "previous_period";
  /**
   *
   */
  filters?: PlausibleFilter[];
};
