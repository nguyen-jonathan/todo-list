import {TodoItem} from '@/components/TodoItems';
import {prisma} from '@/db';
import Link from 'next/link';

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  'use server';

  await prisma.todo.update({where: {id}, data: {complete}});
  console.log(id, complete); //testing the complete toggle
  //no redirects
}

export default async function Home() {
  const todos = await prisma.todo.findMany();
  // await prisma.todo.create({data: {title: 'test', complete: false}});
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new">
          New
        </Link>
        <h1 className="text-2xl">Todos</h1>
        <button
          type="submit"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">
          Delete
        </button>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
