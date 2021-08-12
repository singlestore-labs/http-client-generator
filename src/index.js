function getURL(host, username, password, queryEndpoint) {
    return `https://${username}:${password}@${host}/api/v1/query/${queryEndpoint}`;
}

function getExecURL(host, username, password) {
    return getURL(host, username, password, "exec");
}

function getQueryURL(host, username, password, includeColumnHeaders) {
    const queryEndpoint = (
        includeColumnHeaders && includeColumnHeaders !== undefined 
        ? "tuples" : "rows"
    );
    return getURL(host, username, password, queryEndpoint);
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
	}).then((response) => {
        const json = response.json();
        if (response.error) {
            throw new Error(response.error);
        }
        else {
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
    const { host, username, password, sql, args, database, includeColumnHeaders } = request;
    return await queryFetch(
        getQueryURL(host, username, password, includeColumnHeaders), 
        getHeaders(username, password), 
        getQueryBody(sql, args, database)
    );
}