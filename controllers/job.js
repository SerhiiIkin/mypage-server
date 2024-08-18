import Job from "../models/Job.js";

export async function createJob(req, res) {
    try {
        const data = req.body;
        if (!data) {
            return res
                .status(400)
                .json({ success: false, message: "Not correct data" });
        }

        const job = await Job.create(data);
        return res.status(200).json({ message: "Data was created", data: job });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: error.message });
    }
}

export async function getJobs(req, res) {
    try {
        const jobs = await Job.find({});
        return res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function updateJob(req, res) {
    try {
        const data = req.body;
        if (!data) {
            return res
                .status(400)
                .json({ success: false, message: "Not correct data" });
        }

        const job = await Job.findOneAndUpdate({ _id: data._id }, data, {
            new: true,
        });
        return res.status(200).json({ message: "Data was updated", data: job });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function deleteJob(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            return res
                .status(400)
                .json({ success: false, message: "Not correct data" });
        }
        await Job.findByIdAndDelete(id);
        return res.status(200).json({ message: "Data was deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
