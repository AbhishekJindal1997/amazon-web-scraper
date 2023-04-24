"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import toast from "react-hot-toast";

function Header() {
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = inputRef.current?.value;
    if (!input) return;

    const notification = toast.loading(`Starting a scraper for: ${input}`);

    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }

    try {
      const response = await fetch("/api/activateScraper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: input }),
      });

      const { collection_id, start_eta } = await response.json();
      router.push(`/search/${collection_id}`);
    } catch (error) {
      toast.error("Something went wrong. Please try again later.", {
        id: notification,
      });
    }
  };

  return (
    <header>
      <form
        className='flex items-center space-x-2 justify-center 
      rounded-md py-2 px-4 bg-indigo-100 max-w-md mx-auto'
        onSubmit={handleSearch}
      >
        <input
          ref={inputRef}
          type='text'
          placeholder='Search...'
          className='flex-1  outline-none bg-transparent text-indigo-400 placeholder:text-indigo-300'
        />
        <button className='hidden'>Search</button>
        <MagnifyingGlassIcon className='h-6 w-6 text-indigo-300' />
      </form>
    </header>
  );
}

export default Header;
