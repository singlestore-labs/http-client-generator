type BaseRequest = {
    host: string;
    username: string;
    password: string;
    sql: string;
    args?: Array<unknown>;
    database?: string;
};

type ExecRequest = BaseRequest;

export type ExecResponse = {
    lastInsertId: number;
    rowsAffected: number;
};

export declare function exec(request: ExecRequest): Promise<ExecResponse>;

type QueryRequest = BaseRequest & {
    includeColumnHeaders?: boolean;
};

export type ColumnDefinition = {
    name: string;
    dataType: string;
    nullable: boolean;
};

export declare function query<T1>(
    request: QueryRequest
): Promise<{
    results: Array<{
        rows: [T1];
        columns?: [ColumnDefinition];
    }>;
}>;

export declare function query<T1, T2>(
    request: QueryRequest
): Promise<{
    results: Array<{
        rows: [T1, T2];
        columns?: [ColumnDefinition, ColumnDefinition];
    }>;
}>;

export declare function query<T1, T2, T3>(
    request: QueryRequest
): Promise<{
    results: Array<{
        rows: [T1, T2, T3];
        columns?: [ColumnDefinition, ColumnDefinition, ColumnDefinition];
    }>;
}>;
