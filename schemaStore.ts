export interface SchemaStoreContentDto {
  id?: number;
  key?: string;
  name?: string;
  history?: SchemaHistory[];
  content?: string;
  preReleaseContent?: string;
  creator?: string;
  adminList?: string[];
  authLevel?: string;
}

export interface SchemaHistory {
  id?: number;
  schemaContentId?: string;
  historySchemaContent?: string;
  historyUpdateTime?: number;
  remark?: string;
}

export interface GetAllSchemaStoreReq {
  token?: string;
}

export interface GetAllSchemaStoreResp {
  ret?: number;
  schemaStoreContentList?: SchemaStoreContentDto[];
}

export interface SetSchemaStoreReq {
  id?: number;
  key?: string;
  content?: string;
  creator?: string;
}

export interface SetSchemaStoreResp {
  ret?: number;
  errMsg?: string;
}

export interface GetSchemaStoreByKeyReq {
  key?: string;
}

export interface GetSchemaStoreByKeyResp {
  ret?: number;
  errMsg?: string;
  content?: SchemaStoreContentDto;
}

export interface GetAllSchemaStore {
  (params: GetAllSchemaStoreReq): Promise<GetAllSchemaStoreResp>;
}

export interface SetSchemaStore {
  (params: SetSchemaStoreReq): Promise<SetSchemaStoreResp>;
}

export interface GetSchemaStoreByKey {
  (params: GetSchemaStoreByKeyReq): Promise<GetSchemaStoreByKeyResp>;
}

