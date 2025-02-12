
// export const useSideBar = () => useAppSelector((state) => state.layout.sidebarOpen);

import { useAppSelector } from "../hooks";

export const useModal = () => useAppSelector((state) => state.modal);