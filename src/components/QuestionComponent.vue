<template>
  <div>
    <!-- {{ question }} -->

    <div class="question">
      <h3 class="question-category">Category: {{ category }}</h3>
      <h3 class="question-question">Question: {{ question }}</h3>
      <ul class="question-ul">
        <li
          v-for="(choice, index) in choices"
          v-bind:key="index"
          class="question-li"
        >
          <button
            class="question-button"
            v-bind:class="{
              correct: answer?.isAnswered && choice === correctAnswer,
              incorect:
                answer?.isAnswered &&
                choice !== correctAnswer &&
                choice == answer?.answer,
              answered: answer?.isAnswered,
            }"
            v-on:click="choiceAnswer(choice)"
            v-bind:disabled="answer?.isAnswered"
          >
            {{ choice }}
          </button>
        </li>
      </ul>
      <p
        class="message"
        v-if="answer?.isAnswered"
        v-bind:class="{
          correct: answer?.isAnswered && choice === correctAnswer,
          incorect:
            answer?.isAnswered &&
            choice !== correctAnswer &&
            choice == answer?.answer,
        }"
      >
        {{ choice === correctAnswer ? "Correct!" : "Incorrect!" }} The answer is
        {{ correctAnswer }}
      </p>
    </div>

    <div class="nav-button">
      <button v-on:click="prev" class="nav-button-prev">Prev</button>
      <button v-on:click="next" class="nav-button-next">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: String,
    category: String,
    choices: Array,
    next: Function,
    prev: Function,
    answer: Object,
    choiceAnswer: Function,
    correctAnswer: String,
  },
  computed: {
    shuffleQuestion() {
      console.log("shuffleQuestion");
      let array = [
        ...this.question?.incorrect_answers,
        this.question?.correct_answer,
      ];
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }

      return array;
    },
  },
  methods: {},
};
</script>

<style scoped>
.question {
  width: 50%;
  margin: 0 auto;
  height: 470px;
}
.question-question {
  height: 60px;
}
.question-ul {
  height: 260px;
}
.question-li {
  display: block;
  list-style: none;
  width: 70;
}

.question-button {
  border: none;
  background: none;
  width: 100%;
  margin-top: 16px;
  padding: 12px 16px;
  font-size: 18px;
  cursor: pointer;
  transition: all 150ms;
}

.question-button:hover {
  background: lightblue;
}

.message {
  padding-top: 20px;
  font-size: 18px;
}

.nav-button {
  display: flex;
  justify-content: center;
}

.nav-button-prev,
.nav-button-next {
  border: none;
  background: rgb(204, 230, 117);
  padding: 12px;
  margin: 16px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.answered {
  transition: all 600ms;

  pointer-events: none;
}

.correct {
  transition: all 600ms;

  background: lightgreen;
}

.incorect {
  background: rgb(236, 69, 69);
}
.question .question-ul .question-li .correct :hover {
  transition: all 600ms;

  background: lightgreen;
}

.question .question-ul .question-li .incorect :hover {
  transition: all 600ms;

  background: rgb(236, 69, 69);
}
</style>