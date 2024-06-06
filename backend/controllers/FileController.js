const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express();
const File = require('../models/File');
const Image = require('../models/Image');
const { exec } = require('child_process');
const fs = require('fs');
const { error } = require('console');

const upload_directory = path.normalize(__dirname + '/../uploads');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, upload_directory);
    },
    filename: (req, file, cb) => {
      console.log(req.body.tuition);
      cb(null, `${req.body.tuition}-Ex${req.body.exercise}${path.extname(file.originalname)}`);
    }
});
const upload = multer({storage: storage});

const upload_test_case = async(req, res) => {

}

const run_python_code = async(req, res) => {
  const { tuition, exercise } = req.body;
  const file_path = path.join(upload_directory, `${tuition}-Ex${exercise}.py`);
  console.log(file_path);
  

  const test_file_path = path.join(upload_directory, `test_case-Ex${exercise}.py`);
  const output_file_path = path.join(upload_directory, `output-Ex${exercise}-${tuition}.py`);

  append_test_cases(file_path, test_file_path, output_file_path);
  const command = `python ${output_file_path}`;
  
  exec(command, (error, stdout, stderr) => {
    if(error) {
      return res.status(500).json({ message: `error: ${error}`});
    }
    if(stderr) {
      return res.status(400).json({ message: `error ${stderr}`});
    }

    res.status(200).json({ message: `output: ${stdout}`});

  })


  /* exec(command, (error, stdout, stderr) => {
    if(error) {
      return res.status(500).json({ message: `error: ${error}`});
    }
    if(stderr) {
      return res.status(400).json({ message: `error ${stderr}`});
    }

    res.status(200).json({ message: `output: ${stdout}`});
  }) */

  /* exec(command, (error, stdout, stderr) => {
    if(error) {
      return res.status(500).json({ message: `error: ${error}`});
    }
    if(stderr) {
      return res.status(400).json({ message: `error ${stderr}`});
    }

    res.status(200).json({ message: `output: ${stdout}`});
  }); */
};

const append_test_cases = (file1, file2, output) => {
  const file1_code = fs.readFileSync(file1, 'utf8', (err, data) => {
    if(err) {
      console.log(err);
      return;
    }
  });
  const file2_code = fs.readFileSync(file2, 'utf8', (err, data) => {
    if(err) {
      console.log(err);
      return;
    }
  });

  fs.writeFileSync(output, file1_code + '\n' + file2_code, (err) => {
    if(err) {
      console.log(err);
      return;
    }
  });
}

module.exports = {
  upload,
  run_python_code
};

