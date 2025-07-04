import { ApolloServer, BaseContext, ContextFunction } from '@apollo/server';
import type { Request, Response, HttpFunction } from '@google-cloud/functions-framework';
import type { WithRequired } from '@apollo/utils.withrequired';
interface Options<Context extends BaseContext> {
    context?: ContextFunction<Parameters<HttpFunction>, Context>;
    functionTarget: string;
}
export type GoogleCloudApiHandler = (req: Request, res: Response) => Promise<unknown> | unknown;
/**
 * Creates a Google Cloud Functions handler for an `ApolloServer` instance.
 *
 * `startServerAndCreateGoogleCloudFunctionsHandler` requires a `functionTarget` string to be passed on the options object. The value of this string will be used to name the function entry point on Google Cloud Functions.
 *
 * @example
 *
 * startServerAndCreateGoogleCloudFunctionsHandler(server, {
 *   functionTarget: 'my-function-name',
 * });
 */
export declare function startServerAndCreateGoogleCloudFunctionsHandler(server: ApolloServer<BaseContext>, options: Options<BaseContext>): HttpFunction;
export declare function startServerAndCreateGoogleCloudFunctionsHandler<Context extends BaseContext>(server: ApolloServer<Context>, options: WithRequired<Options<Context>, 'context'>): HttpFunction;
export {};
//# sourceMappingURL=index.d.ts.map