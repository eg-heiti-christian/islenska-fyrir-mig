// simple script to parse my ANKI notes and extract verbs and nouns into separate files for use in the app.
// If I scale this large enough, it would be worth importing this data into a database instead of JSON files
const fs = require('fs');
const readline = require('readline');
const events = require('events');

async function processLineByLineEvent() {
    const rl = readline.createInterface({
        input: fs.createReadStream('./src/data/selected-notes.txt')
    });

    const verbs = [];
    const nouns = [];

    rl.on('line', (line) => {
        console.log(`Event Note: ${line}`);

        if (line.toLowerCase().startsWith('að')) {
            if (line.split(' ').length === 2) {
                verbs.push(line.split('að ')[1]);
            }
        } else if (line.includes('hún') || line.includes('hun') || line.includes('hann') || line.includes('það')) {
            nouns.push(line.split(' ')[0]);
        }
    });

    await events.once(rl, 'close');

    const existingVerbs = JSON.parse(fs.readFileSync('./src/data/verbs.json', 'utf8'));
    const existingNouns = JSON.parse(fs.readFileSync('./src/data/nouns.json', 'utf8'));

    // merges new vocab with existing vocab, removing duplicates, and writes to file
    const allVerbs = [...new Set(existingVerbs.concat(verbs))];
    const allNouns = [...new Set(existingNouns.concat(nouns))];
    await fs.writeFileSync('./src/data/verbs.json', JSON.stringify(allVerbs, null, 2), 'utf8');
    await fs.writeFileSync('./src/data/nouns.json', JSON.stringify(allNouns, null, 2), 'utf8');

}

processLineByLineEvent();