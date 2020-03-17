module.exports = asyncMiddleware = handler => (
  async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
      res.send('Something went wrong');
    }
  }
);