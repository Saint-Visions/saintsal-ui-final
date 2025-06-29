module.exports = function (context, req) {
  console.log("Function is running cleanly.");

  context.res = {
    status: 200,
    body: {
      message: "Function is working."
    }
  };
};
