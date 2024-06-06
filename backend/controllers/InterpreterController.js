const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

const upload_directory = path.normalize(__dirname + '/../uploads/temp/');

const run_interpreter_code = async(req, res) => {
    const { code } = req.body;
    const pattern = /^\s*import\s+(sys|os)\b|\bfrom\s+(sys|os)\s+import\b/m;
    if(code.match(pattern)) {
        return res.status(400).json({ message: `You can't use os or sys module in your code`});
    }
    const file_path = path.join(upload_directory, `interpreter.py`);
    fs.writeFileSync(file_path, code);

    const command = `python ${file_path}`;

    exec(command, (error, stdout, stderr) => {
        if(error) {
            return res.status(500).json({ message: `error: ${error}`});
        }
        if(stderr) {
            return res.status(400).json({ message: `error ${stderr}`});
        }

        res.status(200).json({ message: `output: ${stdout}`});
    })

    
}

module.exports = {
    run_interpreter_code
}