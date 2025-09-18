import ProgressRadial from "./ProgressRadial";
export default function QuestionCard({
  question,
  selectedAnswer,
  onSelect,
  onNext,
  onBack,
  current,
  total,
}) {
  const letters = ["A", "B", "C", "D", "E", "F"];

  return (
    <div className="w-full px-[12%]">
      <div className="flex items-center justify-center gap-6 mb-10">
        <h1 className="font-zalando text-[48px] max-w-[70%] break-words text-center">
          {question.question}
        </h1>
        <div className="flex-shrink-0">
          <ProgressRadial current={current} total={total} />
        </div>
      </div>

      <div className="flex justify-center gap-4 w-full mb-10 flex-wrap">
        {question.options.map((opt, index) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`px-6 py-3 border-2 rounded-lg font-roboto transition-all duration-200
              ${
                selectedAnswer === opt
                  ? "bg-[#E3F2FD] border-[#90CAF9] text-gray-800"
                  : "bg-white border-[#E0E0E0] text-gray-700 hover:border-[#90CAF9] hover:bg-gray-50"
              }`}
          >
            <span className="font-semibold text-gray-600">
              {letters[index]}.
            </span>{" "}
            <span className="ml-1">{opt}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 text-gray-400 font-roboto hover:text-gray-800 transition-colors duration-200 underline"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 bg-[#C3EDFF] text-gray-800 rounded-lg font-roboto hover:bg-[#90CAF9] transition-all duration-200 flex items-center gap-2"
        >
          {current == total ? (
            "Discover your results"
          ) : (
            <>
              Next question <span className="text-lg">→</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
