import Text from "../models/Text.js";

export const getForsideWelcomeDescription = async (req, res) => {
    try {
        const description = await Text.findOne();
        res.status(200).json(description);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateForsideWelcomeDescription = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Not correct data" });
        }

        const description = await Text.findOneAndUpdate({_id: req.body._id}, req.body, {
            new: true,
        });

        res.status(200).json(description);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
