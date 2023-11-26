module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    console.log(11);
    if (req.body.username === "jack" && req.body.password === "123456") {
      console.log(22);

      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      console.log(33);
      return res.status(400).json({ message: "用户名或密码错误" });
    }
  }
  next();
};
