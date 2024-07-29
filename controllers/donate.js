import Donut from "../models/Donut.js";

export async function donutCreate(req, res) {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ message: "Not correct data" });
        }

        const newDonut = await Donut.create(data);

        return res
            .status(200)
            .json({ message: "Data was created", data: newDonut });
    } catch (error) {
        console.log(error);
    }
}

export async function donutDelete(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Donut not found" });
        }

        await Donut.findByIdAndDelete(id);
        return res.status(200).json({ message: "Donut was deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function updateDonut(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!id) {
            return res.status(400).json({ message: "Donut not found" });
        }

        if (!data) {
            return res.status(400).json({ message: "Not correct data" });
        }

        const donut = await Donut.findOneAndUpdate({ _id: id }, data, {
            new: true,
        });

        return res.status(200).json(donut);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
export async function getOneDonut(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Donut not found" });
        }

        const donut = await Donut.findOne({ _id: id });

        return res.status(200).json(donut);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function getAllDonuts(req, res) {
    try {
        const donuts = await Donut.find({});
        return res.status(200).json(donuts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
