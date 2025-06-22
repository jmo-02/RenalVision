const questions = [
  {
    question: "La Enfermedad Renal Crónica puede causar fatiga y presión alta?.",
    model: "/models-3d/Chr-Kidney-Disease.glb",
    options: [
      { text: "Verdadero", correct: true },
      { text: "Falso", correct: false },
    ],
  },
  {
    question: "Los cálculos renales suelen causar dolor agudo lumbar?.",
    model: "/models-3d/symptoms-kidney-stone.glb",
    options: [
      { text: "Verdadero", correct: true },
      { text: "Falso", correct: false },
    ],
  },
  {
    question: "La glomerulonefritis no afecta la presión arterial?.",
    model: "/models-3d/glomerulonephritis/symptoms-glomerulonefritis.glb",
    options: [
      { text: "Verdadero", correct: false },
      { text: "Falso", correct: true },
    ],
  },
  {
    question: "El cáncer de riñón puede manifestarse con sangre en la orina?.",
    model: "/models-3d/kidney-cancer.glb",
    options: [
      { text: "Verdadero", correct: true },
      { text: "Falso", correct: false },
    ],
  },
];

export default questions;