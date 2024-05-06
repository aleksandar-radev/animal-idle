import SimpleCrypto from 'simple-crypto-js';

const crypt = new SimpleCrypto(import.meta.env.VITE_ENCRYPT_KEY_1 + import.meta.env.VITE_ENCRYPT_KEY_2 + import.meta.env.VITE_ENCRYPT_KEY_3);

export default crypt;
