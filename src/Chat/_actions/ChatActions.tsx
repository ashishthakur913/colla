

export enum ToastActionType {
    ShowToast		= "SHOW_TOAST",
}

export const ShowToast = (toastOpen: boolean, toastMessage: string) => {
    return {
        type: ToastActionType.ShowToast,
        action: {
            toastOpen: toastOpen,
            toastMessage: toastMessage
        }
    }
};

export type ToastAction =
    ReturnType<typeof ShowToast>