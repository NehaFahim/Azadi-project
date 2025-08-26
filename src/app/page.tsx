"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, Share2, Send, Sparkles, Heart, Trophy, Clock } from "lucide-react";

interface QuizQ {
  q: string;
  options: string[];
  answerIdx: number;
}

interface Wish {
  id: string;
  name: string;
  message: string;
  time: number;
}

const QUIZ: QuizQ[] = [
  {
    q: "When did Pakistan gain independence?",
    options: ["23 March 1940", "14 August 1947", "15 August 1947", "27th Ramadan 1366 AH"],
    answerIdx: 1,
  },
  {
    q: "Who was the first Governor-General of Pakistan?",
    options: ["Liaquat Ali Khan", "Khawaja Nazimuddin", "Quaid-e-Azam Muhammad Ali Jinnah", "Allama Iqbal"],
    answerIdx: 2,
  },
  {
    q: "What is the national slogan of Pakistan?",
    options: ["Pakistan Painda Bad!", "Pakistan Zindabad!", "Jeeway Pakistan!", "Quaid-e-Azam Zindabad!"],
    answerIdx: 1,
  },
  {
    q: "What are the two colors of Pakistan’s national flag?",
    options: ["Green and White", "Green and Black", "Blue and White", "Golden and Green"],
    answerIdx: 0,
  },
];

const TIMELINE = [
  { year: 1857, title: "War of Independence", text: "The foundation of the freedom movement." },
  { year: 1906, title: "All India Muslim League", text: "Demand for constitutional political representation." },
  { year: 1940, title: "Lahore Resolution", text: "The demand for a separate homeland." },
  { year: 1947, title: "Independence", text: "Establishment of Pakistan — 14 August." },
];


function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minutes ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hours ago`;
  const days = Math.round(hrs / 24);
  return `${days} days ago`;
}

export default function Page() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [copied, setCopied] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("azadi-wishes");
    if (data) setWishes(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("azadi-wishes", JSON.stringify(wishes));
  }, [wishes]);

  const addWish = () => {
    if (!msg.trim()) return;
    const w: Wish = {
      id: crypto.randomUUID(),
      name: name.trim() || "Guest",
      message: msg.trim(),
      time: Date.now(),
    };
    setWishes((prev) => [w, ...prev]);
    setMsg("");
  };

  const share = async () => {
    const text = "🇵🇰 Happy Independence Day Pakistan! #AzadiMubarak";
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Azadi Day", text, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  };

  const today = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-700 via-emerald-700 to-emerald-900 text-white relative overflow-hidden">

      {/* Hero */}
      <section className="relative px-6 pt-24 pb-16 md:pt-28 md:pb-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Happy Independence Day
              <span className="block text-emerald-200">Pakistan 🤍 14 August</span>
            </motion.h1>
            <motion.p
              className="mt-4 text-emerald-100/90 max-w-prose"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
            Today <b>{today}</b> — Celebrate Independence with learning, quizzes, and wishes.
            </motion.p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById("wishes")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 rounded-2xl bg-white text-emerald-900 px-5 py-3 font-semibold shadow-lg hover:shadow-xl active:scale-[.99]"
              >
                <Heart className="size-5" /> Write Wishes
              </button>
              <button
                onClick={() => setShowQuiz(true)}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-700/30 border border-emerald-400/40 px-5 py-3 font-semibold hover:bg-emerald-700/50 backdrop-blur"
              >
                <Trophy className="size-5" /> Quick Quiz
              </button>
              <button
                onClick={share}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-semibold hover:bg-emerald-500"
              >
                <Share2 className="size-5" /> Share {copied && <span className="text-emerald-100">(Copied!)</span>}
              </button>
            </div>

            <div className="mt-4 text-sm text-emerald-200/80 flex items-center gap-2">
              <Clock className="size-4" /> Karachi Time • {new Date().toLocaleTimeString()}
            </div>
          </div>

    {/* Waving Flag */}
        
<div className="relative">
  <div className="relative mx-auto aspect-[4/3] w-full max-w-[520px] rounded-2xl overflow-hidden shadow-2xl">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#34d39933,transparent_60%)]" />
    <div className="flag relative h-full w-full bg-emerald-900">
      {/* Left stripe (now white) */}
      <div className="absolute inset-0 w-[25%] bg-white" />
      <div className="absolute left-1/2 top-1/2 -translate-x-[5%] -translate-y-1/2">
        <div className="relative w-28 h-28 text-white">
          {/* Crescent */}
          <div className="absolute inset-0 rounded-full bg-white" />
          <div className="absolute inset-0 translate-x-3 rounded-full bg-emerald-900" />
          {/* Star */} 
          <div className="absolute left-[56%] top-[14%] w-10 h-10" aria-hidden>
            <div className="absolute inset-0 rotate-[18deg]">
              <div className="mx-auto w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-white" />
              <div className="absolute left-1/2 -translate-x-1/2 top-[6px] rotate-60">
                <div className="mx-auto w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-white" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-[6px] -rotate-60">
                <div className="mx-auto w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute inset-0 flag-wave" />
  </div>
  <div className="mt-3 flex items-center gap-2 text-emerald-100/90">
    <Flag className="size-5" /> Long Live Pakistan!
  </div>
</div>

        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-10 md:py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2"><Sparkles className="size-6"/> Milestones</h2>
        <div className="grid md:grid-cols-4 gap-4 md:gap-6">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-emerald-300 text-sm font-semibold">{item.year}</div>
              <div className="text-lg font-semibold mt-1">{item.title}</div>
              <p className="text-emerald-100/80 text-sm mt-1">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Wishes Wall */}
      <section id="wishes" className="px-6 py-12 md:py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2"><Heart className="size-6"/> Azadi Wishes Wall</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur">
            <label className="text-sm text-emerald-100/90">Your name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Guest"
              className="mt-1 w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none focus:ring-2 ring-emerald-400"
            />
            <label className="text-sm text-emerald-100/90 mt-4 block">Message</label>
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Azadi Mubarak! May Pakistan prosper."  
              className="mt-1 w-full rounded-xl bg-white/10 border border-white/20 px-3 py-3 h-28 outline-none focus:ring-2 ring-emerald-400"
            />
            <button
              onClick={addWish}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white text-emerald-900 px-4 py-2 font-semibold shadow hover:shadow-md"
            >
              <Send className="size-4"/> Post Wish
            </button>  
          </div>

          <div className="md:col-span-2 grid gap-4 max-h-[360px] overflow-auto pr-2">
            <AnimatePresence>
              {wishes.length === 0 && (
                <div className="text-emerald-100/70">No wishes yet — let yours be the first!</div>
              )}
              {wishes.map((w) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, y: 10 }}             
                  animate={{ opacity: 1, y: 0 }}  
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl bg-white/5 border border-white/10 p-4"
                >
                  <div className="flex justify-between text-sm">   
                    <span className="font-semibold text-emerald-200">{w.name}</span> 
                    <span className="text-emerald-100/60">{timeAgo(w.time)}</span>  
                  </div>  
                  <p className="mt-1 text-emerald-50">{w.message}</p>   
                </motion.div>  
              ))}   
            </AnimatePresence>   
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-white/10 text-center text-emerald-100/80">
        Crafted with ❤️ using Next.js + Tailwind. Pakistan Zindabad! <br /> Designed & Developed by Neha Fahim 
      </footer>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <QuizModal onClose={() => setShowQuiz(false)} />
        )}
      </AnimatePresence>

      {/* Styles */}
      <style jsx global>{`
        .flag-wave { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent); animation: shine 3s linear infinite; }
        @keyframes shine { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .flag { filter: contrast(1.02) saturate(1.1); }
        .confetti { animation-name: fall; }
        @keyframes fall { 0% { transform: translateY(-10vh) rotate(0deg); opacity: .9; } 100% { transform: translateY(110vh) rotate(360deg); opacity: 0; } }
      `}</style>
    </main>
  );
}

function QuizModal({ onClose }: { onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const q = QUIZ[idx];

  const next = () => {
    if (selected === null) return;
    if (selected === q.answerIdx) setScore((s) => s + 1);
    if (idx + 1 < QUIZ.length) {
      setIdx((i) => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setIdx(0); setScore(0); setSelected(null); setFinished(false);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-lg rounded-2xl bg-emerald-900 border border-white/10 p-6 text-white shadow-2xl"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Azadi Quick Quiz</h3>
          <button onClick={onClose} className="rounded-xl px-3 py-1 bg-white/10 hover:bg-white/20">Close</button>
        </div>
        {!finished ? (
          <div className="mt-4">
            <div className="text-sm text-emerald-200/80">Question {idx + 1} / {QUIZ.length}</div>
            <div className="mt-2 text-lg font-semibold">{q.q}</div>
            <div className="mt-3 grid gap-2">
              {q.options.map((opt, i) => {
                const active = selected === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`text-left rounded-xl border px-4 py-3 transition ${active ? "bg-white text-emerald-900 border-white" : "bg-white/5 border-white/15 hover:bg-white/10"}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-emerald-200/80">Score: {score}</div>
              <button onClick={next} className="rounded-xl bg-white text-emerald-900 px-4 py-2 font-semibold">{idx + 1 === QUIZ.length ? "Finish" : "Next"}</button>
            </div>
          </div>
        ) : (
          <div className="mt-6 text-center">
            <div className="text-2xl font-bold">Mubarak! Score: {score} / {QUIZ.length}</div>
            <p className="mt-2 text-emerald-100/80">Pakistan Zindabad — Keep learning & celebrating! 🎉</p>
            <div className="mt-4 flex justify-center gap-2">
              <button onClick={restart} className="rounded-xl bg-white text-emerald-900 px-4 py-2 font-semibold">Restart</button>
              <button onClick={onClose} className="rounded-xl bg-white/10 px-4 py-2">Close</button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
 }
