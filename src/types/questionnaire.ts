export type QuestionnaireStage = {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
}

export type FormData = {
  buyerName: string;
  sellerName: string;
  hasGuarantor: boolean;
  targetName: string;
}

export type FormErrors = {
  [K in keyof FormData]?: string;
} 