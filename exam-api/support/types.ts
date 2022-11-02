export type requestDataType = { 
    url: string, 
    body?: any, 
    headers?: any 
  }
  
export enum METHODS {
    POST = 'POST',
    GET = 'GET',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    PUT = 'PUT'
  }  