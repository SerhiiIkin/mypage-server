import Skill from "../models/Skill.js";
export const createSkill = async (req, res) => {
    try {
        const data = req.body;
        if (!data.title || !data.list) {
            return res
                .status(400)
                .json({ success: false, message: "Not correct data" });
        }

        const skill = await Skill.create(data);

        return res.status(200).json(skill);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find({});
        return res.status(200).json(skills);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateSkill = async (req, res) => {
    try {
        const data = req.body;

        const skill = await Skill.findOneAndUpdate({ _id: data._id }, data, {
            new: true,
        });
        return res.status(200).json(skill);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
