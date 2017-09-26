pipeline {
  agent any
  stages {
    stage('System Info') {
      steps {
        sh '''cat /proc/version
whoami'''
      }
    }
    stage('Install NVM') {
      steps {
        sh 'curl https://raw.githubusercontent.com/creationix/nvm/v0.25.0/install.sh | bash'
      }
    }
  }
}