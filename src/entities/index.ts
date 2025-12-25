/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: quizquestions
 * Interface for QuizQuestions
 */
export interface QuizQuestions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  option1Value?: number;
  /** @wixFieldType number */
  option5Value?: number;
  /** @wixFieldType text */
  option5Text?: string;
  /** @wixFieldType number */
  option4Value?: number;
  /** @wixFieldType text */
  option4Text?: string;
  /** @wixFieldType number */
  option3Value?: number;
  /** @wixFieldType text */
  option3Text?: string;
  /** @wixFieldType number */
  option2Value?: number;
  /** @wixFieldType text */
  option2Text?: string;
  /** @wixFieldType text */
  option1Text?: string;
  /** @wixFieldType text */
  questionText?: string;
  /** @wixFieldType text */
  questionCategory?: string;
  /** @wixFieldType number */
  questionWeight?: number;
  /** @wixFieldType number */
  questionOrder?: number;
  /** @wixFieldType boolean */
  isMindsetQuestion?: boolean;
  /** @wixFieldType text */
  shortIdentifier?: string;
}


/**
 * Collection ID: quizresults
 * Interface for QuizResults
 */
export interface QuizResults {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  resultTitle?: string;
  /** @wixFieldType text */
  resultCategory?: string;
  /** @wixFieldType text */
  guidanceText?: string;
  /** @wixFieldType text */
  recommendationTitle?: string;
  /** @wixFieldType url */
  recommendationUrl?: string;
  /** @wixFieldType text */
  shortDescription?: string;
}
