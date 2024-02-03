export class Request<REQ extends RequestParameters, RES>
  implements IRequest<Request<REQ, RES>, REQ, RES>
{
  apiMeta
  headers?: Headers
  parameters?: REQ

  constructor(apiMeta: ApiMeta) {
    this.apiMeta = apiMeta
  }

  public setParameters = (params: REQ): this => {
    this.parameters = params

    return this
  }

  public setHeaders = (headers: Headers) => {
    this.headers = headers

    return this
  }

  public execute = async (): Promise<RES> =>
    new Promise<RES>((resolve, reject) => {
      console.log()
      const url = new URL(
        `${import.meta.env.VITE_API_BASE_URL}${this.apiMeta.path}`
      )

      // クエリパラメータがあれば追加
      if (this.apiMeta.parameterType === "query" && this.parameters) {
        for (const key in this.parameters) {
          url.searchParams.set(key, this.parameters[key])
        }
      }

      // リクエストボディを成形
      const body =
        this.apiMeta.parameterType === "body" && this.parameters
          ? JSON.stringify(this.parameters)
          : null

      return fetch(url, {
        method: this.apiMeta.httpMethod,
        headers: this.headers,
        body,
      })
        .then((response) => {
          if (!response.ok) {
            return reject("error!")
          }

          return response.json().then((res) => resolve(res))
        })
        .catch((error: Error) => reject(error.message))
    })
}
