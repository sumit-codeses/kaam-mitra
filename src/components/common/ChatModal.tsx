import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Phone, PhoneCall, PhoneOff, ShieldCheck, MapPin, CheckCheck, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';

export const ChatModal: React.FC = () => {
  const { chatModal, closeChat, currentRole, activeWorker, activeEmployer } = useApp();
  const { t, language } = useLanguage();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ id: string; sender: 'me' | 'other'; text: string; time: string }>>([
    {
      id: 'm-1',
      sender: 'other',
      text: 'Namaste! Are you available for work as per the job description?',
      time: '10:15 AM',
    },
    {
      id: 'm-2',
      sender: 'me',
      text: 'Yes sir, I am available tomorrow morning at 8:30 AM with all required tools.',
      time: '10:18 AM',
    },
  ]);

  const [isCalling, setIsCalling] = useState(false);
  const [callConnected, setCallConnected] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);

  if (!chatModal.isOpen || !chatModal.targetUser) return null;

  const target = chatModal.targetUser;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'me' as const,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    // Simulated reply after 1.2 seconds for realistic prototype feel
    setTimeout(() => {
      const autoReplies = [
        'Bahut badhiya. Kripya time par site par pahunch jayein. Dhanyawad!',
        'Location link WhatsApp par bhi bhej diya hai. Call par baat kar lijiye.',
        'Payment kaam khatam hote hi sham ko cash ya UPI se mil jayega.',
      ];
      const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-reply-${Date.now()}`,
          sender: 'other' as const,
          text: randomReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const handleStartCall = () => {
    setIsCalling(true);
    setCallConnected(false);
    setCallSeconds(0);

    setTimeout(() => {
      setCallConnected(true);
    }, 1500);
  };

  const handleEndCall = () => {
    setIsCalling(false);
    setCallConnected(false);
  };

  const quickChips = [
    language === 'hi' ? 'हाँ, मैं कल सुबह 9 बजे उपलब्ध हूँ।' : 'Yes, I am available tomorrow at 9 AM.',
    language === 'hi' ? 'कृपया काम की सही जगह (Location) बताएं।' : 'Please share exact work site location.',
    language === 'hi' ? 'दैनिक मजदूरी और समय पक्का करें।' : 'Confirm daily wage and work timings.',
    language === 'hi' ? 'मैं अपने औजार साथ लेकर आऊंगा।' : 'I will bring my own trade tools.',
  ];

  return (
    <div
      id="chat-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-3 sm:p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col h-[560px]"
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-700 to-emerald-700 text-white p-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={target.photo}
                alt={target.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white/60"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm leading-tight text-white">{target.name}</h3>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              </div>
              <p className="text-[11px] text-blue-100 flex items-center gap-1">
                <span>{target.role === 'worker' ? 'Kaamgaar' : 'Employer'}</span>
                <span>•</span>
                <span>{target.phone}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id="chat-call-btn"
              onClick={handleStartCall}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition flex items-center gap-1 text-xs font-bold"
              title="Call directly"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xs:inline">{t('callNow', 'Call')}</span>
            </button>
            <button
              id="close-chat-btn"
              onClick={closeChat}
              className="p-2 rounded-full hover:bg-white/20 text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Job reference strip */}
        {chatModal.jobTitle && (
          <div className="bg-blue-50/90 px-3.5 py-1.5 border-b border-blue-100 flex items-center justify-between text-xs text-blue-900">
            <span className="font-semibold truncate max-w-[280px]">
              📌 {chatModal.jobTitle}
            </span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
              Live Discussion
            </span>
          </div>
        )}

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          <div className="text-center my-2">
            <span className="text-[10px] bg-slate-200/70 text-slate-600 px-3 py-1 rounded-full font-medium">
              🔒 Safe & Verified Kaam Sarthi Direct Channel
            </span>
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'me' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-2xs ${
                  m.sender === 'me'
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                }`}
              >
                <p>{m.text}</p>
                <div
                  className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${
                    m.sender === 'me' ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  <span>{m.time}</span>
                  {m.sender === 'me' && <CheckCheck className="w-3 h-3 text-blue-200" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2 bg-slate-100 border-t border-slate-200 overflow-x-auto flex gap-1.5 no-scrollbar">
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="flex-shrink-0 text-[11px] bg-white hover:bg-blue-50 hover:text-blue-700 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full transition shadow-2xs font-medium"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            id="chat-text-input"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={
              language === 'hi'
                ? 'मैसेज टाइप करें या ऊपर का सुझाव चुनें...'
                : 'Type message or choose suggested reply...'
            }
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
          <button
            id="chat-send-btn"
            onClick={() => handleSendMessage()}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition flex-shrink-0"
            title="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Simulated Calling Overlay */}
        <AnimatePresence>
          {isCalling && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 z-30 bg-slate-900/95 text-white flex flex-col items-center justify-between p-8 text-center"
            >
              <div className="pt-8">
                <img
                  src={target.photo}
                  alt={target.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-emerald-500 shadow-2xl ring-4 ring-emerald-500/20"
                />
                <h4 className="text-xl font-bold">{target.name}</h4>
                <p className="text-xs text-slate-400 mt-1">{target.phone}</p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-xs text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>
                    {callConnected
                      ? `${language === 'hi' ? 'बातचीत जारी है' : 'Call Connected'} (00:0${callSeconds % 60})`
                      : language === 'hi'
                      ? 'कॉल मिल रहा है...'
                      : 'Dialing community network...'}
                  </span>
                </div>
              </div>

              <div className="space-y-4 w-full max-w-xs">
                <p className="text-[11px] text-slate-400">
                  {language === 'hi'
                    ? 'कॉल रिकॉर्डिंग व सुरक्षा गाइडलाइन्स लागू हैं।'
                    : 'Direct calling enabled without exposing personal privacy.'}
                </p>
                <button
                  id="end-call-btn"
                  onClick={handleEndCall}
                  className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition"
                >
                  <PhoneOff className="w-5 h-5" />
                  <span>{language === 'hi' ? 'कॉल समाप्त करें' : 'End Call'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
