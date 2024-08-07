const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

const upload_directory = path.join(__dirname, '/../uploads/temp');

const run_interpreter = (req, res) => {
    const { code } = req.body;
    console.log(code);
    const pattern = /^\s*import\s+(sys|os)\b|\bfrom\s+(sys|os)\s+import\b/m;
    if(code.match(pattern)) {
        return res.json({ error: 'Não é permitido o uso de bibliotecas!' });
    }
    const file_path = path.join(upload_directory, 'code.py');
    fs.writeFileSync(file_path, code);
    const command = `python ${file_path}`;
    exec(command, (error, stdout, stderr) => {
        if(error) {
            return res.json({ error: stderr });
        }
        if(stderr) {
            return res.json({ error: stderr });
        }
        return res.json({ output: stdout });
    })
};

const upload_test_cases= async(req, res) => {
    
}

module.exports = { run_interpreter };