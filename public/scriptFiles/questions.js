export default class Questions {
    constructor() {

        this.qaList = [];

        document.addEventListener("DOMContentLoaded", async() => {
            try {
                const response = await fetch('/api/reportQuestions');
                const questions = await response.json();
                questions.forEach(ques => {
                    this.qaList.push({ question: ques.ques, answer: ques.ans });
                });
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        });
    }

    getAll() {
        return this.qaList;
    }

    getAnswer(question) {
        const found = this.qaList.find(qa => qa.question === question);
        return found ? found.answer : "Question not found";
    }
}