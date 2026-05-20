const bcrypt = require('bcrypt');

const run = async () => {
  const hashed = await bcrypt.hash('MediRAG_004', 10);
  console.log('Hashed Password:', hashed);
};

run();
