const bcrypt = require('bcrypt');

async function hashPassword(){
  const myPassword = 'admin 1234';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
  return hash;
}

async function verifyPassword(hash_pass){
  const myPassword = 'admin 1234';
  const isMatch = await bcrypt.compare(myPassword, hash_pass);
  console.log(isMatch);
}

hashPassword()
  .then(hash_rs => verifyPassword(hash_rs))
