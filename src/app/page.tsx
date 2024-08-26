'use client';

import Image from 'next/image';
import { useRef, useState, MouseEvent, KeyboardEvent, Dispatch, SetStateAction } from 'react';
import { useOutsideClick } from '@chakra-ui/react-use-outside-click';

const listItems = [
  { text: 'Education', image: '/education.svg' },
  { text: 'Science', image: '/education.svg' },
  { text: 'Art', image: '/education.svg' },
  { text: 'Sport', image: '/education.svg' },
  { text: 'Games', image: '/education.svg' },
];

function List({ input, setToggle }: { input: HTMLInputElement | null; setToggle: Dispatch<SetStateAction<boolean>> }) {
  const setValue = (e: MouseEvent | KeyboardEvent) => {
    if (!('key' in e) || e.key === 'Enter') {
      setToggle(false);
      input!.value = (e.target as HTMLLIElement).textContent ?? '';
    }
  };

  return (
    <ul onClick={setValue} onKeyDown={setValue} className="absolute w-full bg-white rounded-xl border-gray-300 p-2">
      {listItems.map((item) => (
        <li
          key={item.text}
          tabIndex={input!.tabIndex + 0.1}
          className="flex gap-2 items-center text-sm p-1.5 cursor-pointer hover:bg-gray-300 focus:bg-gray-300 focus-visible:outline-none"
        >
          {item.text}
          <Image src={item.image} width={16} height={16} alt={item.text} />
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const divRef = useRef(null);
  const inputRef = useRef(null);
  const [toggle, setToggle] = useState(false);

  useOutsideClick({
    ref: divRef,
    handler: () => setToggle(false),
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-center text-3xl font-bold mb-16">Single Select Component</div>

      <div ref={divRef} className="relative">
        <input
          type="text"
          ref={inputRef}
          placeholder="Select..."
          onFocus={() => setToggle(true)}
          onChange={(e) => setToggle(!e.target.value)}
          className="flex w-full justify-center border border-gray-300 rounded-xl p-3 pr-8 focus:border-indigo-500 focus-visible:outline-none"
        />

        {toggle && <List input={inputRef.current} setToggle={setToggle} />}

        <span
          onClick={() => setToggle((prev) => !prev)}
          className="absolute top-1/2 -translate-y-1/2 right-2 flex justify-center items-center rounded-full text-xs font-black bg-gray-200 w-5 h-5 cursor-pointer hover:bg-gray-300 transition"
        >
          {toggle ? <>&#x2715;</> : <>&#11167;</>}
        </span>
      </div>

      <div className="w-full border-t py-3 text-center mt-auto">ADLAS © 2024</div>
    </main>
  );
}
