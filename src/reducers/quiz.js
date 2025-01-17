import { createSlice } from "@reduxjs/toolkit";

// Change these to your own questions!

const questions = [
  {
    id: 1,
    type: "radio",
    questionText:
      "What position does Harry play on the Gryffindor Quidditch team?",
    options: ["Keeper", "Beater", "Chaser", "Seeker"],
    correctAnswerIndex: 3,
  },

  {
    id: 2,
    type: "picture",
    questionText:
      "Which of these professors delivered Harry Potter to his aunt's doorstep when his parents died?",
    options: [
      { name: "Professor Quirrell", imgSrc: "./pictures/quirrell.jpg" },
      { name: "Professor Dumbledore", imgSrc: "./pictures/dumbledore.jpg" },
      { name: "Professor Hagrid", imgSrc: "./pictures/hagrid.jpg" },
      { name: "Professor McGonagall", imgSrc: "./pictures/mcgonagall.jpg" },
    ],
    correctAnswerIndex: 2,
  },

  {
    id: 3,
    type: "button",
    questionText:
      "On what date does the Hogwarts Express depart the platform to head to Hogwarts?",
    options: ["5th September", "1st September", "31st August", "3rd September"],
    correctAnswerIndex: 1,
  },

  {
    id: 4,
    type: "button",
    questionText:
      "What did Ron call Hermione after Charms class that made her cry?",
    options: ["A nightmare", "A know it all", "A loser", "A try-hard"],
    correctAnswerIndex: 0,
  },

  {
    id: 5,
    type: "picture",
    questionText:
      "On Harry’s first Hallowe’en at Hogwarts, who was responsible for the troll in the dungeon?",
    options: [
      { name: "Professor Dumbledore", imgSrc: "./pictures/dumbledore.jpg" },
      { name: "Professor Quirrell", imgSrc: "./pictures/quirrell.jpg" },
      { name: "Hagrid", imgSrc: "./pictures/hagrid.jpg" },
      { name: "Draco Malfoy", imgSrc: "./pictures/draco.jpg" },
    ],
    correctAnswerIndex: 1,
  },

  {
    id: 6,
    type: "radio",
    questionText:
      "What type of Muggle car did Mr Weasley tinker with in his shed and turn into a flying car?",
    options: ["Ford Galaxy", "Ford Fiesta", "Ford Focus", "Ford Anglia"],
    correctAnswerIndex: 3,
  },

  {
    id: 7,
    type: "button",
    questionText: "In what Hogwarts year do the students learn to Apparate?",
    options: ["Sixth year", "Fourth year", "Fifth year", "Seventh year"],
    correctAnswerIndex: 0,
  },

  {
    id: 8,
    type: "button",
    questionText: "Which Hogwarts subject is taught in North Tower?",
    options: ["Arithmancy", "Ancient Runes", "Divination", "Astronomy"],
    correctAnswerIndex: 2,
  },

  {
    id: 9,
    type: "button",
    imgSrc: "",
    questionText:
      "What is the name of Aunt Marge’s dog that she brings round to the Dursleys’?",
    options: ["Axel", "Ripper", "Brutu", "Chomper"],
    correctAnswerIndex: 1,
  },

  {
    id: 10,
    type: "picture",
    questionText: "Which of these wizards is an animagus?",
    options: [
      { name: "Professor McGonagall", imgSrc: "./pictures/mcgonagall.jpg" },
      { name: "Professor Quirrell", imgSrc: "./pictures/quirrell.jpg" },
      { name: "Draco Malfoy", imgSrc: "./pictures/draco.jpg" },
      { name: "Professor Dumbledore", imgSrc: "./pictures/dumbledore.jpg" },
    ],
    correctAnswerIndex: 0,
  },
];

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          "Could not find question! Check to make sure you are passing the question id correctly."
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex,
      });
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState;
    },
  },
});
