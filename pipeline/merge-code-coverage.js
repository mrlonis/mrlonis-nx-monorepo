/**
 * This script finds all the code coverage generated XML files and executes a merging script which combines all of them together in one file "coverage/output.xml".
 * This file is then referenced by the Azure DevOps pipeline to show the code coverage of all affected files.
 * */

const glob = require('glob');
const path = require('path');
const { exec } = require('child_process');

function findCoverageFiles() {
  return new Promise((resolve, reject) => {
    glob('./coverage/**/cobertura-coverage.xml', null, (err, filePaths) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(filePaths);
      }
    });
  });
}

function generateCoverageMergingCommand(filePaths) {
  let command = 'cobertura-merge -o coverage/output.xml ';
  filePaths.forEach((filePath) => {
    const projectName = extractProjectNameFromFilePath(filePath);
    command += `${projectName}=${filePath} `;
  });
  return command;
}

function extractProjectNameFromFilePath(filePath) {
  return path.basename(path.dirname(filePath));
}

function executeCoverageMergingCommand(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

(async () => {
  const filePaths = await findCoverageFiles();
  const command = generateCoverageMergingCommand(filePaths);
  executeCoverageMergingCommand(command);
})();
