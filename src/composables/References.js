import { ref } from "vue";

let DeleteAccountDialogState = ref(false);

const ToggleDeleteAccountDialog = () => {
  DeleteAccountDialogState.value = !DeleteAccountDialogState.value;
};

export { DeleteAccountDialogState, ToggleDeleteAccountDialog };
