const NotFound = (req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
};

export default NotFound;
