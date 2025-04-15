import { handlers } from '@/utils/auth';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.dev.vars') });

export const { GET, POST } = handlers;
