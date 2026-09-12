import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
      <header className="p-6 flex justify-between items-center max-w-6xl w-full mx-auto">
        <div className="flex items-center gap-2 text-indigo-600">
          <BookOpen size={32} className="font-bold" />
          <span className="text-2xl font-black tracking-tight">NoteFit</span>
        </div>
        <div className="flex gap-4">
          <Link to="/auth" className="px-5 py-2.5 rounded-full text-indigo-600 font-semibold hover:bg-indigo-100 transition-colors">Log In</Link>
          <Link to="/auth" className="px-5 py-2.5 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">Get Started</Link>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 mb-6 tracking-tight max-w-4xl">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">perfect</span> place for all your thoughts.
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl">
          NoteFit helps you organize your ideas, tasks, and notes efficiently with a beautiful and intuitive interface. 
        </p>
        <Link to="/auth" className="px-8 py-4 rounded-full bg-indigo-600 text-white text-lg font-bold hover:bg-indigo-700 transition-transform hover:scale-105 shadow-xl shadow-indigo-300">
          Start Organizing Now
        </Link>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          <div className="bg-white/60 p-6 rounded-2xl backdrop-blur-sm border border-white">
            <CheckCircle className="text-indigo-500 w-10 h-10 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Easy to Use</h3>
            <p className="text-slate-600">Simple and intuitive CRUD operations for your daily note-taking needs.</p>
          </div>
          <div className="bg-white/60 p-6 rounded-2xl backdrop-blur-sm border border-white">
            <Shield className="text-indigo-500 w-10 h-10 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Secure</h3>
            <p className="text-slate-600">Your notes are stored securely using MongoDB and backend authentication.</p>
          </div>
          <div className="bg-white/60 p-6 rounded-2xl backdrop-blur-sm border border-white">
            <BookOpen className="text-indigo-500 w-10 h-10 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Always Available</h3>
            <p className="text-slate-600">Access your thoughts anytime, anywhere with our responsive web application.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;

