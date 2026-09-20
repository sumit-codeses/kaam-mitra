import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { AlertTriangle, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId?: string;
  targetName?: string;
  jobId?: string;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  targetId = 'emp-1',
  targetName = 'Rajesh Sharma Construction',
  jobId,
}) => {
  const { addComplaint, currentRole, activeWorker, activeEmployer } = useApp();
  const { t, language } = useLanguage();

  const [type, setType] = useState<'fake_job' | 'payment_issue' | 'harassment' | 'misbehavior'>('payment_issue');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reporterName = currentRole === 'worker' ? activeWorker.name : activeEmployer.name;
    const reporterId = currentRole === 'worker' ? activeWorker.id : activeEmployer.id;

    addComplaint({
      reportedByRole: currentRole as 'worker' | 'employer',
      reportedById: reporterId,
      reportedByName: reporterName,
      targetId,
      targetName,
      type,
      description,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDescription('');
      onClose();
    }, 2200);
  };

  return (
    <div
      id="report-issue-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in"
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-rose-600">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="font-bold text-base text-slate-900">
              {language === 'hi' ? 'समस्या या शिकायत दर्ज करें' : 'Report Issue / Safety Complaint'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">
              {language === 'hi' ? 'शिकायत दर्ज कर ली गई है' : 'Complaint Logged Successfully'}
            </h4>
            <p className="text-xs text-slate-500">
              Our rural Panchayat support officer will investigate within 12 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <p className="text-slate-600">
              Reporting against: <strong className="text-slate-900">{targetName}</strong>
            </p>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Issue Category *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
              >
                <option value="payment_issue">Non-Payment / Delayed Wage Dispute</option>
                <option value="fake_job">Fake Job Listing / Fraud</option>
                <option value="harassment">Unsafe Worksite / Harassment</option>
                <option value="misbehavior">Abusive Language or Misbehavior</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Description of what happened *
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the incident, dates, agreed wage amount, and any witness details..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs resize-none"
              />
            </div>

            <div className="pt-2 flex gap-2 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition shadow-xs"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
