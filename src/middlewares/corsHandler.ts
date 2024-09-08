import cors from 'cors';

const corsHandler = cors({
  origin: '*', // Allow all origins. Change this to specific domains for more security.
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
});

export default corsHandler;
