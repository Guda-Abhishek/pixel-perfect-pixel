pipeline {
  agent any
  options {
    timestamps()
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }
  environment {
    PROJECT_NAME = 'portfolio'
    ARTIFACT_FILE = 'portfolio-build.tar.gz'
    MANIFEST_FILE = 'portfolio-manifest.json'
    CHECKSUM_FILE = 'portfolio-build.tar.gz.sha256'
  }
  stages {
    stage('Checkout') {
      steps {
        deleteDir()
        checkout scm
      }
    }
    stage('Install locked dependencies') {
      steps {
        bat 'node --version'
        bat 'npm --version'
        bat 'npm ci'
      }
    }
    stage('Build and test') {
      steps {
        bat 'npm run build'
        bat 'npm run lint'
        bat 'npm test'
      }
    }
    stage('Package and verify integrity') {
      steps {
        powershell '''
          $ErrorActionPreference = "Stop"
          $artifactDir = @(".output", "dist") | Where-Object { Test-Path $_ -PathType Container } | Select-Object -First 1
          if (!$artifactDir) {
            throw "Build succeeded but no supported output directory (.output or dist) was found."
          }
          tar -czf "$env:ARTIFACT_FILE" -C "$artifactDir" .
          $env:PROJECT_NAME = "portfolio"
          node scripts/artifact-integrity.mjs create "$artifactDir" "$env:MANIFEST_FILE" "$env:ARTIFACT_FILE"
          node scripts/artifact-integrity.mjs verify "$artifactDir" "$env:MANIFEST_FILE" "$env:ARTIFACT_FILE"
          node scripts/artifact-integrity.mjs hash "$env:ARTIFACT_FILE" "$env:CHECKSUM_FILE"
          node scripts/artifact-integrity.mjs verify-hash "$env:ARTIFACT_FILE" "$env:CHECKSUM_FILE"
        '''
        archiveArtifacts artifacts: 'portfolio-build.tar.gz,portfolio-manifest.json,portfolio-build.tar.gz.sha256', fingerprint: true
      }
    }
    stage('Publish to Nexus (optional)') {
      when {
        expression { return env.NEXUS_RAW_REPOSITORY_URL?.trim() }
      }
      steps {
        withCredentials([usernamePassword(credentialsId: 'nexus-credentials', usernameVariable: 'NEXUS_USER', passwordVariable: 'NEXUS_PASSWORD')]) {
          powershell '''
            $ErrorActionPreference = "Stop"
            $base = $env:NEXUS_RAW_REPOSITORY_URL.TrimEnd('/')
            $target = "$base/portfolio/$env:BUILD_NUMBER"
            $pair = $env:NEXUS_USER + ':' + $env:NEXUS_PASSWORD
            $encoded = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($pair))
            $headers = @{ Authorization = "Basic $encoded" }
            foreach ($file in @($env:ARTIFACT_FILE, $env:MANIFEST_FILE, $env:CHECKSUM_FILE)) {
              Invoke-WebRequest -Uri "$target/$file" -Method Put -InFile $file -Headers $headers -UseBasicParsing | Out-Null
              Write-Output "Published $file to Nexus build $env:BUILD_NUMBER"
            }
            Remove-Variable pair, encoded, headers
          '''
        }
      }
    }
  }
  post {
    success {
      echo 'Portfolio pipeline succeeded; artifact checksums and manifest were verified.'
    }
    failure {
      echo 'Portfolio pipeline failed. Review the first failing stage; publication is gated behind successful verification.'
    }
  }
}
