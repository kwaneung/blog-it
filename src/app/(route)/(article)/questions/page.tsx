import { promises as fs } from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { z } from 'zod';

import { columns } from '../_components/columns';
import { DataTable } from '../_components/data-table';
import { taskSchema } from './_data/schema';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Questions',
  description: '질문 글',
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/app/(route)/(article)/questions/_data/tasks.json'),
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function Questions() {
  const tasks = await getTasks();

  return <DataTable data={tasks} columns={columns} type={'question'} />;
}
