pipeline {
  agent any
  stages {
    stage('System Info') {
      steps {
        sh '''cat /proc/version
whoami'''
      }
    }
    stage('Install Node') {
      steps {
        sh '''sudo su jenkins
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs'''
      }
    }
  }
}