# @singlestore/http-client-js

`@singlestore/http-client-js` is a JavaScript wrapper for [SingleStore's HTTP API](https://docs.singlestore.com/managed-service/en/reference/http-api.html). It exports a few functions which simplify using SingleStore's HTTP API from a JavaScript project.

```javascript
import { query } from "@singlestore/http-client-js";

type Country = {
    name: string
};

function getCountries() {
    const sql = `
        SELECT DISTINCT
            name
        FROM 
            countries
        GROUP BY 
            name
        ORDER BY
            name
    `;

    const database = "maps";

    const response = await query<Country>({
        host,
        username,
        password,
        sql,
        database,
    });

    const countries = response.results[0].rows;

    return countries;
}
```

## Installation

`npm install @singlestore/http-client-js`

## Documentation

TODO after API is finalized.

## Contributing

Pull Requests are welcome, and better tests are needed (see `src/index.test.tsx`).