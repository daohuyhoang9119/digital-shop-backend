import express from 'express';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => {
  res.send('Server is running now');
});
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
