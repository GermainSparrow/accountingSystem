import store from "../../store";

import { setSearchState } from "../../store/counterSearch/counterSearch";
import { setUncollectedArray } from "../../store/UncolletControl";
const deleteIf = (reload: any, name, isSearch, isUncollected, data) => {
    console.log('选择删除被调用了', reload, name, isSearch, isUncollected, data);

    if (isSearch) {
        store.dispatch(setSearchState({ name: name, data: data, rule: '' }))
        return null
    } else if (isUncollected) {
        store.dispatch(setUncollectedArray({ name: name, data: data }))
        console.log('isCollected被调用');
        return null
    }
    reload()

}
export default deleteIf;