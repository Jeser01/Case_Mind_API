import { IAuditLogConfigs } from "express-auditlog";

import { Request, Response, NextFunction } from "express";
import { RotatingFileStream } from "rotating-file-stream";

import fs from "fs";
import moment from "moment";
import tracerLib from "tracer";
import * as rotFileStream from "rotating-file-stream";

function generatorFileName(): string {
  return `Audit_${moment(new Date()).format("YYYYMMDD_HHmmssSSS")}.log`;
}

export default function auditlog({
  path,
  methods,
  interval,
  size,
  compress,
  ipAddress,
  actor,
}: IAuditLogConfigs) {
  let tmpStream: RotatingFileStream;

  if (methods) {
    if (!path) throw new Error("path can't be empty");
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });

    tmpStream = rotFileStream.createStream(generatorFileName, {
      path,
      interval,
      size,
      compress,
    });
  }

  const tracer = tracerLib.console({
    format: "[{{timestamp}}] - {{message}}",
    dateformat: "yyyy-mm-dd'T'HH:MM:ss.l",
    transport: function (data): void {
      const { rawoutput } = data;

      try {
        if (tmpStream) tmpStream.write(`${rawoutput}\n`);
      } catch (err) {
        console.error(err);
      }
    },
  });

  return function (req: Request, res: Response, next: NextFunction) {
    const { headers, url, method, body, params, query } = req;

    res.on("finish", function () {
      const { statusCode } = res;

      const row = {
        method,
        url,
        statusCode,
        params,
        query,
        headers,
        body,
        ip: ipAddress ? ipAddress(req) : "unknown",
        actor: actor ? actor(req) : "unknown",
      };
      if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) console.log(row);

      if (tracer && methods?.includes(method)) {
        tracer.log(JSON.stringify(row));
      }
    });

    return next();
  };
}
