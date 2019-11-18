console.log(process.env.API_BASE);

export default {
  base: process.env.API_BASE || 'http://localhost:5000/api',
};
