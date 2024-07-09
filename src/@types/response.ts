import type { MetricEnum } from "./api";

export type PlausibleAggregate = {
  visitors: {
    value: number;
    change: number;
  };
  visits: {
    value: number;
    change: number;
  };
  pageviews: {
    value: number;
    change: number;
  };
  views_per_visit: {
    value: number;
    change: number;
  };
  bounce_rate: {
    value: number;
    change: number;
  };
  visit_duration: {
    value: number;
    change: number;
  };
  events: {
    value: number;
    change: number;
  };
  conversion_rate: {
    value: number;
    change: number;
  };
  time_on_page: {
    value: number;
    change: number;
  };
};
