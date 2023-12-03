declare module "configs" {
  interface IConfigOptions {
    environment: string;
    database: IDatabaseOptions;
    server: IServerOptions;
  }

  interface IRotationFileOptions {
    path: string;
    size: string;
    interval?: string;
    compress?: string;
  }

  interface IDatabaseOptions {
    HOST?: string;
    USER?: string;
    PORT?: any;
    PASSWORD?: string;
    DATABASE?: string;
  }

  interface IServerOptions {
    port: string;
    key: string;
  }
}
