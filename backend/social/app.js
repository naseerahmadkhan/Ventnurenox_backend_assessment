const express = require('express');
const app = express();
const mainRouter = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', mainRouter);

app.use('/', async (req, res) => {
  res.status(200).json({ message: `App is running on port. ${process.env.PORT || 4000}` });
});

app.listen(process.env.PORT || 4000, async () => {
  console.log('App started at port', process.env.PORT || 4000);
  await initProducer();
});
