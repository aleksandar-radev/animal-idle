// src/global.d.ts
export { };

declare global {
  interface Window {
    l: (message: any) => void;
    q: (message: any) => void;
  }

  function l(message: any): void;
  function q(message: any): void;
}

function getCallStack() {
  const stack = new Error().stack;
  if (stack) {
    const lines = stack.split('\n');
    if (lines.length > 3) {
      // Extract the relevant part of the call stack
      const match = lines[3].match(/\/src\/(.+)/);
      if (match) {
        return match[1].trim();
      }
    }
  }
  return '';
}

(window as any).l = function (message: any) {
  console.log(message, getCallStack());
};

(window as any).q = function (message: any) {
  console.log(message, getCallStack());
};

function l(message: any): void {
  (window as any).l(message);
}

function q(message: any): void {
  (window as any).q(message);
}
