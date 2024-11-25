export default class Questions {
    constructor() {
        this.qaList = [
            { question: "Assign new Dj? ", answer: "simply click on edit key and you will be able to assign new Dj" },
            { question: "save my changes?", answer: "click on the Apply Button" },
            { question: "shortcut to apply changes? ", answer: "Yes, Click left shift +  enter." },
            { question: "shortcut to search? ", answer: "Yes, Click left shift + F" },
            { question: "delete a assigned DJ? ", answer: "Yes, Click on the delete button." },
        ];
    }

    getAll() {
        return this.qaList;
    }

    getAnswer(question) {
        const found = this.qaList.find(qa => qa.question === question);
        return found ? found.answer : "Question not found";
    }
}
