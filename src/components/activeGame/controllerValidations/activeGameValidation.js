const Joi = require("joi");
const { REGIONS } = require("../../../constants");

const activeGameValidation = async (req, res, next) => {
  try {
    const querySchema = Joi.object({
      summonerName: Joi.string().required(),
      region: Joi.string()
        .valid(...REGIONS)
        .required(),
    });

    await querySchema.validateAsync(req.query);
    next();
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = { activeGameValidation };
