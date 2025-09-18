import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import questions from "../data/questions";
import QuestionCard from "../components/QuestionCard";
import ProgressRadial from "../components/ProgressRadial";
import FadeInSection from "../components/FadeInSection";

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const questionId = parseInt(id);

  const question = questions.find((q) => q.id === questionId);

  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(`q${questionId}`) || "";
    setSelectedAnswer(saved);
  }, [questionId]);

  const handleNext = () => {
    if (selectedAnswer) localStorage.setItem(`q${questionId}`, selectedAnswer);
    if (questionId < questions.length) {
      navigate(`/question/${questionId + 1}`);
    } else {
      navigate("/results");
    }
  };

  const handleBack = () => {
    if (questionId > 1) {
      navigate(`/question/${questionId - 1}`);
    } else {
      navigate("/");
    }
  };

  return (
    <FadeInSection>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
        <QuestionCard
          question={question}
          selectedAnswer={selectedAnswer}
          onSelect={setSelectedAnswer}
          onNext={handleNext}
          onBack={handleBack}
          current={questionId}
          total={questions.length}
        />
      </div>
    </FadeInSection>
  );
}
