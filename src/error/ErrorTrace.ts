import { config } from "../config";
import { AskPriority, ReportMsgType } from "src/typings/types";

export default class ErrorTrace {
  // 捕获运行时错误
  private globalUnCaughtError() {
    process.on("uncaughtException", (err) => {
      console.error("There was an uncaught error", err);
      const errorInfo = {
        message: err?.message,
        name: err?.name,
        stack: err?.stack,
      };
      config.reportClient.sendToAnalytics(
        AskPriority.URGENT,
        JSON.stringify(errorInfo),
        ReportMsgType.NODE_UNCAUGHT_ERROR
      );
    });
  }

  private memoryLeakError() {
    // Todo 内存泄露上报
  }

  public run() {
    this.globalUnCaughtError();
    this.memoryLeakError();
  }
}
