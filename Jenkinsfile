pipeline {
    agent any

    environment {
        // Defines the Node version to use from your Jenkins Global Tool Configuration
        NODE_JS = 'node-25' 
    }

    stages {
        stage('Setup') {
            steps {
                // Ensures the specific Node.js version is available in the PATH
                nodejs("${env.NODE_JS}") {
                    sh 'node -v'
                    sh 'npm -v'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                nodejs("${env.NODE_JS}") {
                    // Uses 'npm ci' for faster, reliable builds in CI environments
                    sh 'npm ci'
                }
            }
        }

        stage('Lint & Test') {
            steps {
                nodejs("${env.NODE_JS}") {
                    sh 'npm run lint'
                    // Uncomment if you have tests configured
                    // sh 'npm test'
                }
            }
        }

        stage('Build') {
            steps {
                nodejs("${env.NODE_JS}") {
                    // Next.js build step
                    sh 'npm run build'
                }
            }
        }

        stage('test list out dir') {
            steps {
                // Archives the production build folder (.next) and public assets
                sh 'ls -Ra out'
            }
        }

        stage('Copy files to s3 using AWS CLI command') {
            steps {
                // The 'credentialsId' matches the ID you set in Step 2
                withAWS(credentials: 'aws-s3-global-credentials', region: 'eu-central-1') {
                    sh "aws s3 sync out www.philb.me --delete" 
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                // Archives the production build folder (.next) and public assets
                archiveArtifacts artifacts: '.next/**, public/**, package.json, next.config.js, out/**', fingerprint: true
            }
        }

        // stage('Run AWS CLI command') {
        //     steps {
        //         // The 'credentialsId' matches the ID you set in Step 2
        //         withAWS(credentials: 'aws-s3-global-credentials', region: 'eu-central-1') {
        //             sh '/usr/local/bin/aws s3 ls' // Example: List S3 buckets using the credentials
        //         }
        //     }
        // }
               
    }

    post {
        // always {
        //     // cleanWs() // Cleans the workspace to save disk space on the agent
        // }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}
