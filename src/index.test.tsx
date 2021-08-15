// Mock fetch globally since fetch is not available in Node.
import fetch from "node-fetch";
(window as any).fetch = fetch;

import { query } from "./index";
import { setupServer } from "msw/node";
import { rest } from "msw";

// Wrapper over `setupServer` from `msw`.
function setupMockServer(handlers: Parameters<typeof setupServer>) {
    const server = setupServer(...handlers);

    beforeAll(() => {
        server.listen({
            onUnhandledRequest(req) {
                console.group(req);
                console.error(
                    "Found an unhandled %s request to %s",
                    req.method,
                    req.url.href
                );
            },
        });
    });

    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
}

describe("basic tests", () => {
    type ResultRow = {
        name: string;
        price: number;
    };

    const results: Array<ResultRow> = [
        {
            name: "Designing Data-Intensive Applications",
            price: 100,
        },
        {
            name: "SQL For Dummies",
            price: 100,
        },
    ];

    setupMockServer([
        // We match a URL
        // (https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url)
        // that ends in /api/v1/query/rows.
        rest.post(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\/api\/v1\/query\/rows/,
            (_req, res, ctx) => {
                return res(
                    ctx.json({
                        results,
                    })
                );
            }
        ),
    ]);

    test("simple successful select with 1 result set", async () => {
        const queryOutput = await query<ResultRow>({
            host: "127.0.0.1",
            username: "admin",
            password: "12345pass",
            sql: "SELECT name, price FROM books",
            https: false,
        });

        expect(queryOutput).toEqual({
            results,
        });
    });

    // Missing tests:
    // * error
    // * error in the middle of a query
    // * insert/exec statement
    // * multi result query
    // * variations of multi result query with errors
});
