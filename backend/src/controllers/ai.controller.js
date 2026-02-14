import aiService from "../services/ai.service.js";

const getReview = async (req, res) => {

  const code = req.body.code;

  if (!code) {
    return res.status(400).json({ message: "Code is required" });
  }

  const response = await aiService(code);

  res.status(200).json({
  success: true,
  review: response
});
};



export default { getReview };
