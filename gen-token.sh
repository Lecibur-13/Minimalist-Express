#!/bin/sh

# Generar una cadena aleatoria del mismo tamaño que un Bearer token
length=64  # Tamaño del token Bearer (ajustar según sea necesario)
token=$(openssl rand -hex $length)

# Calcular el hash SHA-256 del token usando bcrypt de forma sincrónica
token_hash=$(node -e "
const bcrypt = require('bcrypt');
const token = '$token';
bcrypt.hash(token, 10, function(err, hash) {
    if (err) throw err;
    console.log(hash);
});
" | tail -n 1)

# Verificar si el hash fue generado correctamente
if [ -z "$token_hash" ]; then
    echo "Error: no se pudo generar el hash del token."
    exit 1
fi

# Escapar caracteres '/' en el hash para sed
escaped_token_hash=$(echo "$token_hash" | sed 's/\//\\\//g')

# Reemplazar la línea API_TOKEN_HASH en el archivo .env
if grep -q "API_TOKEN_HASH=" .env; then
    sed -i "s/API_TOKEN_HASH=.*/API_TOKEN_HASH=$escaped_token_hash/" .env
else
    echo "API_TOKEN_HASH=$escaped_token_hash" >> .env
fi

# Guardar el token sin hashear en un archivo de texto
echo "$token" > "token(deleteMe).txt"

echo "Token generado y guardado correctamente."
