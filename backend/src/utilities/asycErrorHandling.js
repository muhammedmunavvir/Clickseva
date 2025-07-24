export const trycatch = (controller) => async (req, res, next) => {
  console.log("hi")
  try {
    await controller(req, res,next);
  } catch (error) {
    console.log("try catch error handleing",error)
    return next(error);
  }
};
   