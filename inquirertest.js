/**
 * Pizza delivery prompt example
 * run example by writing `node pizza.js` in your console
 */

'use strict';
let inquirer = require('inquirer');

// console.log(`1. 添加学生
// 2. 生成成绩单 
// 3. 退出 `);
let students = [];
let ids = [];

/**
 * 打印选项
 * 1. add student 
 * 2. make score sheet
 * 3. excute
 */
const getOption = () => {
    var questions = [{
        type: 'list',
        name: 'option',
        message: '请输入你的选择（1～3）：',
        choices: [
            "1. 添加学生",
            "2. 生成成绩单",
            "3. 退出"
        ],
        filter: function (val) { // 使用 filter 只获取首位数字
            return val.split('.')[0]
        }
    }];

    inquirer.prompt(questions).then(answers => {
        // console.log(answers);
        if (answers.option == '1') {
            getStudentInfo()
        } else if (answers.option == '2') {
            // getScoreSheeet();
            getStudentIds()
        } else {
            console.log(students);
        }
        // console.log('\nOrder receipt:');
        // console.log(JSON.stringify(answers, null, '  '));
    })
}

/**
 * 获取学生的 id 以打印成绩单
 */
const getStudentIds = () => {
    let qs = [{
        type: 'input',
        name: 'id',
        message: 'please record the id',
        default: '您可在此输入一个或多个学号，形如 123,124,125 以英文逗号分隔',
        validate: function (input) {
            input = input.split(',')
            input = input.map(item => item * 1)
            // Declare function as asynchronous, and save the done callback 
            var done = this.async();

            // 进行异步操作
            setTimeout(function () {
                let flag = false
                input.forEach(element => {
                    if (isNaN(element)) {
                        flag = true
                    }
                });
                if (flag) {
                    // Pass the return value in the done callback 
                    done("You need to provide a number or a number Set in student's ID Set");
                    return;
                }
                // Pass the return value in the done callback 
                done(null, true);
            }, 1000);
        }
    }];
    inquirer.prompt(qs).then(answers => {
        let arr = answers.id.split(',')
        ids = arr.map(item => item * 1)
        getScoreSheet()
    });
}

/**
 * 输入学生信息
 */
const getStudentInfo = () => {
    let qs = [{
        type: 'input',
        name: 'id',
        message: "what's the student's id (Type:Number)",
        validate: function (input) {
            if (!isNaN(input * 1)) {
                return true;
            }
        }
    }, {
        type: 'input',
        name: 'name',
        message: "What's the studen's name?",
        default: function () {
            return 'Joe';
        }
    }, {
        type: 'input',
        name: 'klass',
        message: "What's the student's class?",
        default: function () {
            return '2';
        }
    }, {
        type: 'input',
        name: 'mathScore',
        message: "What's the student's Math score?",
        default: function () {
            return '60';
        },
        validate: function (input) {
            if (!isNaN(input * 1)) {
                return true;
            }
        }
    }, {
        type: 'input',
        name: 'chineseScore',
        message: "What's the student's Chinese score?",
        default: function () {
            return '60';
        },
        validate: function (input) {
            if (!isNaN(input * 1)) {
                return true;
            }
        }
    }, {
        type: 'input',
        name: 'programScore',
        message: "What's the student's Program score?",
        default: function () {
            return '60';
        },
        validate: function (input) {
            if (!isNaN(input * 1)) {
                return true;
            }
        }
    }, {
        type: 'input',
        name: 'englishScore',
        message: "What's the student's English score?",
        default: function () {
            return '60';
        },
        validate: function (input) {
            if (!isNaN(input * 1)) {
                return true;
            }
        }
    }];

    inquirer.prompt(qs).then(answers => {
        // console.log(answers);
        let student = new Student(answers)
        student.init()
        students.push(student)
        getOption()
        // console.log(s);
    });
}

const getScoreSheet = () => {
    let result = [];
    ids.forEach(id => {
        let student = (students.filter(student => student.id == id))[0]
        result.push(student)
    })

    makeSheet(result)
    // result.forEach(makeSheet(r))

    // console.log('result:',result);
}

const makeSheet = (arr) => {
    let str = [];
    str[0] = `----------------- 成绩单 -------------------`
    str[1] = `姓名 | 数学 | 语文 | 英语 | 编程 | 平均分 | 总分`
    str[2] = `=== === === === === === === === === === ===`
    arr.forEach(r => {
        let result = `${r.name} | ${r.mathScore} | ${r.chineseScore} | ${r.englishScore } | ${r.programScore} | ${r.averageScore} | ${r.totalScore}`
        str.push(result)
    })
    str.push(`=== === === === === === === === === === ===`)

    str.forEach(s => {
        console.log(s);
    })
}

/**
 *@class Student
 *@param id
 *@param name
 *@param klass
 *@param score
 */
class Student {
    constructor(student) {
        this.id = student.id * 1
        this.name = student.name
        this.klass = student.klass
        this.mathScore = student.mathScore * 1
        this.chineseScore = student.chineseScore * 1
        this.programScore = student.programScore * 1
        this.englishScore = student.englishScore * 1
        // this.init()
    }
    init() {
        this.getTotalScore()
        this.getAverageScore()
    }
    getTotalScore() {
        this.totalScore = this.englishScore + this.mathScore + this.chineseScore + this.programScore
    }
    getAverageScore() {
        this.averageScore = parseFloat(this.totalScore / 4)
    }
}

getOption()
// let r = `成绩单 姓名 | 数学 | 语文 | 英语 | 编程 | 平均分 | 总分  
// === === === === === === === ===
// 张三 | 75 | 95 | 80 | 80 | 82.5 | 330
// 李四 | 85 | 80 | 70 | 90 | 81.25 | 325
// === === === === === === === ===
// 全班总分平均数： xxx 全班总分中位数： xxx`
// console.log(r);