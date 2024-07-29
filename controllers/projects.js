import Project from "../models/Project.js";

export async function projectCreate(req, res) {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ message: "Not correct data" });
        }

        const newProject = await Project.create(data);

        return res
            .status(200)
            .json({ message: "Data was created", data: newProject });
    } catch (error) {
        console.log(error);
    }
}

export async function projectDelete(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Project not found" });
        }

        await Project.findByIdAndDelete(id);
        return res.status(200).json({ message: "Project was deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function updateProject(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!id) {
            return res.status(400).json({ message: "Project not found" });
        }

        if (!data) {
            return res.status(400).json({ message: "Not correct data" });
        }

        const project = await Project.findOneAndUpdate({ _id: id }, data, {
            new: true,
        });

        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
export async function getOneProject(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Project not found" });
        }

        const project = await Project.findOne({ _id: id });

        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function getAllProjects(req, res) {
    try {
        const projects = await Project.find({});
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
