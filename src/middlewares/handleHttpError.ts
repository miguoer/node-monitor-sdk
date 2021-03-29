/**
 * koa的中间件
 */
import { config } from "../config";
import { AskPriority, ReportMsgType } from "../typings/types";
import * as Koa from "koa";

function handleHttpError(): Koa.Middleware {
  return async function (ctx: Koa.Context, next: () => Promise<any>) {
    try {
      await next();

      if (ctx.status === 404) {
        // 发生404错误
        config.reportClient.sendToAnalytics(
          AskPriority.URGENT,
          JSON.stringify(ctx.request),
          ReportMsgType.NODE_HTTP_ERROR
        );
      }
    } catch (err) {
      // 网站出错了
      console.error(err);
      // 继续抛出去，让用户程序自己处理，这里只是记录发邮件
      config.reportClient.sendToAnalytics(
        AskPriority.URGENT,
        err.message,
        ReportMsgType.NODE_HTTP_ERROR
      );
      throw err;
    }
  };
}

export default handleHttpError;
