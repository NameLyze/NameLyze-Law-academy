import React from 'react';
import { clsx } from 'clsx';
import { Card, CardContent } from '../ui/Card';

interface MCQQuestionProps {
  question: {
    id: string;
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    marks: number;
    correctAnswer?: string;
  };
  questionNumber: number;
  selectedAnswer?: string;
  onAnswerSelect: (questionId: string, answer: string) => void;
  showCorrectAnswer?: boolean;
  disabled?: boolean;
}

export const MCQQuestion: React.FC<MCQQuestionProps> = ({
  question,
  questionNumber,
  selectedAnswer,
  onAnswerSelect,
  showCorrectAnswer = false,
  disabled = false,
}) => {
  const options = [
    { key: 'A', value: question.optionA },
    { key: 'B', value: question.optionB },
    { key: 'C', value: question.optionC },
    { key: 'D', value: question.optionD },
  ];

  const getOptionClassName = (optionKey: string) => {
    const baseClass = 'flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200';
    
    if (showCorrectAnswer && question.correctAnswer) {
      if (optionKey === question.correctAnswer) {
        return `${baseClass} border-green-500 bg-green-50`;
      }
      if (optionKey === selectedAnswer && optionKey !== question.correctAnswer) {
        return `${baseClass} border-red-500 bg-red-50`;
      }
    }
    
    if (selectedAnswer === optionKey) {
      return `${baseClass} border-primary-600 bg-primary-50`;
    }
    
    return `${baseClass} border-gray-300 hover:border-primary-400 hover:bg-gray-50`;
  };

  return (
    <Card className="mb-6">
      <CardContent>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm">
                {questionNumber}
              </span>
              <span className="text-sm text-gray-600">({question.marks} marks)</span>
            </div>
            <p className="text-lg text-gray-900 font-medium">{question.questionText}</p>
          </div>
        </div>

        <div className="space-y-3">
          {options.map((option) => (
            <div
              key={option.key}
              className={getOptionClassName(option.key)}
              onClick={() => !disabled && onAnswerSelect(question.id, option.key)}
            >
              <div className="flex items-center flex-1">
                <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center mr-3">
                  {selectedAnswer === option.key && (
                    <div className="w-4 h-4 rounded-full bg-primary-600"></div>
                  )}
                </div>
                <div className="flex-1">
                  <span className="font-medium text-gray-900 mr-2">{option.key}.</span>
                  <span className="text-gray-700">{option.value}</span>
                </div>
              </div>
              
              {showCorrectAnswer && question.correctAnswer === option.key && (
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>

        {showCorrectAnswer && selectedAnswer && selectedAnswer !== question.correctAnswer && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Incorrect.</strong> The correct answer is <strong>{question.correctAnswer}</strong>.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
