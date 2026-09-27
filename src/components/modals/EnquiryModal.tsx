'use me';
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Calendar, Users, Phone, Mail, User, MessageSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND_INFO } from '../../data/vinhareData';
import { EnquiryFormData } from '../../types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedOption?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedOption,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<EnquiryFormData>({
    occasion: preselectedOption || 'STAY',
    destination: 'Shiv Garden Resort',
    date: '',
    guests: '50-100 Guests',
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const occasions = ['STAY', 'WEDDING', 'EVENT', 'CELEBRATION', 'OTHER'];
  const destinations = [
    'Shiv Garden Resort',
    'J.P. Resort',
    'Resort Raj',
    'Mithila Marriage Services',
  ];
  const guestRanges = ['10-50 Guests', '50-150 Guests', '150-300 Guests', '300+ Guests'];

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Fire golden celebration confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F3E5AB', '#C5A059', '#FFFFFF'],
    });
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] bg-white/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-3xl rounded-3xl glass-panel-gold border-2 border-[#D4AF37]/50 p-8 sm:p-12 shadow-[0_30px_90px_rgba(184,134,11,0.2)] overflow-hidden text-[#1A1814]"
        >
          {/* Top Close Button */}
          <button
            onClick={resetForm}
            className="absolute top-6 right-6 p-3 rounded-full border border-[#D4AF37]/50 text-[#B8860B] hover:bg-[#D4AF37] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 text-[10px] tracking-[0.3em] text-[#B8860B] uppercase font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>STEP 0{step} OF 05</span>
                </div>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#1A1814]">
                  LET'S PLAN SOMETHING MEMORABLE.
                </h3>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-[#EAE4D9] rounded-full overflow-hidden mb-10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37]"
                  style={{ width: `${(step / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Dynamic Step Content */}
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Occasion */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <p className="text-xs text-[#B8860B] tracking-widest font-bold uppercase">
                        STEP 1: WHAT ARE YOU PLANNING?
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {occasions.map((occ) => (
                          <button
                            key={occ}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, occasion: occ });
                              handleNext();
                            }}
                            className={`p-4 rounded-xl text-xs tracking-widest font-bold uppercase border transition-all ${
                              formData.occasion === occ
                                ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-sm'
                                : 'bg-white text-[#1A1814] border-[#D4AF37]/30 hover:border-[#B8860B]'
                            }`}
                          >
                            {occ}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Destination */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <p className="text-xs text-[#B8860B] tracking-widest font-bold uppercase">
                        STEP 2: CHOOSE DESTINATION
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {destinations.map((dest) => (
                          <button
                            key={dest}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, destination: dest });
                              handleNext();
                            }}
                            className={`p-4 text-left rounded-xl text-xs tracking-wider font-bold border transition-all ${
                              formData.destination === dest
                                ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-sm'
                                : 'bg-white text-[#1A1814] border-[#D4AF37]/30 hover:border-[#B8860B]'
                            }`}
                          >
                            {dest}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Date */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <p className="text-xs text-[#B8860B] tracking-widest font-bold uppercase">
                        STEP 3: PREFERRED DATE / MONTH
                      </p>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B8860B]" />
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-[#D4AF37]/40 text-[#1A1814] text-sm focus:outline-none focus:border-[#B8860B] shadow-sm"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Guests */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <p className="text-xs text-[#B8860B] tracking-widest font-bold uppercase">
                        STEP 4: ESTIMATED GUEST COUNT
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {guestRanges.map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, guests: g });
                              handleNext();
                            }}
                            className={`p-4 rounded-xl text-xs tracking-widest font-bold uppercase border transition-all ${
                              formData.guests === g
                                ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-sm'
                                : 'bg-white text-[#1A1814] border-[#D4AF37]/30 hover:border-[#B8860B]'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Contact Information */}
                  {step === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <p className="text-xs text-[#B8860B] tracking-widest font-bold uppercase">
                        STEP 5: CONTACT DETAILS
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8860B]" />
                          <input
                            type="text"
                            placeholder="Your Name *"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#D4AF37]/40 text-[#1A1814] text-xs focus:outline-none focus:border-[#B8860B] shadow-sm"
                            required
                          />
                        </div>

                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8860B]" />
                          <input
                            type="tel"
                            placeholder="Phone Number (+91) *"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#D4AF37]/40 text-[#1A1814] text-xs focus:outline-none focus:border-[#B8860B] shadow-sm"
                            required
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8860B]" />
                        <input
                          type="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#D4AF37]/40 text-[#1A1814] text-xs focus:outline-none focus:border-[#B8860B] shadow-sm"
                          required
                        />
                      </div>

                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-[#B8860B]" />
                        <textarea
                          placeholder="Additional Details / Requirements..."
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#D4AF37]/40 text-[#1A1814] text-xs focus:outline-none focus:border-[#B8860B] shadow-sm"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step Controls */}
                <div className="flex items-center justify-between pt-8 mt-6 border-t border-[#D4AF37]/30">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-5 py-2.5 rounded-full border border-[#D4AF37] text-[#B8860B] text-xs tracking-widest font-bold uppercase flex items-center space-x-2 bg-white"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>BACK</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 5 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 rounded-full bg-[#D4AF37] text-white text-xs tracking-[0.2em] font-bold uppercase flex items-center space-x-2 hover:bg-[#B8860B] transition-colors shadow-sm"
                    >
                      <span>NEXT STEP</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-8 py-4 rounded-full bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-white text-xs tracking-[0.25em] font-bold uppercase shadow-[0_10px_25px_rgba(184,134,11,0.3)]"
                    >
                      SEND ENQUIRY
                    </button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            /* Success Screen State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 flex flex-col items-center space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-[#D4AF37]/15 border-2 border-[#D4AF37] flex items-center justify-center text-[#B8860B]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="font-serif-luxury text-4xl sm:text-5xl text-[#1A1814] font-light">
                THANK YOU.
              </h3>

              <p className="text-base text-[#B8860B] font-serif italic font-bold">
                Your Vinhare journey starts here.
              </p>

              <p className="text-xs text-[#52483B] max-w-md font-light leading-relaxed">
                Our concierge desk will review your inquiry details for <strong className="text-[#1A1814] font-bold">{formData.destination}</strong> ({formData.occasion}) and reach out to you shortly at {formData.phone || BRAND_INFO.phone}.
              </p>

              <button
                onClick={resetForm}
                className="mt-6 px-8 py-3.5 rounded-full bg-[#D4AF37] text-white font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#B8860B] transition-colors shadow-md"
              >
                RETURN TO EXPERIENCE
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
