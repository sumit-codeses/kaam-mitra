import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Smartphone, CheckCircle2, Shield, ArrowRight, User, MapPin } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useApp } from '../../context/AppContext';
import { UserRole, LanguageCode, WorkerSkill } from '../../types';
import { allSkillsList } from '../../data/mockData';

export const AuthModal: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { authModalOpen, setAuthModalOpen, setCurrentRole, setCurrentView, updateWorkerProfile, updateEmployerProfile } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  
  // Form fields
  const [phone, setPhone] = useState('9835124789');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('5824');
  const [name, setName] = useState('Ramesh Kumar');
  const [selectedRole, setSelectedRole] = useState<UserRole>('worker');
  const [stateName, setStateName] = useState('Bihar');
  const [district, setDistrict] = useState('Saharsa');
  const [block, setBlock] = useState('Kahra');
  const [village, setVillage] = useState('Bangaon');
  const [selectedSkill, setSelectedSkill] = useState<WorkerSkill>('Mason');
  const [error, setError] = useState('');

  if (!authModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError(language === 'hi' ? 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomOtp);
    setStep('otp');
    // Pre-fill for ultra smooth demo testing
    setTimeout(() => {
      setOtp(randomOtp);
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== generatedOtp && otp !== '1234') {
      setError(language === 'hi' ? 'गलत OTP! कृपया दोबारा जांचें' : 'Invalid OTP. Try 5824 or 1234');
      return;
    }
    setError('');

    if (mode === 'signup') {
      if (selectedRole === 'worker') {
        updateWorkerProfile({
          name,
          phone: `+91 ${phone}`,
          primarySkill: selectedSkill,
          location: {
            state: stateName,
            district,
            block,
            villageOrCity: village,
          },
        });
      } else {
        updateEmployerProfile({
          name,
          phone: `+91 ${phone}`,
          location: {
            state: stateName,
            district,
            block,
            villageOrCity: village,
          },
        });
      }
    }

    setCurrentRole(selectedRole);
    setCurrentView('dashboard');
    setAuthModalOpen(false);
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 to-emerald-700 text-white p-5 relative">
          <button
            id="close-auth-modal"
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-emerald-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              {language === 'hi' ? 'सुरक्षित OTP लॉगिन' : 'Verified OTP Access'}
            </span>
          </div>
          <h3 className="text-xl font-bold">
            {mode === 'login' ? t('login', 'Login to Kaam Sarthi') : t('signUp', 'Create New Account')}
          </h3>
          <p className="text-xs text-blue-100">
            {language === 'hi'
              ? 'काम पाने या काम देने के लिए आसान मोबाइल सत्यापन'
              : 'Seamless mobile login for rural and semi-urban workforce'}
          </p>

          {/* Mode Switch Tab */}
          <div className="flex bg-black/25 p-1 rounded-xl mt-4 max-w-xs">
            <button
              id="auth-tab-login"
              type="button"
              onClick={() => {
                setMode('login');
                setStep('phone');
                setError('');
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                mode === 'login' ? 'bg-white text-blue-900 shadow-sm' : 'text-blue-100 hover:text-white'
              }`}
            >
              {t('login', 'Login')}
            </button>
            <button
              id="auth-tab-signup"
              type="button"
              onClick={() => {
                setMode('signup');
                setStep('phone');
                setError('');
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                mode === 'signup' ? 'bg-white text-emerald-900 shadow-sm' : 'text-blue-100 hover:text-white'
              }`}
            >
              {t('signUp', 'Sign Up')}
            </button>
          </div>
        </div>

        {/* Modal Form */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                      {t('name', 'Full Name')} / पूरा नाम
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        id="signup-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar / राजेश शर्मा"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                      {t('profileType', 'Profile Type')} / भूमिका
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        id="signup-role-worker"
                        onClick={() => setSelectedRole('worker')}
                        className={`p-2.5 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                          selectedRole === 'worker'
                            ? 'border-blue-600 bg-blue-50 text-blue-900'
                            : 'border-slate-200 text-slate-700'
                        }`}
                      >
                        <span>👷</span>
                        <span>{t('worker', 'Worker')}</span>
                      </button>
                      <button
                        type="button"
                        id="signup-role-employer"
                        onClick={() => setSelectedRole('employer')}
                        className={`p-2.5 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                          selectedRole === 'employer'
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                            : 'border-slate-200 text-slate-700'
                        }`}
                      >
                        <span>💼</span>
                        <span>{t('employer', 'Employer')}</span>
                      </button>
                    </div>
                  </div>

                  {selectedRole === 'worker' && (
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                        {language === 'hi' ? 'मुख्य हुनर / पेशा' : 'Primary Trade / Skill'}
                      </label>
                      <select
                        id="signup-skill-select"
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value as WorkerSkill)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-medium bg-white"
                      >
                        {allSkillsList.map((skill) => (
                          <option key={skill} value={skill}>
                            {skill}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">District / ज़िला</label>
                      <input
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full p-2 rounded-xl border border-slate-200 text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Block / ब्लॉक</label>
                      <input
                        type="text"
                        value={block}
                        onChange={(e) => setBlock(e.target.value)}
                        className="w-full p-2 rounded-xl border border-slate-200 text-xs font-medium"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Mobile Number input */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  {t('mobileNumber', 'Mobile Number')}
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-600 text-sm font-bold">
                    +91
                  </span>
                  <input
                    id="auth-mobile-input"
                    type="tel"
                    maxLength={10}
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98351 24789"
                    className="w-full px-3 py-2.5 rounded-r-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm font-semibold tracking-wide"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {language === 'hi' ? 'हम आपको 4 अंकों का OTP भेजेंगे' : 'We will send a 4-digit code to this number'}
                </p>
              </div>

              {/* Demo quick role selector on login */}
              {mode === 'login' && (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <p className="text-[11px] font-bold text-slate-500 uppercase mb-2">
                    {language === 'hi' ? 'क्विक डेमो लॉगिन के रूप में:' : 'Demo Quick Login as:'}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      id="demo-login-worker"
                      onClick={() => {
                        setSelectedRole('worker');
                        setPhone('9835124789');
                      }}
                      className={`p-2 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition ${
                        selectedRole === 'worker' ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200'
                      }`}
                    >
                      <span>👷 Ramesh (Worker)</span>
                    </button>
                    <button
                      type="button"
                      id="demo-login-employer"
                      onClick={() => {
                        setSelectedRole('employer');
                        setPhone('9431288765');
                      }}
                      className={`p-2 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition ${
                        selectedRole === 'employer' ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-200'
                      }`}
                    >
                      <span>💼 Rajesh (Employer)</span>
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                id="auth-send-otp-btn"
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <span>{t('sendOtp', 'Send OTP')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center pb-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-2">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">
                  {language === 'hi' ? 'OTP भेजा गया है:' : 'Enter Verification Code'}
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  +91 {phone} (Demo OTP: <strong className="text-emerald-700 font-bold">{generatedOtp}</strong>)
                </p>
              </div>

              <div>
                <input
                  id="auth-otp-input"
                  type="text"
                  maxLength={4}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • •"
                  className="w-full text-center text-2xl font-black tracking-[0.6em] py-3 rounded-2xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 bg-slate-50"
                />
              </div>

              <div className="flex justify-between items-center text-xs">
                <button
                  type="button"
                  id="auth-resend-otp-btn"
                  onClick={() => {
                    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
                    setGeneratedOtp(newOtp);
                    setOtp(newOtp);
                  }}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  {t('resendOtp', 'Resend OTP')}
                </button>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-slate-500 hover:text-slate-800"
                >
                  {language === 'hi' ? 'नंबर बदलें' : 'Change Number'}
                </button>
              </div>

              <button
                type="submit"
                id="auth-verify-otp-btn"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('verifyOtp', 'Verify & Continue')}</span>
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
