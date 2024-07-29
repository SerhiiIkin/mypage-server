import AWS from "aws-sdk";

const sendEmail = (subject, message) => {
    try {
        AWS.config.update({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
            region: process.env.AWS_SES_REGION,
        });

        const ses = new AWS.SES({ apiVersion: "2010-12-01" });

        const params = {
            Source: process.env.EMAIL,
            Destination: {
                ToAddresses: [process.env.EMAIL_TO],
            },
            Message: {
                Subject: {
                    Data: subject,
                },
                Body: {
                    Text: {
                        Data: message,
                    },
                },
            },
        };

        ses.sendEmail(params, (err, data) => {
            if (err) {
                console.error(err, err.stack);
            } else {
                console.log("Email sent:", data);
            }
        });
    } catch (error) {
        console.error(error);
    }
};

export default sendEmail;
