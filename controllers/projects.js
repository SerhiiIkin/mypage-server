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

        const project = await Project.findOne({ _id: id });
        if (!project) {
            return res.status(400).json({ message: "Project not found" });
        }

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

export async function createComment(req, res) {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ message: "Not correct data" });
        }

        const updatedProject = await Project.findOneAndUpdate(
            { _id: data.idProject },
            { $push: { comments: data } },
            {
                new: true,
            }
        );
        if (!updatedProject) {
            return res
                .status(404)
                .json({ message: "Project or comment not found" });
        }

        return res.status(200).json({ message: "Comment was created", data });
    } catch (error) {
        console.log(error);
    }
}

export async function createReply(req, res) {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ message: "Not correct data" });
        }

        const updatedProject = await Project.findOneAndUpdate(
            { _id: data.idProject, "comments._id": data.idComment },
            { $push: { "comments.$.replies": data } },
            { new: true }
        );
        if (!updatedProject) {
            return res
                .status(404)
                .json({ message: "Project or comment not found" });
        }

        return res.status(200).json({ message: "Reply was created", data });
    } catch (error) {
        console.log(error);
    }
}

export async function deleteReply(req, res) {
    try {
        const idComment = req.query.idComment;
        const idReply = req.query.idReply;
        const projectId = req.params.id;
        const project = await Project.findOne({ _id: projectId });
        if (!project) {
            return res.status(400).json({ message: "Project not found" });
        }

        const updatedProject = await Project.findOneAndUpdate(
            { _id: projectId, "comments._id": idComment },
            { $pull: { "comments.$.replies": { _id: idReply } } },
            { new: true }
        );
        if (!updatedProject) {
            return res
                .status(404)
                .json({ message: "Project or comment not found" });
        }
        return res.status(200).json({ message: "Reply was deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function updateReply(req, res) {
    try {
        const reply = req.body;
        const project = await Project.findOne({ _id: reply.idProject });
        if (!project) {
            return res.status(400).json({ message: "Project not found" });
        }
        const updatedProject = await Project.findOneAndUpdate(
            {
                _id: reply.idProject,
                "comments._id": reply.idComment,
                "comments.replies._id": reply._id,
            },
            {
                $set: {
                    "comments.$.replies.$[reply]": reply,
                },
            },
            {
                new: true,
                arrayFilters: [{ "reply._id": reply._id }],
            }
        );


        if (!updatedProject) {
            return res
                .status(404)
                .json({ message: "Project or comment not found" });
        }

        return res.status(200).json({ message: "Comment was updated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function deleteComment(req, res) {
    try {
        const idComment = req.query.idComment;
        const projectId = req.params.id;
        const project = await Project.findOne({ _id: projectId });
        if (!project) {
            return res.status(400).json({ message: "Project not found" });
        }
        const updatedProject = await Project.findOneAndUpdate(
            { _id: projectId },
            { $pull: { comments: { _id: idComment } } },
            { new: true }
        );
        if (!updatedProject) {
            return res
                .status(404)
                .json({ message: "Project or comment not found" });
        }

        return res.status(200).json({ message: "Comment was deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function updateComment(req, res) {
    try {
        const comment = req.body;
        const project = await Project.findOne({ _id: comment.idProject });
        if (!project) {
            return res.status(400).json({ message: "Project not found" });
        }

        const updatedProject = await Project.findOneAndUpdate(
            { _id: comment.idProject, "comments._id": comment.idComment },
            { $set: { comments: comment } },
            { new: true }
        );

        if (!updatedProject) {
            return res
                .status(404)
                .json({ message: "Project or comment not found" });
        }

        return res.status(200).json({ message: "Comment was updated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
