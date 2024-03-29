exports.sendError = (res) => {
    res.status(404).json({ status: "fail", message: "Something went wrong" });
}

// exports.sendStatus = (statusValue, dataValue = undefined) => {
//   return {status: statusValue, data: dataValue}
// }
  