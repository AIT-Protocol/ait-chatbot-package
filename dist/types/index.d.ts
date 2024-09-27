export interface ApiResponse<T = unknown> {
    data: T;
    status: number;
}
export interface Answer {
    id: string;
    answer_text: string;
    answer_file: string;
    question_id: string;
    timestamp: string;
    category_id?: string;
}
export interface ChatbotResponse {
    data: {
        id: string;
        question_text: string;
        question_file: string;
        timestamp: string;
        suggest_questions: string[];
        question_type: string;
        error_code: string | null;
        errors: string | null;
        answer: Answer;
    };
}
