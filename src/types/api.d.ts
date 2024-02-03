/***************************************************************
 * APIのメタ情報に関するクラス
 ***************************************************************/
type RequestPath = `/api/${string}`
type HttpMethod = "GET" | "HEAD" | "POST" | "PUT" | "DELETE"
type ParameterType = "query" | "body" | null

type ApiMeta = {
  path: RequestPath
  httpMethod: HttpMethod
  parameterType: ParameterType
}

/***************************************************************
 * リクエストに関するクラス
 ***************************************************************/

/** リクエストクラスのインターフェース */
type IRequest<THIS, REQ extends RequestParameters, RES> = {
  /** リクエストを送信するAPIのメタ情報 */
  apiMeta: ApiMeta
  /** HTTPメソッド */
  httpMethod?: HttpMethod
  /** リクエストヘッダ */
  headers?: Headers
  /** リクエストパラメータ */
  parameters?: REQ
  /**
   * リクエストパラメータをセットする
   *
   * @param params パラメータオブジェクト
   * @param parameterType パラメータ種別
   * @returns リクエストクラス
   */
  setParameters: (params: REQ) => THIS
  /**
   * リクエストヘッダをセットする
   * @param headers リクエストヘッダ
   * @returns リクエストクラス
   */
  setHeaders: (headers: Headers) => THIS
  /**
   * リクエストを実行する
   * @returns レスポンスクラス
   */
  execute: () => Promise<RES>
}

type RequestParametersA = {
  [key: string]
  id: number
  name: string
}

type RequestParametersB = {
  [key: string]
  id: number
  today: string
}

type RequestParameters = RequestParametersA | RequestParametersB | null

/***************************************************************
 * レスポンスに関するクラス
 ***************************************************************/
type ResponseA = {
  id: number
  result: boolean
}

type ResponseB = {
  id: number
  name: string
}

type ApiResponse = ResponseA | ResponseB
