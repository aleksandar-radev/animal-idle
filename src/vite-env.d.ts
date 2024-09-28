/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_ENCRYPT_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
