export type Criterion = {
  id: string;
  user_id: string;
  name: string;
  weight: number;
  created_at: string;
};

export type House = {
  id: string;
  user_id: string;
  name: string;
  address: string | null;
  notes: string | null;
  created_at: string;
};

export type Rating = {
  id: string;
  user_id: string;
  house_id: string;
  criterion_id: string;
  score: number;
  created_at: string;
};

export type HousePointKind = "pro" | "con";

export type HousePoint = {
  id: string;
  user_id: string;
  house_id: string;
  kind: HousePointKind;
  body: string;
  position: number;
  created_at: string;
};

export type HouseNote = {
  id: string;
  user_id: string;
  house_id: string;
  body: string;
  position: number;
  created_at: string;
};

export type ChecklistItem = {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
};

export type HouseCheck = {
  id: string;
  user_id: string;
  house_id: string;
  item_id: string;
  checked: boolean;
  created_at: string;
};
