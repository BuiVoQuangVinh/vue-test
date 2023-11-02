<template>
  <div id="app">
    <div v-if="!isLoad">
      <div>
        <h3>Scored: {{ scored }}</h3>
      </div>
      <QuestionComponent
        :question="questions[current].question"
        :category="questions[current].category"
        :choices="shufffleQuestion[current]"
        :current="current"
        :next="next"
        :prev="prev"
        :choiceAnswer="choiceAnswer"
        :answer="answers[current]"
        :correctAnswer="questions[current].correct_answer"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";

import QuestionComponent from "./components/QuestionComponent.vue";

export default {
  name: "App",
  components: {
    QuestionComponent,
  },
  data() {
    return {
      current: 0,
      shufffleQuestion: [],
      answers: [],
      scored: 0,
      isLoad: false,
      answered: 0,
    };
  },
  computed: {
    ...mapGetters(["getMessage"]),
    ...mapState(["questions"]),
  },
  methods: {
    ...mapMutations(["changeMessage"]),

    prev() {
      if (this.current > 0) {
        this.current--;
      }
    },
    next() {
      if (this.current < 9) {
        this.current++;
      }
    },

    shuffle() {
      let array = [];
      for (let i = 0; i < this.questions.length; i++) {
        array.push([
          ...this.questions[i].incorrect_answers,
          this.questions[i].correct_answer,
        ]);
      }
      this.shufffleQuestion = array.map((items) => {
        let newItem = [...items];
        for (var i = newItem.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = newItem[i];
          newItem[i] = newItem[j];
          newItem[j] = temp;
        }
        return newItem;
      });
    },

    choiceAnswer(answer) {
      console.log({
        correct: this.questions[this.current].correct_answer,
        answer: answer,
      });
      if (answer === this.questions[this.current].correct_answer) {
        this.scored++;
      }
      this.answers[this.current] = { answer, isAnswered: true };

      // console.log(this.answers);
      this.answers = [...this.answers];
      // console.log(this.answers);
      this.answered++;
    },

    redo() {
      this.isLoad = true;
      this.current = 0;
      this.shufffleQuestion = [];
      this.answers = [];
      this.scored = 0;
      this.$store.dispatch("fetchAPI");
    },
  },
  watch: {
    questions() {
      this.shuffle();
      this.isLoad = false;
    },
    answered() {
      if (this.answered === 10) {
        setTimeout(() => {
          const isRedo = confirm(
            "Bạn đã đã trả lời đúng " +
              this.scored +
              "/" +
              this.answered +
              " câu.\nBạn có muốn làm lại không?"
          );
          if (isRedo) {
            this.redo();
          }
        }, 800);
      }
    },
  },
  mounted() {
    this.$store.dispatch("fetchAPI");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
