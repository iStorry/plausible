/**
 * Represents aggregated metrics data for Plausible.
 */
export type PlausibleAggregate = {
  /**
   * The number of visitors.
   * @example { value: 1500, change: 5.2 }
   */
  visitors: {
    value: number;
    change: number;
  };

  /**
   * The number of visits.
   * @example { value: 3000, change: -2.1 }
   */
  visits: {
    value: number;
    change: number;
  };

  /**
   * The number of pageviews.
   * @example { value: 4500, change: 3.4 }
   */
  pageviews: {
    value: number;
    change: number;
  };

  /**
   * The average number of views per visit.
   * @example { value: 1.5, change: 0.2 }
   */
  views_per_visit: {
    value: number;
    change: number;
  };

  /**
   * The bounce rate, expressed as a percentage.
   * @example { value: 60.0, change: -1.5 }
   */
  bounce_rate: {
    value: number;
    change: number;
  };

  /**
   * The average duration of visits, in seconds.
   * @example { value: 120, change: 10 }
   */
  visit_duration: {
    value: number;
    change: number;
  };

  /**
   * The number of events.
   * @example { value: 200, change: 4.5 }
   */
  events: {
    value: number;
    change: number;
  };

  /**
   * The conversion rate, expressed as a percentage.
   * @example { value: 5.5, change: 0.3 }
   */
  conversion_rate: {
    value: number;
    change: number;
  };

  /**
   * The average time spent on a page, in seconds.
   * @example { value: 45, change: 5 }
   */
  time_on_page: {
    value: number;
    change: number;
  };
};

export type PlausibleTimeseries = {
  /**
   * The date of the data point.
   * @example "2023-01-01"
   */
  date: string;

  /**
   * The number of visitors.
   * @example { value: 1500, change: 5.2 }
   */
  visitors: number;

  /**
   * The number of pageviews.
   * @example { value: 4500, change: 3.4 }
   */
  pageviews: number;

  /**
   * The average duration of visits, in seconds.
   * @example { value: 120, change: 10 }
   */
  visit_duration: number;

  /**
   * The average number of views per visit.
   * @example { value: 1.5, change: 0.2 }
   */
  views_per_visit: number;

  /**
   * The number of events.
   * @example { value: 200, change: 4.5 }
   */
  events: number;

  /**
   * The conversion rate, expressed as a percentage.
   * @example { value: 5.5, change: 0.3 }
   */
  conversion_rate: number;

  /**
   * The bounce rate, expressed as a percentage.
   * @example { value: 60.0, change: -1.5 }
   */
  bounce_rate: number;

  /**
   * The average time spent on a page, in seconds.
   * @example { value: 45, change: 5 }
   */
  time_on_page: number;
};
