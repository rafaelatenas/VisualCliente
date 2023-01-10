const bufferABase64 = buffer => btoa(String.fromCharCode(...new Uint8Array(buffer)));
const base64ABuffer = buffer => Uint8Array.from(atob(buffer), c => c.charCodeAt(0));
const LONGITUD_SAL = 16;
const LONGITUD_VECTOR_INICIALIZACION = LONGITUD_SAL;
const derivacionDeClaveBasadaEnContraseña = async (contraseña, sal, iteraciones, longitud, hash, algoritmo = 'AES-CBC') => {
    const encoder = new TextEncoder();
    let keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        encoder.encode(contraseña),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
    );
    return await window.crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: encoder.encode(sal),
            iterations: iteraciones,
            hash
        },
        keyMaterial,
        { name: algoritmo, length: longitud },
        false,
        ['encrypt', 'decrypt']
    );
}
export const encriptar = async (contraseña, textoPlano, tipo) => {
    const encoder = new TextEncoder();
    const sal = window.crypto.getRandomValues(new Uint8Array(LONGITUD_SAL));
    const vectorInicializacion = window.crypto.getRandomValues(new Uint8Array(LONGITUD_VECTOR_INICIALIZACION));
    const bufferTextoPlano = encoder.encode(textoPlano);
    const clave = await derivacionDeClaveBasadaEnContraseña(contraseña, sal, 100000, 256, 'SHA-256');
    const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-CBC", iv: vectorInicializacion },
        clave,
        bufferTextoPlano
    );
    return bufferABase64([
        ...sal,
        ...vectorInicializacion,
        ...new Uint8Array(encrypted)
    ]);
    // switch (tipo) {
    //     case 0:
    //         valor =
    //         bufferABase64([
    //             ...sal,
    //             ...vectorInicializacion,
    //             ...new Uint8Array(encrypted)
    //         ]);
    //         break;
    //     case 1:
            
    //         break;
    //     default:
    //         break;
    // }
};

export const desencriptar = async (contraseña, encriptadoEnBase64) => {
    const decoder = new TextDecoder();
    const datosEncriptados = base64ABuffer('zs87bdaFx2Al+YnJRNIebF+hwEhlA8K7kpNhx8c5itHkHzBo/MiPR4MlDXquW8w8');
		console.log(typeof encriptadoEnBase64 === "string")

    const sal = datosEncriptados.slice(0, LONGITUD_SAL);
    const vectorInicializacion = datosEncriptados.slice(0 + LONGITUD_SAL, LONGITUD_SAL + LONGITUD_VECTOR_INICIALIZACION);
    const clave = await derivacionDeClaveBasadaEnContraseña(contraseña, sal, 100000, 256, 'SHA-256');
    const datosDesencriptadosComoBuffer = await window.crypto.subtle.decrypt(
        { name: "AES-CBC", iv: vectorInicializacion },
        clave,
        datosEncriptados.slice(LONGITUD_SAL + LONGITUD_VECTOR_INICIALIZACION)
    );
    return decoder.decode(datosDesencriptadosComoBuffer);

}
