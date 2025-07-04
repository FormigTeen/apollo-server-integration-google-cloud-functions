"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServerAndCreateGoogleCloudFunctionsHandler = startServerAndCreateGoogleCloudFunctionsHandler;
const server_1 = require("@apollo/server");
const url_1 = require("url");
const functions_framework_1 = require("@google-cloud/functions-framework");
const defaultContext = async () => ({});
function startServerAndCreateGoogleCloudFunctionsHandler(server, options) {
    server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();
    const contextFunction = options?.context || defaultContext;
    const handler = async (req, res) => {
        const headers = new server_1.HeaderMap();
        for (const [key, value] of Object.entries(req.headers)) {
            if (typeof value === 'string') {
                headers.set(key, value);
            }
        }
        const httpGraphQLResponse = await server.executeHTTPGraphQLRequest({
            context: () => contextFunction(req, res),
            httpGraphQLRequest: {
                body: req.body,
                headers,
                method: req.method || 'POST',
                search: req.url ? (0, url_1.parse)(req.url).search || '' : '',
            },
        });
        for (const [key, value] of httpGraphQLResponse.headers) {
            res.setHeader(key, value);
        }
        res.statusCode = httpGraphQLResponse.status || 200;
        if (httpGraphQLResponse.body.kind === 'complete') {
            res.send(httpGraphQLResponse.body.string);
        }
        else {
            for await (const chunk of httpGraphQLResponse.body.asyncIterator) {
                res.write(chunk);
            }
            res.end();
        }
    };
    (0, functions_framework_1.http)(options.functionTarget, handler);
    return handler;
}
//# sourceMappingURL=index.js.map