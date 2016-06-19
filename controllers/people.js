/* eslint-env node */

module.exports = {
  update: (req, res, next) => {
    res.status(200).json(req.body);
  },
};
