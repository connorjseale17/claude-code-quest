import type { LevelId } from '../engine/roomConfigs';
import type { LessonContent } from './types';
import { welcomeContent } from './welcome';
import { claudemdContent } from './claudemd';
import { slashContent } from './slash';
import { mcpContent } from './mcp';
import { subagentsContent } from './subagents';
import { finalBossContent } from './final-boss';

export const CONTENT: Record<LevelId, LessonContent> = {
  welcome: welcomeContent,
  claudemd: claudemdContent,
  slash: slashContent,
  mcp: mcpContent,
  subagents: subagentsContent,
  'final-boss': finalBossContent,
};
