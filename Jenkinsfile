pipeline {
  agent any
  stages {
    stage('System Info') {
      steps {
        sh 'cat /proc/version'
      }
    }
    stage('Install Node') {
      steps {
        sh '''curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs'''
      }
    }
  }
}