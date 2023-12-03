import { ITracerOptions } from "configs";

export interface ITracerConfigs extends Omit<ITracerOptions, "levels"> {
  levels: Array<string>;
}

import { RotatingFileStream } from "rotating-file-stream";

import fs from "fs";
import moment from "moment";
import tracerLib from "tracer";
import * as rotFileStream from "rotating-file-stream";

//export { TracerLevels };

let _stream: RotatingFileStream;
let _configs: ITracerConfigs = {
  path: "",
  size: "",
  levels: [],
};

function _generatorFileName() {
  return `Trace_${moment(new Date()).format("YYYYMMDD_HHmmssSSS")}.log`;
}

function _writeLine(message: string) {
  if (message === "") return;

  try {
    if (_stream) _stream.write(message);
  } catch (err) {
    console.error(err);
  }
}

export function setConfigs(values: ITracerConfigs) {
  _configs = { ..._configs, ...values };
  const { path, levels, size, interval, compress } = _configs;

  if (!path) throw new Error("path can't be empty");

  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });

  if (levels.length > 0)
    _stream = rotFileStream.createStream(_generatorFileName, {
      path,
      size,
      interval,
      compress,
    });
}

export const tracer = tracerLib.console({
  dateformat: "yyyy-mm-dd'T'HH:MM:ss.l",
  preprocess: function (data) {
    data.title = data.title.toUpperCase();
  },
  transport: function (data) {
    const { levels } = _configs;
    const { title } = data;

    if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) console.log(data.message);

    if (title === "log" || levels.includes(title.toUpperCase())) {
      _writeLine(`${data.rawoutput}\n`);
    }
  },
});
