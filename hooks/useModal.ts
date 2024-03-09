import { create } from "zustand"

export type ModalType = "createChart"
// interface ModalData {
//     server?: Server,
//     channel?: Channel,
//     channelType?: ChannelType,
//     apiUrl?: string,
//     query?: Record<string, any>;
// }
interface ModalStore {
    type: ModalType | null;
    data: {}
    isOpen: boolean;
    onOpen: (type: ModalType) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type }),
    onClose: () => set({
        type: null,
        isOpen: false
    })
}))