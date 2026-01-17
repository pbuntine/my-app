This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


The "Jenkins Way" (Recommended)
Using a combination of the AWS Steps plugin and Credentials is the most secure and scalable method.

1. Install Necessary Plugins
Go to Manage Jenkins > Plugins > Available plugins and install:

Pipeline: AWS Steps

CloudBees AWS Credentials

2. Configure Credentials
Instead of running aws configure on the server (which is insecure), store your keys in Jenkins:

Go to Manage Jenkins > Credentials.

Add a new credential of type AWS Credentials.

Enter your Access Key ID and Secret Access Key. Give it an ID like aws-creds-id.

3. Use in a Pipeline
Use the withAWS wrapper in your Jenkinsfile. This automatically handles authentication for the duration of the block.

Groovy

pipeline {
    agent any
    stages {
        stage('Deploy to S3') {
            steps {
                // This block sets the environment variables for AWS CLI
                withAWS(credentials: 'aws-creds-id', region: 'us-east-1') {
                    sh 'aws s3 sync ./dist s3://my-bucket-name'
                }
            }
        }
    }
}
Method 3: Using Docker (Best for Clean Environments)
If your Jenkins supports Docker, you don’t need to install anything on the host. You can pull an image that already contains the AWS CLI.

Groovy

pipeline {
    agent {
        docker { image 'amazon/aws-cli' }
    }
    stages {
        stage('AWS Command') {
            steps {
                // Run commands directly; the image already has the CLI
                sh 'aws s3 ls'
            }
        }
    }
}
Important Security Note
Never hardcode your AWS keys directly into a script or the Jenkins console. Always use the Credentials Manager to keep them encrypted.

Would you like me to show you how to set up an IAM Role instead of using Access Keys if your Jenkins is running on an EC2 instance?