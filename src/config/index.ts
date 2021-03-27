import ReportClient from "../report/ReportClient";
import { IClientConfig } from "../typings/types";

export const config: IClientConfig = {
  reportClient: new ReportClient({ logUrl: "log" }),
};
