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
        sh '''curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash
ls $HOME/.nvm
sh $HOME/.nvm/nvm.sh'''
      }
    }
  }
}