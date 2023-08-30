import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header>
        <h1 className="text-2xl">Todos</h1>
        <Link href="/about">About</Link>
      </header>
      <ul></ul>
    </>
  );
}
