import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Star, Heart, Sun, Music, Palette, BookOpen, 
  MapPin, Phone, Mail, ArrowRight, CheckCircle, Smile, Calendar, 
  Clock, Users, PlayCircle, Shield, Award, Sparkles, Send
} from 'lucide-react';

// --- CUSTOM STYLES & ANIMATIONS ---
const injectStyles = () => {
  return (
    <style dangerouslySetInnerHTML={{__html: `
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
    outline: "bg-[#F7FFF7] text-[#1A1A1A]"
  };
  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// --- MAIN PAGES ---

const Home = ({ navigate }) => (
  <div className="animate-in fade-in duration-500">
    {/* HERO SECTION */}
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden bg-[#F7FFF7]">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 text-[#FFE66D] opacity-50 animate-spin-slow"><Sun size={80} /></div>
      <div className="absolute bottom-20 right-10 text-[#4ECDC4] opacity-50 animate-bounce"><Music size={60} /></div>
      <div className="absolute top-40 right-1/4 text-[#FF6B6B] opacity-50 animate-float"><Star size={50} /></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="inline-block bg-[#FFE66D] border-2 border-[#1A1A1A] rounded-full px-4 py-2 font-bold text-sm mb-4 transform -rotate-2">
            ✨ Enrollment Open for 2026-2027
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight text-[#1A1A1A]">
            Where Little Minds <br/>
            <span className="text-[#FF6B6B] relative inline-block">
              Grow Big
              <svg className="absolute w-full h-4 -bottom-1 left-0 text-[#FFE66D]" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/>
              </svg>
            </span> Dreams 🌱
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-medium">
            A vibrant, safe, and joyful playground for your child to discover, learn, and flourish every single day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button variant="primary" onClick={() => navigate('admissions')}>Enroll Now <ArrowRight size={20}/></Button>
            <Button variant="outline" onClick={() => navigate('contact')}>Book a Visit</Button>
          </div>
        </div>

        <div className="relative h-[400px] md:h-[600px] flex items-center justify-center">
          {/* Animated Blob Background */}
          <div className="absolute inset-0 bg-[#4ECDC4] animate-blob opacity-20 transform scale-110"></div>
          <div className="absolute inset-4 bg-[#FFE66D] animate-blob opacity-40 transform -scale-x-100 delay-150"></div>
          
          {/* Main Hero Image */}
          <div className="relative z-10 w-full h-full max-h-[500px] play-card overflow-hidden bg-[#FF6B6B]">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Happy children playing" 
              className="w-full h-full object-cover mix-blend-overlay opacity-80"
            />
          </div>

          {/* Floating UI Badges */}
          <div className="absolute -left-6 top-1/4 play-card p-4 bg-white animate-float z-20 flex items-center gap-3">
            <div className="bg-[#4ECDC4] p-2 rounded-full border-2 border-[#1A1A1A]"><Smile className="text-white"/></div>
            <div className="font-bold">Happy Kids</div>
          </div>
          <div className="absolute -right-6 bottom-1/4 play-card p-4 bg-white animate-float-delayed z-20 flex items-center gap-3">
            <div className="bg-[#FF6B6B] p-2 rounded-full border-2 border-[#1A1A1A]"><Star className="text-white"/></div>
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
            { icon: Shield, title: "Safe & Secure", desc: "24/7 monitored facilities and trained staff.", color: "bg-[#FFE66D]" },
            { icon: Users, title: "Expert Teachers", desc: "Certified educators who love what they do.", color: "bg-[#FF6B6B]" },
            { icon: Palette, title: "Creative Play", desc: "Art, music, and imagination at the core.", color: "bg-white" },
            { icon: Heart, title: "Healthy Meals", desc: "Nutritious and yummy organic snacks.", color: "bg-[#F7FFF7]" }
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

    {/* PROGRAMS OVERVIEW */}
    <section className="py-24 px-6 bg-[#F7FFF7]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] mb-4">Our Fun Programs 🎨</h2>
            <p className="text-xl text-gray-600 font-medium">Tailored experiences for every stage of your child's early development.</p>
          </div>
          <Button variant="accent" className="mt-6 md:mt-0" onClick={() => navigate('programs')}>View All Programs</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { age: "1.5 - 2.5 Yrs", title: "Toddler Group", img: "https://images.unsplash.com/photo-1594608661623-aa0bd3a0b1ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", color: "bg-[#FFE66D]" },
            { age: "2.5 - 4 Yrs", title: "Preschool", img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", color: "bg-[#FF6B6B]" },
            { age: "4 - 6 Yrs", title: "Kindergarten", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", color: "bg-[#4ECDC4]" }
          ].map((prog, idx) => (
            <div key={idx} className="play-card overflow-hidden group cursor-pointer" onClick={() => navigate('programs')}>
              <div className="h-60 overflow-hidden border-b-4 border-[#1A1A1A] relative">
                <img src={prog.img} alt={prog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-white border-2 border-[#1A1A1A] font-bold px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#1A1A1A]">
                  {prog.age}
                </div>
              </div>
              <div className={`${prog.color} p-6 flex justify-between items-center transition-colors`}>
                <h3 className="text-2xl font-black text-[#1A1A1A]">{prog.title}</h3>
                <div className="w-12 h-12 bg-white border-2 border-[#1A1A1A] rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <ArrowRight size={24} className="text-[#1A1A1A]"/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section className="py-24 px-6 bg-[#FF6B6B] relative overflow-hidden">
       {/* Decorative BG */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl mix-blend-overlay"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400 opacity-20 rounded-full blur-3xl mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white text-center mb-16 drop-shadow-md">Happy Parents Say 💬</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { text: "The transformation in my daughter is amazing. She comes home singing new songs every day!", author: "Sarah Jenkins", role: "Emma's Mom" },
            { text: "Bright, clean, and the teachers genuinely care. It feels like a second home for our son.", author: "David Chen", role: "Leo's Dad" },
            { text: "Best decision we made! The creative activities and focus on social skills are unmatched.", author: "Maria Garcia", role: "Sofia's Mom" }
          ].map((testimonial, idx) => (
            <div key={idx} className="play-card bg-white p-8 relative mt-8">
              <div className="absolute -top-8 left-8 w-16 h-16 bg-[#FFE66D] border-4 border-[#1A1A1A] rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] text-2xl">
                ❝
              </div>
              <div className="flex gap-1 text-[#FF6B6B] mb-4 mt-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <p className="text-lg font-medium text-gray-800 mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#4ECDC4] rounded-full border-2 border-[#1A1A1A] flex items-center justify-center font-bold text-white">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A]">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500 font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <WaveTop color="#FF6B6B" />

    {/* CTA SECTION */}
    <section className="py-24 px-6 bg-[#FFE66D] text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black text-[#1A1A1A] mb-8">Ready to Join the Fun? 🚀</h2>
        <p className="text-2xl text-gray-800 font-medium mb-12">Admissions are now open. Secure your child's spot in our vibrant learning community today!</p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button variant="primary" className="text-xl px-12 py-5" onClick={() => navigate('admissions')}>Start Enrollment</Button>
          <Button variant="outline" className="text-xl px-12 py-5 bg-white" onClick={() => navigate('contact')}>Contact Us</Button>
        </div>
      </div>
    </section>
  </div>
);

const About = () => (
  <div className="animate-in fade-in duration-500 pt-24 bg-[#F7FFF7]">
    {/* Header */}
    <div className="bg-[#4ECDC4] py-20 px-6 text-center border-b-8 border-[#1A1A1A]">
      <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-md mb-4">Our Story 📖</h1>
      <p className="text-2xl text-[#1A1A1A] font-bold max-w-2xl mx-auto bg-[#FFE66D] py-2 px-6 rounded-full border-4 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] inline-block transform -rotate-1">Building foundational memories.</p>
    </div>

    {/* Zig Zag Story */}
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-24">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 relative">
          <div className="absolute inset-0 bg-[#FF6B6B] rounded-3xl transform -rotate-6 border-4 border-[#1A1A1A]"></div>
          <img src="https://images.unsplash.com/photo-1587691592099-24045742c181?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Kids playing blocks" className="relative z-10 rounded-3xl border-4 border-[#1A1A1A] w-full object-cover h-[400px] shadow-[8px_8px_0px_0px_#1A1A1A]" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A]">How It All Began 🌟</h2>
          <p className="text-xl text-gray-700 font-medium leading-relaxed">
            Founded in 2015 by a group of passionate educators and parents, our play school started with a simple belief: <strong className="text-[#FF6B6B]">learning should be as natural and fun as playing.</strong>
          </p>
          <p className="text-xl text-gray-700 font-medium leading-relaxed">
            We wanted to create an environment free from rigid structures, where children's natural curiosity guides their educational journey.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse items-center gap-12">
        <div className="md:w-1/2 relative">
          <div className="absolute inset-0 bg-[#FFE66D] rounded-3xl transform rotate-6 border-4 border-[#1A1A1A]"></div>
          <img src="https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Kids painting" className="relative z-10 rounded-3xl border-4 border-[#1A1A1A] w-full object-cover h-[400px] shadow-[8px_8px_0px_0px_#1A1A1A]" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A]">Our Philosophy 🎨</h2>
          <ul className="space-y-4 text-xl font-medium text-gray-800">
            <li className="flex items-center gap-4 play-card p-4 hover:-translate-y-1">
              <div className="bg-[#4ECDC4] p-2 rounded-full border-2 border-[#1A1A1A]"><CheckCircle className="text-white" /></div>
              Play is the highest form of research.
            </li>
            <li className="flex items-center gap-4 play-card p-4 hover:-translate-y-1">
              <div className="bg-[#FF6B6B] p-2 rounded-full border-2 border-[#1A1A1A]"><Heart className="text-white" /></div>
              Every child is a unique individual.
            </li>
            <li className="flex items-center gap-4 play-card p-4 hover:-translate-y-1">
              <div className="bg-[#FFE66D] p-2 rounded-full border-2 border-[#1A1A1A]"><Sun className="text-[#1A1A1A]" /></div>
              Environment is the third teacher.
            </li>
          </ul>
        </div>
      </div>
    </section>

    <WaveBottom color="#FF6B6B" />

    {/* Team Section */}
    <section className="py-24 px-6 bg-[#FF6B6B]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-white text-center mb-16 drop-shadow-md">Meet Our Super Teachers 🦸‍♀️</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Ms. Emily", role: "Head Educator", hobby: "Loves baking cookies", color: "bg-[#FFE66D]" },
            { name: "Mr. James", role: "Art & Music", hobby: "Plays 3 instruments", color: "bg-[#4ECDC4]" },
            { name: "Ms. Sarah", role: "Toddler Lead", hobby: "Expert story reader", color: "bg-white" },
            { name: "Mrs. Davis", role: "Kindergarten", hobby: "Gardening guru", color: "bg-[#F7FFF7]" }
          ].map((teacher, idx) => (
            <div key={idx} className="play-card group overflow-hidden bg-white text-center flex flex-col items-center">
              <div className={`w-full ${teacher.color} h-32 border-b-4 border-[#1A1A1A] relative`}>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-200 border-4 border-[#1A1A1A] rounded-full overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${idx+10}`} alt={teacher.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="pt-16 pb-6 px-4">
                <h3 className="text-2xl font-black text-[#1A1A1A]">{teacher.name}</h3>
                <p className="font-bold text-[#FF6B6B] mb-2">{teacher.role}</p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 mt-4 bg-gray-100 py-2 px-4 rounded-xl border-2 border-dashed border-gray-400 font-medium text-sm text-gray-700">
                  Fun Fact: {teacher.hobby}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const Programs = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Programs', color: 'bg-[#FFE66D]' },
    { id: 'toddler', label: 'Toddler (1.5-2.5y)', color: 'bg-[#FF6B6B]' },
    { id: 'preschool', label: 'Preschool (2.5-4y)', color: 'bg-[#4ECDC4]' },
    { id: 'kindergarten', label: 'Kindergarten (4-6y)', color: 'bg-white' },
  ];

  const programsData = [
    { id: 'p1', category: 'toddler', title: 'Tiny Explorers', time: '9:00 AM - 12:00 PM', desc: 'Focuses on sensory play, basic motor skills, and social interaction in a cozy environment.', icon: Smile, color: 'bg-[#FFE66D]' },
    { id: 'p2', category: 'preschool', title: 'Creative Minds', time: '9:00 AM - 1:00 PM', desc: 'Introduction to structured play, alphabets, numbers, and expressive arts.', icon: Palette, color: 'bg-[#FF6B6B]' },
    { id: 'p3', category: 'kindergarten', title: 'Future Leaders', time: '8:30 AM - 2:00 PM', desc: 'Prepares children for primary school with foundational math, reading, and science projects.', icon: BookOpen, color: 'bg-[#4ECDC4]' },
    { id: 'p4', category: 'toddler', title: 'Music & Movement', time: 'Afternoon Batch', desc: 'A special program focused purely on rhythm, dancing, and musical instruments.', icon: Music, color: 'bg-white' },
    { id: 'p5', category: 'preschool', title: 'Nature Navigators', time: 'Flexible', desc: 'Outdoor-focused learning where kids interact with plants, mud, and the environment.', icon: Sun, color: 'bg-[#F7FFF7]' },
  ];

  const filteredPrograms = activeFilter === 'all' ? programsData : programsData.filter(p => p.category === activeFilter);

  return (
    <div className="animate-in fade-in duration-500 pt-24 bg-[#F7FFF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-[#1A1A1A] mb-6">Explore Programs 🎒</h1>
          <p className="text-2xl text-gray-700 font-medium max-w-3xl mx-auto">Discover the perfect learning journey for your child, designed to spark joy and curiosity.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`font-bold py-3 px-6 rounded-full border-4 border-[#1A1A1A] transition-all duration-200 ${
                activeFilter === filter.id 
                  ? `${filter.color} shadow-none translate-y-1 ${filter.id === 'kindergarten' ? 'text-black' : (filter.id === 'toddler' ? 'text-white' : 'text-black')}` 
                  : `bg-gray-100 text-gray-500 hover:bg-white hover:-translate-y-1 shadow-[4px_4px_0px_0px_#1A1A1A]`
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog) => (
            <div key={prog.id} className={`play-card ${prog.color} p-8 relative overflow-hidden group`}>
              {/* Decorative circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="bg-white border-4 border-[#1A1A1A] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_#1A1A1A] transform -rotate-3 group-hover:rotate-0 transition-transform">
                <prog.icon size={32} className="text-[#1A1A1A]" />
              </div>
              
              <h3 className={`text-3xl font-black mb-2 ${prog.color === 'bg-[#FF6B6B]' ? 'text-white' : 'text-[#1A1A1A]'}`}>
                {prog.title}
              </h3>
              
              <div className={`inline-flex items-center gap-2 font-bold text-sm mb-4 px-3 py-1 bg-white border-2 border-[#1A1A1A] rounded-full shadow-[2px_2px_0px_0px_#1A1A1A]`}>
                <Clock size={16} /> {prog.time}
              </div>
              
              <p className={`font-medium text-lg leading-relaxed ${prog.color === 'bg-[#FF6B6B]' ? 'text-white' : 'text-gray-800'}`}>
                {prog.desc}
              </p>

              <button className="mt-8 w-full bg-[#1A1A1A] text-white font-bold py-3 rounded-xl border-2 border-[#1A1A1A] hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                Learn More <ChevronRight size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

  const images = [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1587691592099-24045742c181?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1594608661623-aa0bd3a0b1ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <div className="animate-in fade-in duration-500 pt-24 bg-[#F7FFF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl md:text-7xl font-black text-center text-[#1A1A1A] mb-12">Photo Gallery 📸</h1>
        
        <div className="masonry-grid">
          {images.map((src, idx) => (
            <div 
              key={idx} 
              className="masonry-item play-card overflow-hidden group cursor-pointer relative"
              onClick={() => setLightboxImage(src)}
            >
              <img src={src} alt={`Gallery ${idx}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#4ECDC4] bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
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

const Admissions = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const stepsData = [
    { num: 1, title: "Inquiry", icon: Mail, color: "bg-[#FFE66D]" },
    { num: 2, title: "School Tour", icon: MapPin, color: "bg-[#4ECDC4]" },
    { num: 3, title: "Application", icon: BookOpen, color: "bg-[#FF6B6B]" },
    { num: 4, title: "Enrollment", icon: CheckCircle, color: "bg-white" }
  ];

  const handleNext = (e) => {
    e.preventDefault();
    if(step < totalSteps) setStep(step + 1);
  };

  return (
    <div className="animate-in fade-in duration-500 pt-24 bg-[#F7FFF7] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-5xl md:text-7xl font-black text-center text-[#1A1A1A] mb-4">Admissions 📝</h1>
        <p className="text-center text-xl text-gray-600 font-medium mb-12">Follow our simple 4-step process to join the family.</p>

        {/* Stepper UI */}
        <div className="relative mb-16">
          <div className="absolute top-1/2 left-0 w-full h-4 bg-gray-200 -translate-y-1/2 rounded-full border-2 border-[#1A1A1A]"></div>
          <div 
            className="absolute top-1/2 left-0 h-4 bg-[#FF6B6B] -translate-y-1/2 rounded-full border-y-2 border-l-2 border-[#1A1A1A] transition-all duration-500 ease-out"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
          
          <div className="relative flex justify-between">
            {stepsData.map((s, idx) => {
              const isActive = step >= s.num;
              const isCurrent = step === s.num;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div 
                    className={`w-14 h-14 rounded-full border-4 border-[#1A1A1A] flex items-center justify-center transition-all duration-300 z-10 
                    ${isActive ? s.color : 'bg-gray-100 text-gray-400'} 
                    ${isCurrent ? 'scale-125 shadow-[4px_4px_0px_0px_#1A1A1A] animate-bounce' : ''}`}
                  >
                    <s.icon size={24} className={isActive && s.num !== 4 ? 'text-[#1A1A1A]' : (s.num === 4 && isActive ? 'text-[#1A1A1A]' : 'text-gray-400')} />
                  </div>
                  <div className={`mt-4 font-bold text-sm md:text-base transition-colors ${isActive ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>
                    {s.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="play-card bg-white p-8 md:p-12 min-h-[400px]">
          {step === 1 && (
            <div className="animate-in slide-in-from-right duration-300">
              <h2 className="text-3xl font-black mb-4">Step 1: Say Hello! 👋</h2>
              <p className="text-lg text-gray-700 font-medium mb-8">Fill out this quick inquiry form so we can send you our brochure and fee structure.</p>
              <form className="space-y-4" onSubmit={handleNext}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-2">Parent's Name</label>
                    <input type="text" required className="w-full border-4 border-gray-200 rounded-xl p-3 font-medium focus:border-[#4ECDC4] focus:outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block font-bold mb-2">Child's Name & Age</label>
                    <input type="text" required className="w-full border-4 border-gray-200 rounded-xl p-3 font-medium focus:border-[#4ECDC4] focus:outline-none transition-colors" placeholder="Emma, 3" />
                  </div>
                </div>
                <div>
                  <label className="block font-bold mb-2">Email Address</label>
                  <input type="email" required className="w-full border-4 border-gray-200 rounded-xl p-3 font-medium focus:border-[#4ECDC4] focus:outline-none transition-colors" placeholder="hello@example.com" />
                </div>
                <div className="pt-4 text-right">
                  <Button variant="primary" type="submit">Continue to Step 2 <ArrowRight size={20}/></Button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in slide-in-from-right duration-300">
              <h2 className="text-3xl font-black mb-4">Step 2: Book a Tour 🏫</h2>
              <p className="text-lg text-gray-700 font-medium mb-8">Come see the magic yourself! Pick a convenient date and time to visit our campus.</p>
              <form className="space-y-6" onSubmit={handleNext}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="play-card bg-[#F7FFF7] p-4 cursor-pointer hover:bg-[#FFE66D] transition-colors flex flex-col items-center text-center">
                    <Calendar size={40} className="mb-2 text-[#FF6B6B]" />
                    <span className="font-bold">Weekday Morning</span>
                    <span className="text-sm text-gray-600">9:00 AM - 11:00 AM</span>
                  </div>
                  <div className="play-card bg-[#F7FFF7] p-4 cursor-pointer hover:bg-[#FFE66D] transition-colors flex flex-col items-center text-center border-[#4ECDC4]">
                    <Clock size={40} className="mb-2 text-[#4ECDC4]" />
                    <span className="font-bold">Saturday Special</span>
                    <span className="text-sm text-gray-600">10:00 AM - 12:00 PM</span>
                  </div>
                </div>
                <div className="pt-4 flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setStep(1)}>Back</Button>
                  <Button variant="primary" type="submit">Confirm Date <ArrowRight size={20}/></Button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
             <div className="animate-in slide-in-from-right duration-300">
             <h2 className="text-3xl font-black mb-4">Step 3: Application Form 📋</h2>
             <p className="text-lg text-gray-700 font-medium mb-8">We loved meeting you! Fill out the detailed application form.</p>
             <div className="bg-[#FFE66D] border-4 border-[#1A1A1A] rounded-2xl p-8 text-center border-dashed">
                <Award size={64} className="mx-auto mb-4 text-[#1A1A1A] animate-wiggle" />
                <h3 className="font-black text-2xl mb-2">Application Package Ready</h3>
                <p className="font-medium mb-6">Download the PDF, fill it out, and upload it back here or bring it to the office.</p>
                <Button variant="primary" className="mx-auto bg-[#1A1A1A] text-white">Download PDF</Button>
             </div>
             <div className="pt-8 flex justify-between">
               <Button variant="outline" type="button" onClick={() => setStep(2)}>Back</Button>
               <Button variant="primary" onClick={handleNext}>Submit Application <ArrowRight size={20}/></Button>
             </div>
           </div>
          )}

          {step === 4 && (
             <div className="animate-in zoom-in duration-500 text-center py-12">
               <div className="w-32 h-32 bg-[#4ECDC4] border-4 border-[#1A1A1A] rounded-full mx-auto flex items-center justify-center mb-8 shadow-[8px_8px_0px_0px_#1A1A1A] animate-bounce">
                 <CheckCircle size={64} className="text-white" />
               </div>
               <h2 className="text-5xl font-black mb-4 text-[#FF6B6B]">You're All Set! 🎉</h2>
               <p className="text-xl text-gray-700 font-medium max-w-lg mx-auto mb-8">
                 Welcome to the family! We will review your application and send the enrollment confirmation within 48 hours.
               </p>
               <Button variant="accent" className="mx-auto" onClick={() => {}}>Return to Home</Button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Contact = () => (
  <div className="animate-in fade-in duration-500 pt-24 bg-[#F7FFF7] min-h-screen">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black text-[#1A1A1A] mb-6">Let's Connect! 📞</h1>
        <p className="text-2xl text-gray-700 font-medium max-w-3xl mx-auto">Have questions? Want to say hi? Drop us a message or visit our colorful campus.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info & Map */}
        <div className="space-y-8">
          <div className="play-card bg-[#FFE66D] p-8">
            <h3 className="text-3xl font-black mb-6">Contact Info</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-xl font-medium bg-white p-4 rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
                <div className="bg-[#FF6B6B] p-3 rounded-full border-2 border-[#1A1A1A]"><Phone size={24} className="text-white"/></div>
                (555) 123-4567
              </div>
              <div className="flex items-center gap-4 text-xl font-medium bg-white p-4 rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
                <div className="bg-[#4ECDC4] p-3 rounded-full border-2 border-[#1A1A1A]"><Mail size={24} className="text-white"/></div>
                hello@kidsplay.com
              </div>
              <div className="flex items-center gap-4 text-xl font-medium bg-white p-4 rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
                <div className="bg-white p-3 rounded-full border-2 border-[#1A1A1A]"><MapPin size={24} className="text-[#1A1A1A]"/></div>
                123 Playground Lane, Fun City
              </div>
            </div>
          </div>

          <div className="play-card overflow-hidden h-64 relative bg-gray-200">
            {/* Fake Map for UI purposes */}
            <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="bg-white px-6 py-3 rounded-full border-4 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] font-bold text-lg flex items-center gap-2 animate-bounce">
                  <MapPin className="text-[#FF6B6B]"/> We are here!
               </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="play-card bg-white p-8 md:p-12">
          <h3 className="text-3xl font-black mb-8 text-[#1A1A1A]">Send a Message ✉️</h3>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold mb-2 text-gray-700">First Name</label>
                <input type="text" className="w-full border-4 border-gray-200 rounded-xl p-4 font-medium focus:border-[#FF6B6B] focus:outline-none transition-colors" placeholder="Jane" />
              </div>
              <div>
                <label className="block font-bold mb-2 text-gray-700">Last Name</label>
                <input type="text" className="w-full border-4 border-gray-200 rounded-xl p-4 font-medium focus:border-[#FF6B6B] focus:outline-none transition-colors" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block font-bold mb-2 text-gray-700">Email Address</label>
              <input type="email" className="w-full border-4 border-gray-200 rounded-xl p-4 font-medium focus:border-[#FF6B6B] focus:outline-none transition-colors" placeholder="jane@example.com" />
            </div>
            <div>
              <label className="block font-bold mb-2 text-gray-700">Message</label>
              <textarea rows="4" className="w-full border-4 border-gray-200 rounded-xl p-4 font-medium focus:border-[#FF6B6B] focus:outline-none transition-colors resize-none" placeholder="How can we help you?"></textarea>
            </div>
            <Button variant="primary" className="w-full text-xl py-4" type="submit">
              Send Message <Send size={24} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'programs', label: 'Programs' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'contact', label: 'Contact' }
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home navigate={setCurrentPage} />;
      case 'about': return <About />;
      case 'programs': return <Programs />;
      case 'gallery': return <Gallery />;
      case 'admissions': return <Admissions />;
      case 'contact': return <Contact />;
      default: return <Home navigate={setCurrentPage} />;
    }
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
            onClick={() => setCurrentPage('home')}
          >
            <div className="bg-[#FF6B6B] p-2 rounded-xl border-2 border-[#1A1A1A] group-hover:rotate-12 transition-transform shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Sun size={28} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#1A1A1A]">Kids<span className="text-[#4ECDC4]">Play</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`font-bold text-lg relative px-2 py-1 transition-colors ${currentPage === item.id ? 'text-[#FF6B6B]' : 'text-gray-700 hover:text-[#4ECDC4]'}`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-[#FFE66D] rounded-full transform scale-x-100 transition-transform"></span>
                )}
              </button>
            ))}
            <Button variant="accent" className="ml-4 py-2 px-6 text-base" onClick={() => setCurrentPage('admissions')}>
              Enroll
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
                onClick={() => setCurrentPage(item.id)}
                className={`font-bold text-xl py-4 text-left border-b-2 border-gray-100 ${currentPage === item.id ? 'text-[#FF6B6B]' : 'text-gray-700'}`}
              >
                {item.label}
              </button>
            ))}
            <Button variant="accent" className="mt-6 w-full py-4 text-xl" onClick={() => setCurrentPage('admissions')}>
              Enroll Now
            </Button>
          </div>
        )}
      </nav>

      {/* PAGE CONTENT */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#1A1A1A] text-white pt-20 pb-10 px-6 relative overflow-hidden">
        {/* Decorative background shapes for footer */}
        <div className="absolute top-0 right-10 w-64 h-64 bg-[#4ECDC4] rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#FF6B6B] rounded-full blur-[100px] opacity-20"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="space-y-6 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="bg-[#FFE66D] p-2 rounded-xl"><Sun size={28} className="text-[#1A1A1A]" /></div>
              <span className="text-3xl font-black tracking-tight text-white">Kids<span className="text-[#FFE66D]">Play</span></span>
            </div>
            <p className="font-medium text-gray-400">Where little minds grow big dreams. Creating a joyful foundation for lifelong learning.</p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-[#4ECDC4]">Quick Links</h4>
            <ul className="space-y-4 font-medium text-gray-400">
              {['Home', 'About Us', 'Programs', 'Admissions'].map((link, i) => (
                <li key={i}><button onClick={() => setCurrentPage(link.toLowerCase().replace(' ', ''))} className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight size={16} className="text-[#FF6B6B]"/>{link}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-[#FFE66D]">Programs</h4>
            <ul className="space-y-4 font-medium text-gray-400">
              <li>Toddler (1.5-2.5y)</li>
              <li>Preschool (2.5-4y)</li>
              <li>Kindergarten (4-6y)</li>
              <li>Summer Camp</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-[#FF6B6B]">Newsletter</h4>
            <p className="font-medium text-gray-400 mb-4">Subscribe for fun updates and parenting tips!</p>
            <div className="flex bg-white rounded-full p-1 focus-within:ring-4 ring-[#4ECDC4] transition-all">
              <input type="email" placeholder="Your email" className="w-full bg-transparent text-[#1A1A1A] font-medium px-4 focus:outline-none" />
              <button className="bg-[#FF6B6B] text-white p-3 rounded-full hover:bg-red-500 transition-colors">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t-2 border-gray-800 text-center text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} KidsPlay School. All rights reserved. Designed with ❤️ for kids.</p>
        </div>
      </footer>
    </div>
  );
}

