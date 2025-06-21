const questions = [
  {
    question: "¿Qué síntomas corresponden a la Enfermedad Renal Crónica?",
    model: "/models-3d/Chr-Kidney-Disease.glb",
    options: [
      { text: "Fatiga, hinchazón, presión alta", correct: true },
      { text: "Dolor agudo lumbar, sangre en orina", correct: false },
      { text: "Dolor al orinar, fiebre", correct: false },
    ],
  },
  {
    question: "¿Qué síntomas corresponden a los Cálculos Renales?",
    model: "/models-3d/symptoms-kidney-stone.glb",
    options: [
      { text: "Dolor agudo lumbar, sangre en orina", correct: true },
      { text: "Fatiga, hinchazón, presión alta", correct: false },
      { text: "Orina espumosa, picazón", correct: false },
    ],
  },
  {
    question: "¿Qué síntomas corresponden a la Glomerulonefritis?",
    model: "/models-3d/symptoms-glomerulonefritis.glb",
    options: [
      { text: "Orina oscura, hinchazón facial, presión alta", correct: true },
      { text: "Dolor lumbar, fiebre", correct: false },
      { text: "Náuseas, vómitos, dolor abdominal", correct: false },
    ],
  },
  {
    question: "¿Qué síntomas corresponden al Cáncer de Riñón?",
    model: "/models-3d/kidney-cancer.glb",
    options: [
      { text: "Sangre en la orina, dolor lumbar persistente, masa abdominal", correct: true },
      { text: "Orina espumosa, picazón", correct: false },
      { text: "Fiebre alta, escalofríos", correct: false },
    ],
  },
];

export default questions;