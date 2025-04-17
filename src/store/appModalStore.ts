import { Store } from "@tanstack/react-store";

import { type ModalId } from "../constants/modalConfig.ts";

type ModalState = {
  id: ModalId | null;
  data?: any;
};

const modalStore = new Store<ModalState>({
  id: null,
  data: undefined,
});

function openModal(id: ModalId, data?: any) {
  modalStore.setState((state) => ({
    ...state,
    id,
    data,
  }));
}

function closeModal() {
  modalStore.setState((state) => ({
    ...state,
    id: null,
    data: undefined,
  }));
}

export { closeModal, modalStore, openModal };
