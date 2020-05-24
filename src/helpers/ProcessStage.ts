export enum ProcessStage {
  InProgress = "0",
  InReview = "1",
  Approved = "2",
  Declined = "3",
}

export const isOpen = (stage: ProcessStage | undefined): boolean =>
  stage === ProcessStage.InProgress;

export const isInManagerReview = (stage: ProcessStage | undefined): boolean =>
  stage === ProcessStage.InReview;

export const isApproved = (stage: ProcessStage | undefined): boolean =>
  stage === ProcessStage.Approved;

export const isDeclined = (stage: ProcessStage | undefined): boolean =>
  stage === ProcessStage.Declined;

export const isClosed = (stage: ProcessStage | undefined): boolean =>
  stage === undefined || isApproved(stage) || isDeclined(stage);
