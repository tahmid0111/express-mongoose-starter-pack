// Error handler
exports.sendError = (res) => {
    res.status(404).json({ status: "fail", message: "Something went wrong" });
  };