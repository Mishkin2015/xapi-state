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
        sh 'nvm use 8'
      }
    }
  }
}