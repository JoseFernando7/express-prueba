module.exports = (error, req, res, next) =>
{
  console.error(error);

  if (error.name === 'CastError')
  {
    res.status(400).send({ error: 'malformatted id' });
  }
  else
  {
    res.status(400).end();
  }
};
