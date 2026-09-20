// Uso: node scripts/generate-admin-hash.js "sua-senha-aqui"
// Copie o resultado para a variável ADMIN_PASSWORD_HASH no .env / Vercel.

const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error('Uso: node scripts/generate-admin-hash.js "sua-senha-aqui"');
  process.exit(1);
}

bcrypt.hash(password, 10).then((hash) => {
  console.log("\nADMIN_PASSWORD_HASH=" + hash + "\n");
});
