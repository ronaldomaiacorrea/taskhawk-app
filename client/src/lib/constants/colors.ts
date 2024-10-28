export enum PrimaryColors {
  MAIN = '#14B8A6',
  LIGHT = '#5EEAD4',
  DARK = '#0F766E',
  DARKER = '#134E4A'
}

export enum StatusColors {
  TODO = '#6B7280',
  COMPLETED = '#4CAF50',
  BLOCKED = '#F97316',
  OVERDUE = '#EF4444',
  IN_PROGRESS = '#3B82F6'
}

export enum TextColors {
  PRIMARY = '#111827',
  SECONDARY = '#4B5563',
  DISABLED = '#9CA3AF',
  LIGHT = '#F3F4F6'
}

export enum BorderColors {
  LIGHT = '#E5E7EB',
  DARK = '#374151'
}

export enum BackgroundColors {
  PAPER = '#FFFFFF',
  DEFAULT = '#F9FAFB',
  DARK = '#1F2937'
}

export enum ActionColors {
  DELETE = '#EF4444',
  EDIT = '#14B8A6',
  HOVER = '#F3F4F6',
  DARK_HOVER = '#374151'
}

export const COLORS = {
  primary: PrimaryColors,
  status: StatusColors,
  text: TextColors,
  border: BorderColors,
  background: BackgroundColors,
  action: ActionColors,
} as const;
