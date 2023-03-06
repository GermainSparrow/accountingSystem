import { legacy_createStore as createStore } from "redux";
import reducer from "./reducer";
import setSearchArray from './action'

const store = createStore(reducer);