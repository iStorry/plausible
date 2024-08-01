# `@istorry/plausible`

A type-safe wrapper for the [Plausible Analytics API](https://plausible.io/docs/stats-api), designed to simplify integration and enhance developer experience with TypeScript support.

## Installation

To install the package, use npm:

```bash
npm install @istorry/plausible
```

Or with yarn:

```bash
yarn add @istorry/plausible
```

## Usage

### Importing and Configuration

First, import the `PlausibleAPI` class and instantiate it with your Plausible site ID and access token:

```ts
import { PlausibleAPI } from "@istorry/plausible";

const plausible = new PlausibleAPI({
  siteId: "<your-site-id>",
  accessToken: "<your-access-token>",
});
```

### Fetching Realtime Visitors

To get the number of realtime visitors, use the `realtime` method:

```ts
const visitors = await plausible.realtime();
console.log(`Realtime visitors: ${visitors}`);
```

### Aggregated Data

To get aggregated metrics data, use the `aggregate` method. You can specify the period, metrics, and optional filters:

```ts
const aggregate = await plausible.aggregate({
  period: "30d", // Time period for aggregation, e.g., "30d" for 30 days
  metrics: ["visitors", "pageviews"], // Metrics to aggregate
  filters: [
    {
      property: "event:goal", // Property to filter by
      operator: "==", // Comparison operator
      value: "Signup", // Value to filter by
    },
  ],
});

console.log("Aggregated data:", aggregate);
```

### Timeseries Data

To get timeseries data, use the `timeseries` method. You can specify the period, metrics, interval, and optional filters:

```ts
const timeseries = await plausible.timeseries({
  period: "30d", // Time period for aggregation, e.g., "30d" for 30 days
  metrics: ["visitors", "pageviews"], // Metrics to aggregate (same as in aggregate method)
  interval: "date", // Interval for aggregation, e.g., "month" for monthly data (default is "month")
  filters: [
    {
      property: "visit:device",
      operator: "==",
      value: "Desktop",
    },
  ],
});

console.log("Timeseries data:", timeseries);
```

## API Methods

### `realtime()`

Fetches the current number of realtime visitors.

**Returns:**

- `Promise<number>`: The number of realtime visitors.

### `aggregate<T extends readonly MetricEnum[]>(options: PlausibleAggregateOptions<T>)`

Fetches aggregated data based on the specified options.

**Parameters:**

- `options`: An object defining aggregation options. See [PlausibleAggregateOptions](./src/@types.ts) for details.

**Returns:**

- `Promise<{ [K in T[number]]: PlausibleAggregate[K] }>`: Aggregated data for the specified metrics.

### `timeseries<T extends readonly (keyof PlausibleTimeseries)[]>(options: PlausibleTimeseriesOptions<T>)`

Fetches timeseries data based on the specified options.

**Parameters:**

- `options`: An object defining timeseries options. See [PlausibleTimeseriesOptions](./src/@types.ts) for details.

**Returns:**

- `Promise<Array<{ date: string } & { [K in T[number]]: PlausibleTimeseries[K] }>>`: Timeseries data for the specified metrics.

## Error Handling

Errors are thrown if the API call fails. Ensure proper error handling in your application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/iStorry/plausible).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

Feel free to adjust the "Contributing" and "License" sections according to your project's specifics. This revised README includes installation instructions, usage examples, method details, and additional sections for contributing and licensing.

```

```
