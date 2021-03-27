import { IInitOptions, IReportClient } from "./typings/types";
import ReportClient from "./report/ReportClient";
import analyticsTracker from "./report/analyticsTracker";
import { config } from "./config";

import ErrorTrace from "./error/ErrorTrace";

export default class WebMonitor {
  private reportClient: IReportClient;

  constructor(options: IInitOptions = {}) {
    const logUrl = options.logUrl;
    if (!logUrl) {
      throw new Error(`Web系统系统监控平台，初始化未传递logUrl`);
    }

    //向后台输送数据
    const reportClient = new ReportClient({
      logUrl,
    });

    config.reportClient = reportClient;

    // 外部可访问  通过这个客户端上报数据
    this.reportClient = reportClient;

    //集合数据汇总
    const _analyticsTracker = options.analyticsTracker;
    if (_analyticsTracker) {
      config.analyticsTracker = _analyticsTracker;
    } else {
      config.analyticsTracker = analyticsTracker;
    }

    //错误监控上报
    const errorTrace = new ErrorTrace();
    errorTrace.run();
  }
}
