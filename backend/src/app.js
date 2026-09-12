import express from 'express';
import noteRoutes from './routes/note.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => {
  res.json({
    message: "Hello World!",
    status: "success"
  })
});

export default app;