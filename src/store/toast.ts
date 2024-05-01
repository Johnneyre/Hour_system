import { writable } from 'svelte/store';
import type { ISnackbar } from "$lib/interface"

let snackBar: ISnackbar = {
  type: "green",
  open: false,
  p: ""
}

function createToast() {
  const { subscribe, update } = writable(snackBar);

  return {
    subscribe,
    success: (message: string) => update(_ => ({
      type: "green",
      open: true,
      p: message,
    })),
    error: (message: string) => update(_ => ({
      type: "red",
      open: true,
      p: message
    })),
    info: (message: string) => update(_ => ({
      type: "purple",
      open: true,
      p: message
    })),
    close: ((time: any) => update(x => {
      clearInterval(time)
      return { ...snackBar, open: false }
    })),
    time: function timer() {
      let time = setInterval(() => {
        toast.close(time)
      }, 4000)

      return time
    }

  };
}

export const toast = createToast()



