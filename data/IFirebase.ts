type TFirebaseId = string /* ex: OKnlSx4YwZahFTCJMQrc */;

interface IFirebase {
  id: TFirebaseId;
  updatedBy: string;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
}

export default IFirebase;
export type { TFirebaseId };
