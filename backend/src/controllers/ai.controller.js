import aiService from "../services/ai.service.js";

const getReview = async (req, res) => {

  const code = req.body.code;

  // In ai.controller.js, at the start of getReview:
console.log("req.body:", req.body);
console.log("req.body.code:", req.body?.code);

  if (!code) {
    return res.status(400).json({ message: "Code is required" });
  }

  const response = await aiService(code);

  res.send(response);
};



export default { getReview };
