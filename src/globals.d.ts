// src/global.d.ts
export { };

declare global {
  interface Window {
    l: (message: any) => void;
  }

  function l(message: any): void;
}

(window as any).l = function (message: any) {
  console.log(message);
};