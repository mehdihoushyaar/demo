import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

/**
 * @class Base
 * @abstract
 */
abstract class Base {
  /**
   * @static
   * @protected
   * @memberof Base
   */
  protected static DEFAULT_CONFIG: AxiosRequestConfig = {
    baseURL: "http://localhost:3000/",
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  /**
   * @static
   * @protected
   * @memberof Base
   */
  protected static instance: AxiosInstance = axios.create(this.DEFAULT_CONFIG);
}

/**
 * @class Request
 * @abstract
 */
abstract class Request extends Base {
  /**
   * @param {string} url
   * @param {AxiosRequestConfig} [config]
   * @static
   * @memberof Request
   */
  static get<T>(url: string, config?: AxiosRequestConfig) {
    return this.send<T>(url, {
      ...config,
      method: "get",
      headers: {
        ...config?.headers,
        "Content-Type": "application/json, text/plain, */*",
        Accept: "application/json, text/plain, */*",
      },
    });
  }

  /**
   * @param {string} url
   * @param {AxiosRequestConfig} [config]
   * @static
   * @memberof Request
   */
  static option<T>(url: string, config?: AxiosRequestConfig) {
    return this.send<T>(url, {
      ...config,
      method: "options",
      headers: {
        ...config?.headers,
        "Content-Type": "application/json, text/plain, */*",
        Accept: "application/json, text/plain, */*",
      },
    });
  }

  /**
   * @param {string} url
   * @param {any} [data]
   * @param {AxiosRequestConfig} [config]
   * @static
   * @memberof Request
   */
  static post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    let transformedData: any = {};

    if (data instanceof FormData) {
      transformedData = data;
    } else {
      for (const property in data) {
        transformedData[property] =
          typeof data[property] === "string"
            ? (data[property] as string)?.replace(/<\/[^>]+(>|$)/g, "")
            : data[property];
      }
    }

    return this.send<T>(url, {
      ...config,
      method: "post",
      data: transformedData,
    });
  }

  /**
   * @param {string} url
   * @param {any} [data]
   * @param {AxiosRequestConfig} [config]
   * @static
   * @memberof Request
   */
  static put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.send<T>(url, { ...config, method: "put", data });
  }

  /**
   * @param {string} url
   * @param {AxiosRequestConfig} [config]
   * @static
   * @memberof Request
   */
  static delete<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.send<T>(url, { ...config, method: "delete", data });
  }

  /**
   * @param {string} url
   * @param {any} [data]
   * @param {AxiosRequestConfig} [config]
   * @static
   * @memberof Request
   */
  static patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.send<T>(url, { ...config, method: "patch", data });
  }

  /**
   * @param {string} url
   * @param {AxiosRequestConfig} [config]
   * @static
   * @private
   * @memberof Request
   */
  private static send<T>(url: string, config?: AxiosRequestConfig) {
    return async () => {
      try {
        const conf = { ...this.DEFAULT_CONFIG, ...config };

        const response = await Request.instance.request<T>({
          ...conf,
          url,
        });
        return response.data;
      } catch (error: any) {
        throw error?.response?.data ?? error;
      }
    };
  }
}

export default Request;
