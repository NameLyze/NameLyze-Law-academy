import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { TextArea } from '../ui/Input';
import { Button } from '../ui/Button';

interface WrittenQuestionProps {
  question: {
    id: string;
    questionText: string;
    wordLimit?: number | null;
    marks: number;
  };
  questionNumber: number;
  answer?: {
    answerText?: string;
    answerFileUrl?: string;
    marksObtained?: number;
    feedback?: string;
  };
  onAnswerChange: (questionId: string, answerText: string) => void;
  onFileUpload?: (questionId: string, file: File) => void;
  disabled?: boolean;
  showGrade?: boolean;
}

export const WrittenQuestion: React.FC<WrittenQuestionProps> = ({
  question,
  questionNumber,
  answer,
  onAnswerChange,
  onFileUpload,
  disabled = false,
  showGrade = false,
}) => {
  const [uploading, setUploading] = useState(false);
  const [wordCount, setWordCount] = useState(answer?.answerText?.split(/\s+/).filter(Boolean).length || 0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    onAnswerChange(question.id, text);
    setWordCount(text.split(/\s+/).filter(Boolean).length);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      setUploading(true);
      try {
        await onFileUpload(question.id, file);
      } catch (error) {
        console.error('Upload error:', error);
      } finally {
        setUploading(false);
      }
    }
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
              {question.wordLimit && (
                <span className="text-sm text-gray-500">
                  • Max {question.wordLimit} words
                </span>
              )}
            </div>
            <p className="text-lg text-gray-900 font-medium whitespace-pre-wrap">
              {question.questionText}
            </p>
          </div>
        </div>

        {!disabled && (
          <div className="mt-4">
            <TextArea
              value={answer?.answerText || ''}
              onChange={handleTextChange}
              placeholder="Type your answer here..."
              rows={8}
              fullWidth
              disabled={disabled}
              className="font-mono text-sm"
            />
            
            <div className="flex items-center justify-between mt-2">
              <div className="text-sm text-gray-600">
                Word count: {wordCount}
                {question.wordLimit && (
                  <span className={wordCount > question.wordLimit ? 'text-red-600 ml-2' : ''}>
                    {wordCount > question.wordLimit && ` (Exceeds limit by ${wordCount - question.wordLimit})`}
                  </span>
                )}
              </div>
            </div>

            {onFileUpload && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or upload your answer as PDF:
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  disabled={uploading || disabled}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                />
                {uploading && (
                  <p className="mt-2 text-sm text-primary-600">Uploading...</p>
                )}
                {answer?.answerFileUrl && (
                  <a
                    href={answer.answerFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
                  >
                    View uploaded file
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        {showGrade && answer && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Marks Obtained:</span>
              <span className="text-lg font-bold text-primary-600">
                {answer.marksObtained || 0} / {question.marks}
              </span>
            </div>
            {answer.feedback && (
              <div className="mt-3 pt-3 border-t border-gray-300">
                <p className="text-sm font-medium text-gray-700 mb-1">Teacher Feedback:</p>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{answer.feedback}</p>
              </div>
            )}
          </div>
        )}

        {disabled && answer?.answerText && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Your Answer:</p>
            <p className="text-sm text-gray-900 whitespace-pre-wrap">{answer.answerText}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
