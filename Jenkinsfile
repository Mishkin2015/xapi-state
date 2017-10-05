pipeline {
  agent any
  stages {
    stage('System Info') {
      steps {
        sh '''cat /proc/version
whoami'''
      }
    }
    stage('Install LL') {
      steps {
        sh 'sudo su -c "curl -o- -L http://lrnloc.kr/installv2 > deployll.sh && bash deployll.sh -y 3"'
      }
    }
  }
}