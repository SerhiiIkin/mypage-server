import {
    S3Client,
    PutObjectCommand,
    DeleteObjectsCommand,
    ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import mime from "mime";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    },
});

const uploadFileToS3 = async (file, fileName, title) => {
    const contentType = mime.getType(fileName);
    const uniqueFileName = `${title}/${uuidv4()}-${fileName}`;

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: uniqueFileName,
        Body: file,
        ContentType: contentType,
    };

    const command = new PutObjectCommand(params);
    try {
        await s3Client.send(command);
    } catch (error) {
        console.log(error);
    }

    return uniqueFileName;
};

const getPublicFileUrl = (fileName) => {
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const region = process.env.AWS_S3_REGION;
    return `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
};

export async function uploadImages(req, res) {
    try {
        const { title } = req.body;

        if (!title) {
            return res
                .status(400)
                .json({ success: false, message: "Not correct data" });
        }

        if (!req.files.length < 0) {
            return res
                .status(400)
                .json({ success: false, message: "No files" });
        }

        const uploadedFiles = await uploadFilesToS3(req.files, title);

        return res.status(200).json({ success: true, uploadedFiles });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function deleteImages(req, res) {
    try {
        const { folderName } = req.body;
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        if (!folderName) {
            return res
                .status(400)
                .json({ success: false, message: "Not correct id" });
        }

        try {
            removeFilesFolder(bucketName, folderName);

            const deleteFolderCommand = new DeleteObjectsCommand({
                Bucket: bucketName,
                Delete: {
                    Objects: [{ Key: folderName }],
                },
            });

            await s3Client.send(deleteFolderCommand);
        } catch (error) {
            console.log(error);
        }
        return res.status(200).json({ message: "Succes" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function updateImages(req, res) {
    try {
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        const { title } = req.body;

        if (!title) {
            return res
                .status(400)
                .json({ success: false, message: "Not correct data" });
        }

        if (!req.files.length < 0) {
            return res
                .status(400)
                .json({ success: false, message: "No files" });
        }

        removeFilesFolder(bucketName, title);
        const uploadedFiles = await uploadFilesToS3(req.files, title);

        return res.status(200).json({ success: true, uploadedFiles });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getImages(req, res) {
    try {
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        const region = process.env.AWS_S3_REGION;

        const folderName = req.query.id;

        if (!folderName) {
            return res
                .status(400)
                .json({ success: false, message: "Not correct folderName" });
        }

        const listObjectsCommand = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: folderName,
        });

        const listObjectsResponse = await s3Client.send(listObjectsCommand);

        const objects = listObjectsResponse.Contents?.map(
            (object) =>
                `https://${bucketName}.s3.${region}.amazonaws.com/${object.Key}`
        ).slice(1);
        return res.status(200).json(objects);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function removeFilesFolder(bucketName, folderName) {
    const listObjectsCommand = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: folderName,
    });

    const listObjectsResponse = await s3Client.send(listObjectsCommand);

    const objectsToDelete = listObjectsResponse.Contents?.map((object) => ({
        Key: object.Key,
    }));

    if (objectsToDelete?.length) {
        const deleteObjectsCommand = new DeleteObjectsCommand({
            Bucket: bucketName,
            Delete: {
                Objects: objectsToDelete,
            },
        });

        await s3Client.send(deleteObjectsCommand);
    }
}

async function uploadFilesToS3(files, title) {
    return Promise.all(
        files.map(async (image) => {
            const fileName = await uploadFileToS3(
                image.buffer,
                image.originalname,
                title
            );
            const fileUrl = getPublicFileUrl(fileName);

            return { fileName, fileUrl };
        })
    );
}
