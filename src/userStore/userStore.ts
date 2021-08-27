import { createStore, createTypedHooks } from "easy-peasy";
import { UserApp, userAppState } from "./interfaces";

const userStore = createStore<UserApp>(userAppState);

export const { useStoreActions , useStoreDispatch , useStoreState } = createTypedHooks<UserApp>();

export default userStore;