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
