import SectionTitleText from "../models/SectionTitleText.js";

export const createSectionTitleText = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ message: "Not correct data" });
        }

        const sectionTitleText = await SectionTitleText.create(data);

        return res.status(200).json(sectionTitleText);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateSectionTitleText = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ message: "Not correct data" });
        }

        const sectionTitleText = await SectionTitleText.findOneAndUpdate(
            { key: data.key },
            data,
            {
                new: true,
            }
        );

        return res.status(200).json(sectionTitleText);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSectionTitleText = async (req, res) => {
    try {
        const { key } = req.params;

        const sectionTitleText = await SectionTitleText.findOne({ key });
        res.status(200).json(sectionTitleText);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getAllSectionTitleText = async (req, res) => {
    try {
        const sectionTitleTextAll = await SectionTitleText.find();
        res.status(200).json(sectionTitleTextAll);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
