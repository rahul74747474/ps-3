import React, { useState, useEffect } from 'react';
import {
  Menu, X, ChevronRight, Star, Heart, Sun, Music, Palette, BookOpen,
  MapPin, Phone, Mail, ArrowRight, CheckCircle, Smile, Clock, Users,
  Shield, Sparkles, Send, MessageCircle
} from 'lucide-react';

// --- CUSTOM STYLES & ANIMATIONS ---
const injectStyles = () => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap');

      :root {
        --primary: #FF6B6B;
        --secondary: #4ECDC4;
        --accent: #FFE66D;
        --bg-color: #F7FFF7;
        --text-color: #1A1A1A;
      }

      body {
        font-family: 'Poppins', sans-serif;
        background-color: var(--bg-color);
        color: var(--text-color);
        overflow-x: hidden;
        scroll-behavior: smooth;
      }

      /* Custom Animations */
      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
        100% { transform: translateY(0px) rotate(0deg); }
      }
      .animate-float { animation: float 4s ease-in-out infinite; }
      
      @keyframes float-delayed {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(-5deg); }
        100% { transform: translateY(0px) rotate(0deg); }
      }
      .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite 1s; }

      @keyframes wiggle {
        0%, 100% { transform: rotate(-3deg); }
        50% { transform: rotate(3deg); }
      }
      .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }

      @keyframes blob {
        0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
        34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
        67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
        100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
      }
      .animate-blob { animation: blob 8s ease-in-out infinite; }

      /* Masonry Layout for Gallery */
      .masonry-grid {
        column-count: 1;
        column-gap: 1.5rem;
      }
      @media (min-width: 640px) { .masonry-grid { column-count: 2; } }
      @media (min-width: 1024px) { .masonry-grid { column-count: 3; } }
      .masonry-item {
        break-inside: avoid;
        margin-bottom: 1.5rem;
      }

      /* Playful Scrollbar */
      ::-webkit-scrollbar { width: 12px; }
      ::-webkit-scrollbar-track { background: var(--bg-color); }
      ::-webkit-scrollbar-thumb { 
        background: var(--primary); 
        border-radius: 10px; 
        border: 3px solid var(--bg-color);
      }
      ::-webkit-scrollbar-thumb:hover { background: #ff4f4f; }

      /* Tactile Card Styles (Neo-brutalism touch) */
      .play-card {
        background: white;
        border: 4px solid var(--text-color);
        border-radius: 1.5rem;
        box-shadow: 6px 6px 0px 0px var(--text-color);
        transition: all 0.2s ease;
      }
      .play-card:hover {
        transform: translate(-4px, -4px);
        box-shadow: 10px 10px 0px 0px var(--text-color);
      }
      
      .play-button {
        border: 3px solid var(--text-color);
        box-shadow: 4px 4px 0px 0px var(--text-color);
        transition: all 0.15s ease;
        cursor: pointer;
      }
      .play-button:hover {
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 0px 0px var(--text-color);
      }
      .play-button:active {
        transform: translate(4px, 4px);
        box-shadow: 0px 0px 0px 0px var(--text-color);
      }
    `}} />
  );
};

// --- REUSABLE COMPONENTS ---

const WaveTop = ({ color = "#F7FFF7" }) => (
  <div className="w-full overflow-hidden leading-none rotate-180 -mt-1 relative z-10">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[60px] md:h-[100px]">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.42,126.3,196.4,115.15,238.4,108.15,280.4,85.15,321.39,56.44Z" fill={color}></path>
    </svg>
  </div>
);

const WaveBottom = ({ color = "#F7FFF7" }) => (
  <div className="w-full overflow-hidden leading-none -mb-1 relative z-10">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[60px] md:h-[100px]">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.42,126.3,196.4,115.15,238.4,108.15,280.4,85.15,321.39,56.44Z" fill={color}></path>
    </svg>
  </div>
);

const Button = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseClasses = "play-button font-bold py-3 px-8 rounded-full text-lg flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-[#FF6B6B] text-white",
    secondary: "bg-[#4ECDC4] text-[#1A1A1A]",
    accent: "bg-[#FFE66D] text-[#1A1A1A]",
    outline: "bg-[#F7FFF7] text-[#1A1A1A]",
    whatsapp: "bg-[#25D366] text-white" // WhatsApp Brand Color
  };
  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// --- SECTION COMPONENTS ---

const HomeSection = ({ whatsappUrl, scrollToSection }) => (
  <div className="animate-in fade-in duration-500">
    {/* HERO SECTION */}
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 px-6 overflow-hidden bg-[#F7FFF7]">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 text-[#FFE66D] opacity-50 animate-spin-slow"><Sun size={80} /></div>
      <div className="absolute bottom-20 right-10 text-[#4ECDC4] opacity-50 animate-bounce"><Music size={60} /></div>
      <div className="absolute top-40 right-1/4 text-[#FF6B6B] opacity-50 animate-float"><Star size={50} /></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="inline-block bg-[#FFE66D] border-2 border-[#1A1A1A] rounded-full px-4 py-2 font-bold text-sm mb-4 transform -rotate-2">
            ✨ Admissions Open for 2026-2027
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight text-[#1A1A1A]">
            Where Little Minds <br />
            <span className="text-[#FF6B6B] relative inline-block">
              Begin their
              <svg className="absolute w-full h-4 -bottom-1 left-0 text-[#FFE66D]" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
              </svg>
            </span> Learning journey 🌱
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-medium">
            Vatika Playway School provides a joyful and safe environment where children learn through play, creativity, and interactive activities.</p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button variant="whatsapp" onClick={() => window.open(whatsappUrl, '_blank')}>
              Message Us <ArrowRight size={20} />
            </Button>
            <Button variant="outline" onClick={() => scrollToSection('programs')}>
              Explore Programs
            </Button>
          </div>
        </div>

        <div className="relative h-[400px] md:h-[600px] flex items-center justify-center">
          {/* Animated Blob Background */}
          <div className="absolute inset-0 bg-[#4ECDC4] animate-blob opacity-20 transform scale-110"></div>
          <div className="absolute inset-4 bg-[#FFE66D] animate-blob opacity-40 transform -scale-x-100 delay-150"></div>

          {/* Main Hero Image */}
          <div className="relative z-10 w-full h-full max-h-[500px] play-card overflow-hidden bg-[#FF6B6B]">
            <img
              src="https://i.ibb.co/GfpCTV8C/Gemini-Generated-Image-5ueqn75ueqn75ueq.webp"
              alt="Happy children playing"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating UI Badges */}
          <div className="absolute -left-6 top-1/4 play-card p-4 bg-white animate-float z-20 flex items-center gap-3">
            <div className="bg-[#4ECDC4] p-2 rounded-full border-2 border-[#1A1A1A]"><Smile className="text-white" /></div>
            <div className="font-bold">Happy Kids</div>
          </div>
          <div className="absolute -right-6 bottom-1/4 play-card p-4 bg-white animate-float-delayed z-20 flex items-center gap-3">
            <div className="bg-[#FF6B6B] p-2 rounded-full border-2 border-[#1A1A1A]"><Star className="text-white" /></div>
            <div className="font-bold">Top Rated</div>
          </div>
        </div>
      </div>
    </section>

    <WaveBottom color="#4ECDC4" />

    {/* WHY CHOOSE US */}
    <section className="py-20 px-6 bg-[#4ECDC4] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-md">Why Parents Love Us ❤️</h2>
          <p className="text-xl text-white font-medium max-w-2xl mx-auto">We blend learning with play in a secure environment designed just for little explorers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Shield, title: "Safe & Caring Environment", desc: "A secure and friendly environment where every child feels comfortable and happy.", color: "bg-[#FFE66D]" },
            { icon: Users, title: "Activity-Based Learning", desc: "Learning through fun activities like phonics play, storytelling, memory games, and interactive learning.", color: "bg-[#FF6B6B]" },
            { icon: Palette, title: "Creative Development", desc: "Children explore creativity through art, drawing, dance, music, and craft activities.", color: "bg-white" },
            { icon: Heart, title: "Physical & Mental Growth", desc: "Sports, yoga, brain gym activities, and free play help children stay active and healthy.", color: "bg-[#F7FFF7]" }
          ].map((feature, idx) => (
            <div key={idx} className={`play-card ${feature.color} p-8 text-center group`}>
              <div className="w-20 h-20 mx-auto bg-white border-4 border-[#1A1A1A] rounded-full flex items-center justify-center mb-6 group-hover:animate-wiggle shadow-[4px_4px_0px_0px_#1A1A1A]">
                <feature.icon size={40} className="text-[#1A1A1A]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#1A1A1A]">{feature.title}</h3>
              <p className="text-gray-800 font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <WaveTop color="#4ECDC4" />
  </div>
);

const AboutSection = () => (
  <div className="bg-[#F7FFF7]">
    {/* Header */}
    <div className="bg-[#ffffff] py-20 px-6 text-center border-b-8 border-[#1A1A1A]">
      <h1 className="text-5xl md:text-7xl font-black text-black drop-shadow-md mb-4">About Vatika Primary School</h1>
      <p className="text-2xl text-[#1A1A1A] font-bold max-w-2xl mx-auto bg-[#FFE66D] py-2 px-6 rounded-full border-4 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] inline-block transform -rotate-1">Building foundational memories.</p>
    </div>

    {/* Zig Zag Story */}
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-24">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 relative">
          <div className="absolute inset-0 bg-[#FF6B6B] rounded-3xl transform -rotate-6 border-4 border-[#1A1A1A]"></div>
          <img src="https://i.ibb.co/hJ1kxCqy/Gemini-Generated-Image-7y3w6u7y3w6u7y3w.webp" alt="Kids playing blocks" className="relative z-10 rounded-3xl border-4 border-[#1A1A1A] w-full object-cover h-[400px] shadow-[8px_8px_0px_0px_#1A1A1A]" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A]">How It All Began 🌟</h2>
          <p className="text-xl text-gray-700 font-medium leading-relaxed">
            Vatika Primary School is dedicated to providing a joyful and engaging learning environment for young children.

           
            <strong className="text-[#FF6B6B]"> Our goal is to help children grow academically, socially, and creatively through fun learning activities and interactive experiences.</strong>
          </p>
          <p className="text-xl text-gray-700 font-medium leading-relaxed">
            We believe that early childhood education should be enjoyable, encouraging curiosity, imagination, and confidence in every child. </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse items-center gap-12">
        <div className="md:w-1/2 relative">
          <div className="absolute inset-0 bg-[#FFE66D] rounded-3xl transform rotate-6 border-4 border-[#1A1A1A]"></div>
          <img src="https://i.ibb.co/0jmKr0KK/Gemini-Generated-Image-lqp724lqp724lqp7.webp" alt="Kids painting" className="relative z-10 rounded-3xl border-4 border-[#1A1A1A] w-full object-cover h-[400px] shadow-[8px_8px_0px_0px_#1A1A1A]" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A]">Our Philosophy 🎨</h2>
          <ul className="space-y-4 text-xl font-medium text-gray-800">
            <li className="flex items-center gap-4 play-card p-4 hover:-translate-y-1">
              <div className="bg-[#4ECDC4] p-2 rounded-full border-2 border-[#1A1A1A]"><CheckCircle className="text-white" /></div>
              Learning Through Play
            </li>
            <li className="flex items-center gap-4 play-card p-4 hover:-translate-y-1">
              <div className="bg-[#FF6B6B] p-2 rounded-full border-2 border-[#1A1A1A]"><Heart className="text-white" /></div>
              Every Child is Special
            </li>
            <li className="flex items-center gap-4 play-card p-4 hover:-translate-y-1">
              <div className="bg-[#FFE66D] p-2 rounded-full border-2 border-[#1A1A1A]"><Sun className="text-[#1A1A1A]" /></div>
             Balanced Development
            </li>
          </ul>
        </div>
      </div>
    </section>

  </div>
);

const ActivitiesSection = () => {
const activities = [
  {
    title: "Yoga",
    desc: "Simple yoga exercises that help children improve focus, balance, and physical well-being.",
    img: "https://i.ibb.co/vCZXTzXc/Gemini-Generated-Image-fnn1pcfnn1pcfnn1.webp"
  },
  {
    title: "Art & Craft",
    desc: "Creative activities where children explore colors, drawing, and craft to develop imagination.",
    img: "https://i.ibb.co/wFfvyNyp/Gemini-Generated-Image-u42a8lu42a8lu42a.webp"
  },
  {
    title: "Festival Celebration",
    desc: "Children celebrate cultural festivals together to learn traditions and values.",
    img: "https://i.ibb.co/WNYCvwT4/Gemini-Generated-Image-vuwcmsvuwcmsvuwc.webp"
  },
  {
    title: "Gardening",
    desc: "Kids learn to plant and care for plants, encouraging responsibility and love for nature.",
    img: "https://i.ibb.co/tMg95sg0/Gemini-Generated-Image-ws46t3ws46t3ws46.webp"
  },
  {
    title: "Sports",
    desc: "Outdoor games and sports that help children stay active and develop teamwork skills.",
    img: "https://i.ibb.co/RThYGwd6/Gemini-Generated-Image-y17ploy17ploy17p.webp"
  }
];

  return (
    <section className="py-24 px-6 bg-[#FFE66D] border-y-8 border-[#1A1A1A]">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-[#1A1A1A] mb-6">
            Fun Learning Activities 🎨
          </h2>

          <p className="text-xl font-medium text-gray-800 max-w-3xl mx-auto">
            Children learn best when they are engaged, creative, and having fun.
            Our activities help develop creativity, confidence, and social skills.
          </p>
        </div>

        {/* Horizontal Scroll */}
        <div className="flex gap-8 overflow-x-auto pb-6">

          {activities.map((activity, index) => (

            <div
              key={index}
              className="min-w-[260px] max-w-[260px] play-card overflow-hidden flex flex-col"
            >

              {/* 9:16 Image */}
              <div className="relative w-full aspect-[9/16] overflow-hidden">
                <img
                  src={activity.img}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* White Info Section */}
              <div className="bg-white p-5 border-t-4 border-[#1A1A1A] flex flex-col gap-2">

                <h3 className="font-black text-lg text-[#1A1A1A]">
                  {activity.title}
                </h3>

                <p className="text-sm font-medium text-gray-700">
                  {activity.desc}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};
const ProgramsSection = ({ whatsappUrl }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Programs', color: 'bg-[#FFE66D]' },
    { id: 'settler', label: 'Settler Group', color: 'bg-[#FF6B6B]' },
    { id: 'nursery', label: 'Nursery', color: 'bg-[#4ECDC4]' },
    { id: 'kg', label: 'Kindergarten', color: 'bg-[#FFE66D]' },
    { id: 'class1', label: 'Class I', color: 'bg-[#FF6B6B]' },
    { id: 'class2', label: 'Class II', color: 'bg-[#4ECDC4]' },
    { id: 'class3', label: 'Class III', color: 'bg-[#FFE66D]' },
  ];

  const programsData = [
    {
      id: 'p1',
      category: 'settler',
      title: 'Settler Group',
      time: '9:30 AM - 12:30 PM',
      desc: 'A gentle introduction to school life with fun learning activities, storytelling, games, and free play.',
      icon: Smile,
      color: 'bg-[#FFE66D]'
    },
    {
      id: 'p2',
      category: 'nursery',
      title: 'Nursery',
      time: '9:00 AM - 12:30 PM',
      desc: 'Focus on phonics play, colour identification, memory games, and interactive learning activities.',
      icon: Palette,
      color: 'bg-[#FF6B6B]'
    },
    {
      id: 'p3',
      category: 'kg',
      title: 'Kindergarten',
      time: '8:30 AM - 1:00 PM',
      desc: 'Developing reading, writing, creativity, and communication through engaging activities.',
      icon: BookOpen,
      color: 'bg-[#4ECDC4]'
    },
    {
      id: 'p4',
      category: 'class1',
      title: 'Class I',
      time: '8:30 AM - 1:00 PM',
      desc: 'Building strong academic foundations along with creative and physical development.',
      icon: Star,
      color: 'bg-[#FFE66D]'
    },
    {
      id: 'p5',
      category: 'class2',
      title: 'Class II',
      time: '8:30 AM - 1:00 PM',
      desc: 'Focus on academics, creativity, and skill development through fun learning activities.',
      icon: Users,
      color: 'bg-[#FF6B6B]'
    },
    {
      id: 'p6',
      category: 'class3',
      title: 'Class III',
      time: '8:30 AM - 1:00 PM',
      desc: 'Strengthening academic skills with interactive learning, sports, and creative activities.',
      icon: Shield,
      color: 'bg-[#4ECDC4]'
    }
  ];

  const filteredPrograms =
    activeFilter === 'all'
      ? programsData
      : programsData.filter((p) => p.category === activeFilter);

  return (
    <div className="bg-[#F7FFF7]">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-[#1A1A1A] mb-6">
            Our Classes 🎒
          </h1>
          <p className="text-2xl text-gray-700 font-medium max-w-3xl mx-auto">
            Explore the different learning stages at Vatika Playway School designed for the growth and development of every child.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`font-bold py-3 px-6 rounded-full border-4 border-[#1A1A1A] transition-all duration-200 ${
                activeFilter === filter.id
                  ? `${filter.color} translate-y-1`
                  : `bg-gray-100 hover:bg-white hover:-translate-y-1 shadow-[4px_4px_0px_0px_#1A1A1A]`
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className={`play-card ${prog.color} p-8 relative overflow-hidden group flex flex-col`}
            >
              <div className="bg-white border-4 border-[#1A1A1A] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
                <prog.icon size={32} />
              </div>

              <h3 className="text-3xl font-black mb-2">{prog.title}</h3>

              <div className="inline-flex items-center gap-2 font-bold text-sm mb-4 px-3 py-1 bg-white border-2 border-[#1A1A1A] rounded-full">
                <Clock size={16} /> {prog.time}
              </div>

              <p className="font-medium text-lg flex-grow">{prog.desc}</p>

              <button
                onClick={() => window.open(whatsappUrl, "_blank")}
                className="mt-8 w-full bg-[#1A1A1A] text-white font-bold py-3 rounded-xl border-2 border-[#1A1A1A] hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                Ask on WhatsApp <MessageCircle size={20} />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
const GallerySection = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

  const images = [
    "https://i.ibb.co/R4YZdQJt/Gemini-Generated-Image-ubaldpubaldpubal.webp",
    "https://i.ibb.co/C3BrFqhq/Gemini-Generated-Image-2ig5gn2ig5gn2ig5.webp",
    "https://i.ibb.co/DDpkv0Wv/Gemini-Generated-Image-2cnyc52cnyc52cny.webp",
    "https://i.ibb.co/gbh9hFnG/Gemini-Generated-Image-scy1jzscy1jzscy1.webp",
    "https://i.ibb.co/rGPfLzt3/Gemini-Generated-Image-kdbk0qkdbk0qkdbk.webp",
    "https://i.ibb.co/KzmnMmFF/Gemini-Generated-Image-1siorn1siorn1sio.webp",
    "https://i.ibb.co/Kpx5pX0D/Gemini-Generated-Image-rk45nzrk45nzrk45.webp",
    "https://i.ibb.co/zWXbHMn4/Gemini-Generated-Image-28l04o28l04o28l0.webp",
    "https://i.ibb.co/whrTj93p/Gemini-Generated-Image-550hxp550hxp550h.webp"
  ];

  return (
    <div className="bg-[#F7FFF7]">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-5xl md:text-7xl font-black text-center text-[#1A1A1A] mb-16">Photo Gallery 📸</h1>
        
        <div className="masonry-grid">
          {images.map((src, idx) => (
            <div 
              key={idx} 
              className="masonry-item play-card overflow-hidden group cursor-pointer relative"
              onClick={() => setLightboxImage(src)}
            >
              <img src={src} alt={`Gallery ${idx}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <div className="bg-white text-[#1A1A1A] p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-[4px_4px_0px_0px_#1A1A1A] border-2 border-[#1A1A1A]">
                  <Sparkles size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A] bg-opacity-90 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full">
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 md:-right-12 text-white bg-[#FF6B6B] border-4 border-[#1A1A1A] rounded-full p-2 hover:bg-white hover:text-[#FF6B6B] transition-colors"
            >
              <X size={32} />
            </button>
            <img src={lightboxImage} alt="Fullscreen" className="w-full h-auto max-h-[80vh] object-contain rounded-2xl border-8 border-white shadow-[10px_10px_0px_0px_rgba(255,107,107,1)]" />
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Replace this phone number with the actual WhatsApp number
  const phoneNumber = "9582759535";
  const defaultMessage = encodeURIComponent("Hi! I want to know more about Vatika Primary school and your programs.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'programs', label: 'Programs' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset by roughly the header height
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#FFE66D] selection:text-[#1A1A1A]">
      {injectStyles()}

      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 bg-[#F7FFF7]/90 backdrop-blur-md border-b-4 border-[#1A1A1A] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => scrollToSection('home')}
          >
            <img 
  src="https://i.ibb.co/xTHtMpV/image-removebg-preview-2.webp"
  className="w-[49px] h-[49px] object-contain"
/>
            <span className="text-2xl font-black tracking-tight text-[#1A1A1A]">Vatika<span className="text-[#4ECDC4]">Primary</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-bold text-lg relative px-2 py-1 text-gray-700 hover:text-[#FF6B6B] transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button variant="whatsapp" className="ml-4 py-2 px-6 text-base" onClick={() => window.open(whatsappUrl, '_blank')}>
              Message Us
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 border-2 border-[#1A1A1A] rounded-xl bg-white shadow-[2px_2px_0px_0px_#1A1A1A]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[#F7FFF7] border-b-4 border-[#1A1A1A] flex flex-col p-4 shadow-xl animate-in slide-in-from-top-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-bold text-xl py-4 text-left border-b-2 border-gray-100 text-gray-700 hover:text-[#FF6B6B]"
              >
                {item.label}
              </button>
            ))}
            <Button variant="whatsapp" className="mt-6 w-full py-4 text-xl" onClick={() => window.open(whatsappUrl, '_blank')}>
              Message Us
            </Button>
          </div>
        )}
      </nav>

      {/* SINGLE PAGE CONTENT */}
      <main className="flex-grow pt-20">
        <div id="home">
          <HomeSection whatsappUrl={whatsappUrl} scrollToSection={scrollToSection} />
        </div>

        <div id="about">
          <AboutSection />
        </div>




        <div id="programs">
          <ProgramsSection whatsappUrl={whatsappUrl} />
        </div>

        
  <div id="activities">
    <ActivitiesSection />
  </div>

        <div id="gallery">
          <GallerySection />
        </div>

        {/* NEW WHATSAPP CONTACT SECTION */}
        <section id="contact" className="py-24 px-6 bg-[#FFE66D] border-y-8 border-[#1A1A1A] text-center">
          <div className="max-w-4xl mx-auto play-card bg-white p-12 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-50px] right-[-50px] text-[#4ECDC4] opacity-30 animate-spin-slow pointer-events-none"><Sun size={200} /></div>
            <div className="absolute bottom-[-30px] left-[-30px] text-[#FF6B6B] opacity-30 animate-bounce pointer-events-none"><Heart size={120} /></div>

            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black text-[#1A1A1A] mb-8">Wanna contact us? 💬</h2>
              <p className="text-2xl text-gray-800 font-medium mb-12">
                Skip the boring forms! Click the button below to chat directly with our team on WhatsApp.
                We usually reply in minutes!
              </p>

              <button
                onClick={() => window.open(whatsappUrl, '_blank')}
                className="mx-auto bg-[#25D366] text-white play-button font-bold py-5 px-12 rounded-full text-2xl flex items-center justify-center gap-4 hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle size={32} />
                Chat on WhatsApp
              </button>

              <div className="mt-8 flex items-center justify-center gap-6 text-gray-600 font-bold text-lg flex-wrap">
                <span className="flex items-center gap-2 bg-[#F7FFF7] border-2 border-[#1A1A1A] py-2 px-4 rounded-full shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Phone size={20} className="text-[#FF6B6B]" /> +91 95827 59535
                </span>
                <span className="flex items-center gap-2 bg-[#F7FFF7] border-2 border-[#1A1A1A] py-2 px-4 rounded-full shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <MapPin size={20} className="text-[#4ECDC4]" /> 16-Joshi Road , Karol Bagh , New Delhi , Delhi-05
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#1A1A1A] text-white pt-20 pb-10 px-6 relative overflow-hidden">

  {/* Decorative background shapes */}
  <div className="absolute top-0 right-10 w-64 h-64 bg-[#4ECDC4] rounded-full blur-[100px] opacity-20"></div>
  <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#FF6B6B] rounded-full blur-[100px] opacity-20"></div>

  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">

    {/* School Info */}
    <div className="space-y-6 md:col-span-1">
      <div className="flex items-center gap-2">
        <img 
  src="https://i.ibb.co/xTHtMpV/image-removebg-preview-2.webp"
  className="w-[49px] h-[49px] object-contain"
/>
        <span className="text-3xl font-black tracking-tight text-white">
          Vatika<span className="text-[#FFE66D]">Primary</span>
        </span>
      </div>

      <p className="font-medium text-gray-400">
        Vatika Primary School provides a joyful learning environment where children grow through play, creativity, and interactive activities.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h4 className="text-xl font-bold mb-6 text-[#4ECDC4]">Quick Links</h4>
      <ul className="space-y-4 font-medium text-gray-400">
        {navItems.map((link, i) => (
          <li key={i}>
            <button
              onClick={() => scrollToSection(link.id)}
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <ChevronRight size={16} className="text-[#FF6B6B]" />
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </div>

    {/* Classes */}
    <div>
      <h4 className="text-xl font-bold mb-6 text-[#FFE66D]">Classes</h4>

      <ul className="space-y-4 font-medium text-gray-400">
        <li>Settler Group</li>
        <li>Nursery</li>
        <li>Kindergarten</li>
        <li>Class I</li>
        <li>Class II</li>
        <li>Class III</li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h4 className="text-xl font-bold mb-6 text-[#FF6B6B]">Contact Us</h4>

      <div className="space-y-4 text-gray-400 font-medium">

        <div className="flex items-center gap-3">
          <Phone size={18} className="text-[#FFE66D]" />
          <span>+91 95827 59535</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={18} className="text-[#4ECDC4]" />
          <span>Vatika Primary School, Karol Bagh , Delhi-05</span>
        </div>

        <div className="flex items-center gap-3">
          <Mail size={18} className="text-[#FF6B6B]" />
          <span>info@vatikaprimaryschool.co.in</span>
        </div>

      </div>
    </div>

  </div>

  {/* Bottom copyright */}
  <div className="max-w-7xl mx-auto mt-16 pt-8 border-t-2 border-gray-800 text-center text-gray-500 font-medium">
    <p>
      © {new Date().getFullYear()} Vatika Primary School. All rights reserved.
    </p>
  </div>

</footer>
    </div>
  );
}
