export enum PrimaryColors {
  MAIN = '#14B8A6',
  LIGHT = '#5EEAD4',
  DARK = '#0F766E',
  DARKER = '#134E4A',
}

export enum StatusColors {
  TODO = 'hsla(220, 10%, 55%, 0.6)',
  COMPLETED = 'hsla(145, 50%, 50%, 0.6)',
  BLOCKED = 'hsla(24, 90%, 56%, 0.6)',
  OVERDUE = 'hsla(0, 78%, 55%, 0.6)',
  IN_PROGRESS = 'hsla(215, 71%, 60%, 0.6)',
}

export enum TextColors {
  PRIMARY = '#111827',
  SECONDARY = '#4B5563',
  DISABLED = '#9CA3AF',
  LIGHT = '#F3F4F6',
}

export enum BorderColors {
  LIGHT = '#E5E7EB',
  DARK = '#374151',
}

export enum BackgroundColors {
  PAPER = '#FFFFFF',
  DEFAULT = '#F9FAFB',
  DARK = '#1F2937',
}

export enum ActionColors {
  DELETE = '#EF4444',
  EDIT = '#14B8A6',
  HOVER = '#F3F4F6',
  DARK_HOVER = '#374151',
}

export const COLORS = {
  primary: PrimaryColors,
  status: StatusColors,
  text: TextColors,
  border: BorderColors,
  background: BackgroundColors,
  action: ActionColors,
} as const;
