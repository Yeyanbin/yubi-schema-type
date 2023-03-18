
import { GetAllSchemaStore, SetSchemaStore, GetSchemaStoreByKey } from './types/schemaStore';

interface IApi {
    getAllSchemaStore: GetAllSchemaStore;
    setSchemaStore: SetSchemaStore;
    getSchemaStoreByKey: GetSchemaStoreByKey;
}

// 单纯体验一下类型
const api: IApi = {
    getAllSchemaStore: (params) => axios.post(url, params),
    
};
const test0 = async () => {
    const data = await api.getSchemaStoreByKey({
        token: 'test',
        key: 'test'
    });

    if (data.ret === 0) {
        const content = data.content!;

        // SchemaStoreContentDto
        content.id
    }
}

const test1 = async () => {
    const data = await api.getAllSchemaStore({
        token: 'test'
    });

    if (data.ret === 1) {
        data.schemaStoreContentList
    }
}

const test2 = async () => {
    const data = await api.setSchemaStore({
        id: 'test',
        key: 'test',
        content: 'test',
        creator: 'test'
    });

    if (data.ret === 1) {
        data.errMsg
    }
}
