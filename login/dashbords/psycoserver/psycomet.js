// Global variables to store student details and responses
let studentDetails = {};
let responses = [];

// Function to start the assessment
function startAssessment() {
  const name = document.getElementById("student-name").value;
  const age = document.getElementById("student-age").value;
  const gender = document.getElementById("student-gender").value;
  const caste = document.getElementById("student-caste").value;

  if (!name || !age || !gender || !caste) {
    alert("Please fill in all student details.");
    return;
  }

  studentDetails = { name, age, gender, caste };

  document.getElementById("student-details").style.display = "none";
  document.getElementById("questionnaire").style.display = "block";
  document.getElementById("submit-btn").style.display = "block";

  renderQuestions();
  responses = new Array(questions.length).fill(null);
}

// Questions with categories
const questions = [
  // Academic Motivation
  {
    category: "academic_motivation",
    question: "How passionate are you about your current course of study?",
    options: [
      { text: "Extremely passionate", score: 0 },
      { text: "Moderately passionate", score: 1 },
      { text: "Neutral", score: 2 },
      { text: "Somewhat disinterested", score: 3 },
      { text: "Completely disinterested", score: 4 },
    ],
  },
  {
    category: "academic_motivation",
    question: "How often do you actively participate in class activities?",
    options: [
      { text: "Always", score: 0 },
      { text: "Frequently", score: 1 },
      { text: "Occasionally", score: 2 },
      { text: "Rarely", score: 3 },
      { text: "Never", score: 4 },
    ],
  },

  // Socioeconomic
  {
    category: "socioeconomic",
    question: "How would you describe your family's financial situation?",
    options: [
      { text: "Very stable, no financial concerns", score: 0 },
      { text: "Stable with minor financial challenges", score: 1 },
      { text: "Moderate financial stress", score: 2 },
      { text: "Significant financial difficulties", score: 3 },
      { text: "Extreme financial hardship", score: 4 },
    ],
  },
  {
    category: "socioeconomic",
    question:
      "How often do financial concerns affect your ability to focus on studies?",
    options: [
      { text: "Never", score: 0 },
      { text: "Rarely", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Often", score: 3 },
      { text: "Always", score: 4 },
    ],
  },

  // Personal Challenges
  {
    category: "personal_challenges",
    question: "How often do you struggle to manage your study time?",
    options: [
      { text: "Never, I manage time very effectively", score: 0 },
      { text: "Rarely have time management issues", score: 1 },
      { text: "Sometimes struggle with time management", score: 2 },
      { text: "Often struggle with time management", score: 3 },
      { text: "Constantly overwhelmed with time management", score: 4 },
    ],
  },
  {
    category: "personal_challenges",
    question: "How frequently do you miss deadlines or submissions?",
    options: [
      { text: "Never", score: 0 },
      { text: "Rarely", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Often", score: 3 },
      { text: "Always", score: 4 },
    ],
  },
  {
    category: "personal_challenges",
    question: "How often do you feel confident about your academic abilities?",
    options: [
      { text: "Always confident", score: 0 },
      { text: "Most of the time confident", score: 1 },
      { text: "Sometimes confident", score: 2 },
      { text: "Rarely confident", score: 3 },
      { text: "Never confident", score: 4 },
    ],
  },

  // Family Support
  {
    category: "family_support",
    question: "How supportive is your family about your education?",
    options: [
      { text: "Extremely supportive", score: 0 },
      { text: "Very supportive", score: 1 },
      { text: "Moderately supportive", score: 2 },
      { text: "Minimal support", score: 3 },
      { text: "No family support at all", score: 4 },
    ],
  },
  {
    category: "family_support",
    question:
      "How often does your family provide emotional support when needed?",
    options: [
      { text: "Always", score: 0 },
      { text: "Frequently", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Rarely", score: 3 },
      { text: "Never", score: 4 },
    ],
  },

  // Mental Health
  {
    category: "mental_health",
    question: "How would you rate your current stress levels?",
    options: [
      { text: "Very low stress, feeling great", score: 0 },
      { text: "Low to moderate stress", score: 1 },
      { text: "Moderate stress levels", score: 2 },
      { text: "High stress affecting daily life", score: 3 },
      { text: "Overwhelming stress", score: 4 },
    ],
  },
  {
    category: "mental_health",
    question: "How often do you experience anxiety about your academic future?",
    options: [
      { text: "Never", score: 0 },
      { text: "Rarely", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Often", score: 3 },
      { text: "Always", score: 4 },
    ],
  },
];

// Render the questionnaire dynamically
function renderQuestions() {
  const questionnaire = document.getElementById("questionnaire");
  questionnaire.innerHTML = questions
    .map(
      (question, index) =>
        `<div class="question">
                <p>${index + 1}. ${question.question}</p>
                <div class="options">
                    ${question.options
                      .map(
                        (option, optIndex) =>
                          `<label class="option">
                                <input
                                    type="radio"
                                    name="question-${index}"
                                    value="${option.score}"
                                    onclick="handleResponseChange(${index}, ${option.score})"
                                />
                                ${option.text}
                            </label>`
                      )
                      .join("")}
                </div>
            </div>`
    )
    .join("");
}

// Handle changes in responses
function handleResponseChange(index, score) {
  responses[index] = score;
}

// Calculate risk and generate results
function calculateRisk() {
  if (responses.some((response) => response === null)) {
    alert("Please answer all questions.");
    return;
  }

  let totalScore = 0;
  const categoryScores = {};

  responses.forEach((score, index) => {
    totalScore += score;
    const category = questions[index].category;
    categoryScores[category] = (categoryScores[category] || 0) + score;
  });

  Object.keys(categoryScores).forEach((category) => {
    const categoryQuestionCount = questions.filter(
      (q) => q.category === category
    ).length;
    categoryScores[category] =
      (categoryScores[category] / categoryQuestionCount) * 25; // Scale between 0 and 25
  });

  const maxPossibleScore = questions.length * 4;
  const riskPercentage = (totalScore / maxPossibleScore) * 100;

  let riskLevel = "Low Risk";
  if (riskPercentage > 66) riskLevel = "High Risk";
  else if (riskPercentage > 33) riskLevel = "Medium Risk";

  const chartData = Object.entries(categoryScores).map(([category, score]) => ({
    category: category.replace("_", " "),
    score: score.toFixed(2),
  }));

  const assessmentResults = {
    ...studentDetails,
    totalScore,
    riskPercentage: riskPercentage.toFixed(2),
    riskLevel,
    categoryScores: chartData,
  };

  renderResults(assessmentResults);
  sendDataToMongoDB(assessmentResults);
}

// Render results
function renderResults(results) {
  const resultsSection = document.getElementById("results");
  resultsSection.style.display = "block";
  resultsSection.innerHTML = `<h2>Assessment Results</h2>
        <p><strong>Name:</strong> ${results.name}</p>
        <p><strong>Age:</strong> ${results.age}</p>
        <p><strong>Gender:</strong> ${results.gender}</p>
        <p><strong>Caste:</strong> ${results.caste}</p>
        <p><strong>Total Score:</strong> ${results.totalScore}</p>
        <p><strong>Risk Percentage:</strong> ${results.riskPercentage}%</p>
        <p><strong>Risk Level:</strong> ${results.riskLevel}</p>
        <canvas id="chart"></canvas>`;

  renderChart(results.categoryScores);
}

async function sendDataToMongoDB(results) {
  console.log("Sending data to MongoDB:", results); 

  try {
    const response = await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(results),
    });

    if (response.ok) {
      console.log("Data inserted into MongoDB");
    } else {
      console.error("Error inserting data into MongoDB");
    }
  } catch (error) {
    console.error("Error sending data:", error);
  }
}

// Render chart using Chart.js
function renderChart(chartData) {
  const ctx = document.getElementById("chart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: chartData.map((item) => item.category),
      datasets: [
        {
          label: "Risk Score (%)",
          data: chartData.map((item) => item.score),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100, // Adjust the y-axis to scale up to 100
          ticks: {
            stepSize: 20,
          },
        },
      },
    },
  });
}

// Add event listener to the submit button
document.getElementById("submit-btn").addEventListener("click", calculateRisk);
