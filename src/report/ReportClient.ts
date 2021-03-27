/**
 * 上报的客户端
 */
import { AskPriority, IReportClient, ReportMsgType } from "../typings/types";
const fetch = require("node-fetch");

//上报地址
type TrackerOptions = {
  logUrl: string;
};

class ReportClient implements IReportClient {
  private logUrl: string;
  constructor(options: TrackerOptions) {
    // console.log('⏰', options);
    const { logUrl } = options;
    if (logUrl) {
      this.logUrl = logUrl;
    } else {
      throw new Error("请传递要记录数据的路由~");
    }
  }
  public sendToAnalytics(
    level: AskPriority,
    body: string,
    type: ReportMsgType,
    uri?: string
  ) {
    let logurl = this.logUrl;
    //临时更换其他url
    if (uri) {
      logurl = uri;
    }
    console.log("上报body", body);
    const params = {
      type: type,
      content: body,
    };

    try {
      if (level == AskPriority.URGENT) {
        fetch(logurl, {
          body: JSON.stringify(params),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }).catch(() => {
          // 防止promise捕获导致死循环
          console.log("上报接口发生异常了");
        });
      }
    } catch (e) {
      // 防止死循环调用
      console.log(e);
    }
  }
}
export default ReportClient;
