export default {
    fetchAPI () {

        const fetchQuestions = fetch("https://opentdb.com/api.php?amount=10", {
          method: "get",
        });
        fetchQuestions
          .then((response) => {
            return response.json();
          })
          .then((jsonData) => {
            
            this.commit('setQuestions', jsonData.results)

          })
          .catch((error) => {
            console.log("error:", error);
          });
      },
}