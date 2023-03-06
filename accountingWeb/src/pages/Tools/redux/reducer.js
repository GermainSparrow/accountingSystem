//初始值为空数组
const initialState = []
const reducer = (state=initialState, action) => {
    switch(action.type){
        case'setSearchArray':
        return {
          ...state,
        }
    }
}
export default reducer