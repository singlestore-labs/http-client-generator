function getBaseURL(host, username, password, queryEndpoint, https) {
    return `${
        https ? "https" : "http"
    }://${username}:${password}@${host}/api/v1/query/${queryEndpoint}`;
}

function getExecURL(host, username, password) {
    return getURL(host, username, password, "exec");
}

function getQueryURL(host, username, password, includeColumnHeaders, https) {
    const queryEndpoint =
        includeColumnHeaders && includeColumnHeaders !== undefined
            ? "tuples"
            : "rows";

    return getBaseURL(host, username, password, queryEndpoint, https);
}

function getHeaders(username, password) {
    const auth = btoa(`${username}:${password}`);
    const headers = {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Basic ${auth}`,
        "Content-type": "application/json",
    };

    return headers;
}

function getQueryBody(sql, args, database) {
    return { sql: sql, args: args, database: database };
}

async function queryFetch(url, headers, body) {
    return await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    }).then(response => {
        const json = response.json();
        if (response.error) {
            throw new Error(response.error);
        } else {
            return json;
        }
    });
}

export async function exec(request) {
    const { host, username, password, sql, args, database } = request;

    return await queryFetch(
        getExecURL(host, username, password),
        getHeaders(username, password),
        getQueryBody(sql, args, database)
    );
}

export async function query(request) {
    const {
        host,
        username,
        password,
        sql,
        args,
        database,
        includeColumnHeaders,
        https,
    } = request;

    return await queryFetch(
        getQueryURL(host, username, password, includeColumnHeaders, https),
        getHeaders(username, password),
        getQueryBody(sql, args, database)
    );
}
