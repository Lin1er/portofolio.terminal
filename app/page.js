'use client';

import { useState, useEffect, useRef } from "react";
import { FaCode, FaLaptopCode, FaEnvelope, FaGithub, FaLinkedin, FaInfoCircle, FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image"; // Pastikan Image diimpor
import projectsData from "./projects.json"; // Dynamic project data

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [username, setUsername] = useState("ulin");
  const [hostname, setHostname] = useState("portfolio");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // State for autocomplete suggestions
  const [modalContent, setModalContent] = useState(null); // For interactive project modal
  const terminalRef = useRef(null);

  const commands = [
    "help", "profile", "projects", "skills", "contact", "theme", "clear",
    "set username", "set hostname", "ls", "whoami", "fortune", "ascii"
  ];

  const themes = ["dark", "light", "solarized", "dracula"];

  useEffect(() => {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [output]);

  useEffect(() => {
    // Display a visually enhanced welcome message on load
    setOutput([
      <motion.div key="welcome" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="text-center">
        <p className="text-yellow-400 text-3xl font-bold">👋 Welcome to Ulinuha's Portfolio Terminal!</p>
        <p className="text-gray-300 mt-2">Type <code className="text-green-400">help</code> to explore available commands.</p>
        <p className="text-gray-400 text-sm mt-1">Tip: Use <code className="text-blue-400">Tab</code> for autocomplete.</p>
      </motion.div>
    ]);
  }, []);

  const handleCommand = async (command) => {
    setIsLoading(true);
    let response = [];
    if (command === "help") {
      response = [
        <motion.div key="help" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-yellow-400 text-xl">Available commands:</p>
          <ul className="list-disc pl-5">
            {commands.map((cmd, index) => (
              <li key={index}><span className="text-green-400">{cmd}</span></li>
            ))}
          </ul>
          <p className="text-green-400 text-lg mt-2">Type the command in the format: <code>$ command</code></p>
        </motion.div>
      ];
    } else if (command.startsWith("set username")) {
      const newUsername = command.split(" ")[2];
      if (newUsername) {
        setUsername(newUsername);
        response = [`Username updated to ${newUsername}.`];
      } else {
        response = ["Usage: set username <new_username>"];
      }
    } else if (command.startsWith("set hostname")) {
      const newHostname = command.split(" ")[2];
      if (newHostname) {
        setHostname(newHostname);
        response = [`Hostname updated to ${newHostname}.`];
      } else {
        response = ["Usage: set hostname <new_hostname>"];
      }
    } else if (command === "theme") {
      const newTheme = command.split(" ")[1];
      if (themes.includes(newTheme)) {
        setTheme(newTheme);
        response = [`Theme switched to ${newTheme}.`];
      } else {
        response = [`Available themes: ${themes.join(", ")}`];
      }
    } else if (command === "profile" || command === "whoami") {
      response = [
        <motion.div key="profile" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 mx-auto">
          <div className="flex flex-col md:flex-row items-center mb-6">
            <Image src="/profile.jpeg" alt="Profile" className="h-100 w-100 rounded-full border-4 border-green-500 mr-4 object-cover" width={100} height={100} />
            <div>

              <div className="text-center md:text-left">
                <p className="text-blue-400 text-lg font-semibold">Ulinuha</p>
                <p className="text-blue-400 text-sm">Full Stack Developer</p>
                <p className="text-gray-300 text-sm">I&apos;m a passionate software developer with a strong interest in technology, IoT, and web development. Since middle school, I&apos;ve been building Discord bots, Minecraft servers, and various web apps. Now, I&apos;m diving deeper into Next.js, Laravel, and ESP32 projects.</p>
              </div>
              <div className="ml-auto flex flex-col md:flex-row gap-4 mt-5">
                <Image height={150} width={300} src="https://github-readme-stats.vercel.app/api?username=lin1er&show_icons=true&theme=algolia&include_all_commits=true&count_private=true" alt="GitHub Stats" />
                <Image height={150} width={300} src="https://github-readme-stats.vercel.app/api/top-langs/?username=lin1er&layout=compact&theme=algolia" alt="Top Languages" />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-yellow-400 text-xl mb-4">🚀 Tech Stack:</p>
            <div className="flex flex-wrap gap-4">
              <div className="text-center">
                <Image src="https://img.shields.io/badge/html5-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
              </div>
              <div className="text-center">
                <Image src="https://img.shields.io/badge/css3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
              </div>
              <div className="text-center">
                <Image src="https://img.shields.io/badge/javascript-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript" />
              </div>
              <div className="text-center">
                <Image src="https://img.shields.io/badge/react-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
              </div>
              <div className="text-center">
                <Image src="https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
              </div>
              <div className="text-center">
                <Image src="https://img.shields.io/badge/laravel-%23e4634c.svg?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
              </div>
              <div className="text-center">
                <Image src="https://img.shields.io/badge/python-%2314354C.svg?&style=for-the-badge&logo=python&logoColor=white" alt="Python" />
              </div>
              <div className="text-center">
                <Image src="https://img.shields.io/badge/MySQL-%2300f365.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
              </div>
              <div className="text-center">
                <Image src="https://img.shields.io/badge/arduino-%230066CC.svg?style=for-the-badge&logo=arduino&logoColor=white" alt="Arduino" />
              </div>
              <div className="text-center">
                <Image src="https://img.shields.io/badge/Git-%23F1502F.svg?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
              </div>
              <div className="text-center">
                <Image src="https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
              </div>
              <div className="text-center">
                <Image src="https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
              </div>
            </div>
          </div>
        </motion.div>
      ];
    } else if (command === "projects" || command === "ls") {
      response = [
        <motion.div key="projects" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-yellow-400 text-xl mb-4">Projects:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectsData.map((project, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded-lg shadow-md cursor-pointer" onClick={() => setModalContent(project)}>
                <Image src={project.thumbnail} alt={project.name} className="rounded-md mb-3" width={300} height={200} />
                <p className="text-blue-400 text-lg font-semibold">{project.name}</p>
                <p className="text-gray-300 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ];
    } else if (command === "skills") {
      response = [
        <motion.div key="skills" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-green-400 text-xl">Skills:</p>
          <ul className="list-disc pl-5">
            <li><FaCode className="inline mr-2 text-yellow-400" /> JavaScript, React, Next.js, Laravel</li>
            <li><FaCode className="inline mr-2 text-blue-400" /> Java, Python, C++</li>
            <li><FaCode className="inline mr-2 text-purple-400" /> IoT & Embedded Systems</li>
          </ul>
        </motion.div>
      ];
    } else if (command === "contact") {
      response = [
        <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-purple-400 text-xl">Contact:</p>
          <ul className="list-disc pl-5">
            <li><FaEnvelope className="inline mr-2 text-yellow-400" /> Email: m.ulinasidiki@gmail.com</li>
            <li><FaGithub className="inline mr-2 text-white" /> GitHub: <a href="https://github.com/lin1er" className="text-blue-400 underline">github.com/ulinuha</a></li>
            <li><FaLinkedin className="inline mr-2 text-blue-500" /> LinkedIn: <a href="https://linkedin.com/in/m-ulinuha-as-shiddiqy" className="text-blue-400 underline">linkedin.com/in/ulinuha</a></li>
          </ul>
        </motion.div>
      ];
    } else if (command === "fortune") {
      const fortunes = [
        "You will write bug-free code today!",
        "A new project is on the horizon.",
        "Your debugging skills will save the day.",
        "Success is just a commit away."
      ];
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      response = [<p key="fortune" className="text-green-400">{randomFortune}</p>];
    } else if (command === "ascii") {
      response = [
        <pre key="ascii" className="text-green-400">
          {`
  ______   __     __  __     ______     ______    
 /\\  ___\\ /\\ \\   /\\ \\/\\ \\   /\\  ___\\   /\\  == \\   
 \\ \\  __\\ \\ \\ \\  \\ \\ \\_\\ \\  \\ \\  __\\   \\ \\  __<   
  \\ \\_\\    \\ \\_\\  \\ \\_____\\  \\ \\_____\\  \\ \\_\\ \\_\\ 
   \\/_/     \\/_/   \\/_____/   \\/_____/   \\/_/ /_/ 
          `}
        </pre>
      ];
    } else if (command === "clear") {
      setOutput((prev) => [
        ...prev,
        <motion.div key="clear" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.5 }} className="text-gray-500">
          Clearing terminal...
        </motion.div>
      ]);
      setTimeout(() => setOutput([]), 500); // Clear after animation
      setIsLoading(false);
      return;
    } else if (!commands.includes(command.split(" ")[0])) {
      response = [
        <motion.div key="unknown" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-red-400">
          ❌ Unknown command: <code>{command}</code>
        </motion.div>,
        <p key="unknown-help" className="text-gray-400">Type <code className="text-green-400">help</code> to see the list of available commands.</p>
      ];
    } else {
      // ...existing command handling logic...
    }
    setTimeout(() => {
      setOutput((prev) => [
        ...prev,
        <p key={`command-${command}`} className="text-yellow-500">{username}@{hostname}:~$ {command}</p>,
        ...response
      ]);
      setIsLoading(false);
    }, 500); // Simulate loading delay
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setHistory((prev) => [...prev, input.trim()]);
      setHistoryIndex(-1);
      handleCommand(input.trim());
    }
    setInput("");
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]); // Autocomplete with the first suggestion
        setSuggestions([]); // Hide suggestions after autocomplete
      }
    }
  };

  const handleInputChange = (value) => {
    setInput(value);
    if (value.trim() === "") {
      setSuggestions([]); // Hide suggestions when input is cleared
    } else {
      const matchingCommands = commands.filter((cmd) => cmd.startsWith(value));
      setSuggestions(matchingCommands);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]); // Hide suggestions after selection
  };

  return (
    <div className={`${theme === "dark" ? "bg-gradient-to-r from-gray-900 to-black" : theme === "solarized" ? "bg-yellow-100" : theme === "dracula" ? "bg-purple-900" : "bg-gradient-to-r from-gray-100 to-white"} text-green-500 h-screen p-4 lg:p-10 font-mono flex flex-col`}>
      <div ref={terminalRef} className="overflow-auto flex-1 px-2 lg:px-4 pb-4">
        {output.map((line, index) => (
          <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="mb-2 text-sm lg:text-base">{line}</motion.div>
        ))}
        {isLoading && <p className="text-gray-500 text-sm lg:text-base">Loading...</p>}
      </div>
      <form onSubmit={handleSubmit} className="relative flex w-full lg:w-3/4 self-center border-t border-green-500 pt-2">
        {suggestions.length > 0 && (
          <ul className="absolute bottom-full left-0 bg-gray-800 text-green-400 w-full lg:w-1/2 mb-1 rounded-lg shadow-lg z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-2 lg:px-4 py-1 lg:py-2 hover:bg-gray-700 cursor-pointer text-sm lg:text-base"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <span className="text-yellow-500 text-sm lg:text-base">{username}@{hostname}:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent text-green-500 outline-none flex-1 ml-2 caret-green-500 text-sm lg:text-base"
          autoFocus
        />
      </form>
      {modalContent && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-3/4 lg:w-1/2">
            <h2 className="text-yellow-400 text-xl mb-4">{modalContent.name}</h2>
            <p className="text-gray-300">{modalContent.description}</p>
            <a href={modalContent.repo} target="_blank" className="text-green-400 underline mt-4 block">View Repository</a>
            <button onClick={() => setModalContent(null)} className="mt-4 bg-red-500 px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}