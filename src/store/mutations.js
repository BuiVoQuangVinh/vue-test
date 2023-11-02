export default {

    changeMessage(state, data) {
        state.message = data
    },
    setQuestions(state, questions) {
        state.questions = [...questions]

    },
}