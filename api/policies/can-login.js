module.exports = async function (req, res, proceed) {
    const { email } = req.allParams();
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(404).json({
          error: `${email} does not belong to a user`,
        });
      } else {
        return proceed();
      }
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };