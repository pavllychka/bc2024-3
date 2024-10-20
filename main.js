const { Command } = require('commander');
const fs = require('fs');
const program = new Command();
//налаштовую аргументи командного рядку 
program
  .requiredOption('-i, --input <path>', 'Path to input file') //обв'язково вказую шлх якй програма буде читати 
  .option('-o, --output <path>', 'Path to output file') // необов'язково вказую шлях в якому програма зберігає результат 
  .option('-d, --display', 'Display output to console'); // неоьов'язковий параметр який зберіга результат 
  

program.parse(process.argv); // аналіз 
const options = program.opts(); // зберігає опції у змміній optipn 

// якщо інпут не вказано то сваримось 
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

// якщо шлях вказаний не правильний то знову сваримось 
if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

// читаю файл завдяки utf8 як текст 
const data = fs.readFileSync(options.input, 'utf8');
const jsonData = JSON.parse(data);

const income = jsonData.find(item => item.txt === 'Доходи, усього');
const expenses = jsonData.find(item => item.txt === 'Витрати, усього');

const result = []; 
if (income) {
    result.push(`Доходи: ${income.value}`);
}
if (expenses) {
    result.push (`Витрати: ${expenses.value}`);
}

if (options.output) {
  fs.writeFileSync(options.output, result.join('\n'), 'utf8'); // якщо output то файл 
}

if (options.display) {
  console.log(result.join('\n')); // якщо display то консоль
}
