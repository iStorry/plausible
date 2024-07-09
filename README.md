# @istorry/plausible

Typesafe wrapper for the [Plausible analytics API](https://plausible.io/docs/stats-api).

## Installation

```bash
npm install @istorry/plausible
```

## Usage

```ts
import { PlausibleAPI } from "@istorry/plausible";

const plausible = new PlausibleAPI({
  siteId: "<your-site-id>",
  accessToken: "<your-access-token>",
});
```

### Realtime visitors

```ts
const realtimeVisitors = await plausible.realtimeVisitors();
```

### Aggregate

```ts
const aggregate = await plausible.aggregate({
  period: "30d",
  metrics: ["visitors", "pageviews"],
  filters: [
    {
      property: "event:goal",
      operator: "==",
      value: "Signup",
    },
  ],
});
```
