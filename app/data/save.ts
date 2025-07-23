"use client";
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";
interface Response {
  id?: Number;
  role?: "user" | "ai";
  message?: string;
}
export function saveData(params: string, data: any) {
  secureLocalStorage.setItem(params, data);
}
export function loadData(params: string) {
  const data = secureLocalStorage.getItem(params);
  if (data) {
    return data;
  } else {
    return [];
  }
}
export function removeData(params:string) {
  secureLocalStorage.removeItem(params)
}
export async function copyTextToClipboard(text:string) {
  try {
    await navigator.clipboard.writeText(text);
    Swal.fire('Text successfully copied to clipboard');
  } catch (err) {
    Swal.fire(`Failed to copy text: ${err}`);
  }
}