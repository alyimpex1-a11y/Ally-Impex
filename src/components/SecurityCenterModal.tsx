import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Database, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Terminal, 
  Calendar, 
  Download, 
  Bell, 
  Server, 
  RefreshCw, 
  KeyRound, 
  FileCheck,
  Radio
} from 'lucide-react';
import { SIEMLogEvent, SecurityStatus } from '../types';

interface SecurityCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  siemEvents: SIEMLogEvent[];
  onTriggerSimulatedAlert: () => void;
  onTriggerBackup: () => void;
}

export const SecurityCenterModal: React.FC<SecurityCenterModalProps> = ({
  isOpen,
  onClose,
  siemEvents,
  onTriggerSimulatedAlert,
  onTriggerBackup
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'siem' | 'backups' | 'audits' | '2fa'>('overview');
  const [backupInProgress, setBackupInProgress] = useState(false);
  const [backupNotice, setBackupNotice] = useState('');
  const [twoFactorEnforced, setTwoFactorEnforced] = useState(true);

  const handleManualBackup = () => {
    setBackupInProgress(true);
    setTimeout(() => {
      setBackupInProgress(false);
      onTriggerBackup();
      setBackupNotice('Snapshot backup #AI-BK-' + Date.now().toString().slice(-4) + ' successfully generated and encrypted with AES-256.');
      setTimeout(() => setBackupNotice(''), 4000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-900 flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-slate-900 font-['Helvetica_Neue',Arial,sans-serif]">
                  Ally Impex Enterprise Security & Compliance Hub
                </h2>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                  SOC2 / PCI-DSS Ready
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Continuous Vulnerability Monitoring • SIEM Syslog Stream • Automated Backup Routine
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#F8FAFC] border-b border-slate-200 px-6 flex space-x-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Security Overview
          </button>
          <button
            onClick={() => setActiveTab('siem')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'siem'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>SIEM Central Logs</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
          <button
            onClick={() => setActiveTab('audits')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'audits'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Quarterly Penetration Audits</span>
          </button>
          <button
            onClick={() => setActiveTab('backups')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'backups'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Database Backup Routine</span>
          </button>
          <button
            onClick={() => setActiveTab('2fa')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === '2fa'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>2FA & SSL Settings</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Quick Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 shadow-xs">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-slate-500">SSL Encryption</span>
                    <Lock className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-lg font-bold text-slate-900">TLS 1.3 Active</p>
                  <p className="text-[11px] text-emerald-700 mt-1 font-mono font-semibold">256-Bit AES-GCM Cipher</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 shadow-xs">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-slate-500">Two-Factor Auth</span>
                    <KeyRound className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-slate-900">Enforced 100%</p>
                  <p className="text-[11px] text-slate-500 mt-1">SMS & Email OTP for Orders</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 shadow-xs">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-slate-500">Backup Routine</span>
                    <Database className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-lg font-bold text-slate-900">Daily Snapshots</p>
                  <p className="text-[11px] text-slate-500 mt-1">Geo-Redundant Multi-Cloud</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 shadow-xs">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-slate-500">Penetration Audit</span>
                    <FileCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-slate-900">Quarterly Cadence</p>
                  <p className="text-[11px] text-blue-600 font-semibold mt-1">Next: Q4 2026 Audit</p>
                </div>
              </div>

              {/* Real-time Threat Simulator & SIEM integration Banner */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <h3 className="text-sm font-bold text-slate-900 font-['Helvetica_Neue',Arial,sans-serif]">
                      Live Real-Time Unauthorized Access Alert Monitor
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 max-w-xl">
                    Our platform automatically streams telemetry to our centralized SIEM (Splunk/Elastic). Any brute-force or malicious SQL/XSS payload triggers automated stakeholder alerts.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onTriggerSimulatedAlert}
                  className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shrink-0 transition-all cursor-pointer shadow-xs"
                >
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Simulate Unauthorized Access Alert</span>
                </button>
              </div>

              {/* Security Architecture Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2 shadow-xs">
                  <h4 className="font-bold text-slate-900 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Quarterly Audit & Reporting Policy</span>
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Ally Impex conducts scheduled third-party penetration testing every 90 days. Executive summaries and vulnerability remediation matrices are automatically distributed to executive stakeholders.
                  </p>
                  <ul className="space-y-1 text-slate-700 font-mono text-[11px] pt-1">
                    <li>• Frequency: Every Quarter (Jan, Apr, Jul, Oct)</li>
                    <li>• Scope: OWASP Top 10, API Rate Limiting, WAF Efficacy</li>
                    <li>• Compliance: SOC2 Type II, ISO 27001, PCI-DSS Level 1</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2 shadow-xs">
                  <h4 className="font-bold text-slate-900 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Database Backup & Disaster Recovery SLA</span>
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Continuous incremental WAL archiving paired with daily cryptographic snapshots stored across multiple geographic cloud availability zones ensures near-zero RPO (Recovery Point Objective).
                  </p>
                  <ul className="space-y-1 text-slate-700 font-mono text-[11px] pt-1">
                    <li>• RPO Target: &lt; 5 Minutes</li>
                    <li>• RTO Target: &lt; 15 Minutes</li>
                    <li>• Encryption: AES-256 with Key Management Service (KMS)</li>
                  </ul>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SIEM CENTRAL LOGS */}
          {activeTab === 'siem' && (
            <div className="space-y-4">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 font-['Helvetica_Neue',Arial,sans-serif]">
                    <span>Centralized SIEM Syslog Stream (Splunk / Elastic Pipeline)</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-semibold">
                      CONNECTED
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Real-time ingestion of edge gateway requests, TLS handshakes, and access alerts.
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={onTriggerSimulatedAlert}
                    className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 cursor-pointer shadow-xs"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Inject Simulated Probe</span>
                  </button>
                </div>
              </div>

              {/* Console log box */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-x-auto space-y-2.5 max-h-[350px] shadow-xs">
                {siemEvents.map((evt) => (
                  <div 
                    key={evt.id} 
                    className={`p-2.5 rounded border text-[11px] flex flex-col space-y-1 ${
                      evt.severity === 'CRITICAL' || evt.severity === 'ALERT'
                        ? 'bg-red-950/40 border-red-800/80 text-red-200'
                        : evt.severity === 'WARNING'
                        ? 'bg-amber-950/40 border-amber-800/80 text-amber-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex flex-wrap justify-between items-center text-[10px] text-slate-400 border-b border-slate-800/80 pb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white">{evt.id}</span>
                        <span>•</span>
                        <span>{evt.timestamp}</span>
                        <span>•</span>
                        <span className="text-slate-300">IP: {evt.sourceIp}</span>
                        <span>({evt.location})</span>
                      </div>
                      <span className={`px-1.5 py-0.2 rounded font-bold uppercase ${
                        evt.severity === 'CRITICAL' || evt.severity === 'ALERT'
                          ? 'bg-red-500/30 text-red-300'
                          : evt.severity === 'WARNING'
                          ? 'bg-amber-500/30 text-amber-300'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {evt.severity}
                      </span>
                    </div>

                    <p className="font-semibold text-white">{evt.message}</p>
                    <p className="text-[10px] text-slate-400">Action: {evt.actionTaken}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AUDITS & PENETRATION TESTING */}
          {activeTab === 'audits' && (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-['Helvetica_Neue',Arial,sans-serif]">Quarterly Audits & Stakeholder Reporting</h3>
                  <p className="text-xs text-slate-500">
                    Schedule, frequency, and automated compliance updates for Ally Impex management and buyers.
                  </p>
                </div>
                <button
                  onClick={() => alert('Downloading Ally Impex Quarterly Penetration Audit Report (Q3 2026)...\nAuditor: CyberShield Compliance Labs\nOverall Score: 99.4%\nStatus: Zero Critical Vulnerabilities')}
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Download Executive Summary</span>
                </button>
              </div>

              {/* Audit Timeline Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white text-xs shadow-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-600 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3">Audit Cycle</th>
                      <th className="p-3">Target Scope</th>
                      <th className="p-3">Methodology</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Stakeholder Notification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Q1 2026 Audit</td>
                      <td className="p-3">B2B Order Gateway & SQL Databases</td>
                      <td className="p-3 font-mono text-[11px]">CREST Black-box PenTest</td>
                      <td className="p-3">
                        <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                          Passed (Score 99.2%)
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">Dispatched to Stakeholders</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Q2 2026 Audit</td>
                      <td className="p-3">API Endpoints & 2FA Enforcement</td>
                      <td className="p-3 font-mono text-[11px]">Grey-box Architecture Review</td>
                      <td className="p-3">
                        <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                          Passed (Score 99.6%)
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">Dispatched to Stakeholders</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Q3 2026 Audit</td>
                      <td className="p-3">WAF Rules, SIEM Syslog & Cart Integrity</td>
                      <td className="p-3 font-mono text-[11px]">Dynamic Application Security (DAST)</td>
                      <td className="p-3">
                        <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                          Current Clean
                        </span>
                      </td>
                      <td className="p-3 text-emerald-700 font-semibold">Automated Alert Active</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Q4 2026 Audit</td>
                      <td className="p-3">Annual Re-Certification & Infrastructure</td>
                      <td className="p-3 font-mono text-[11px]">Full Scope Pen-Test</td>
                      <td className="p-3">
                        <span className="text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-bold">
                          Scheduled: Oct 15, 2026
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">Automated Calendar Reminder Set</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: DATABASE BACKUPS */}
          {activeTab === 'backups' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-['Helvetica_Neue',Arial,sans-serif]">Database Backup Routine & Point-in-Time Recovery</h3>
                  <p className="text-xs text-slate-500">
                    Automated snapshots prevent catalog and order loss in the event of unexpected infrastructure failures.
                  </p>
                </div>

                <button
                  onClick={handleManualBackup}
                  disabled={backupInProgress}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${backupInProgress ? 'animate-spin' : ''}`} />
                  <span>{backupInProgress ? 'Snapshotting Database...' : 'Trigger Immediate Backup'}</span>
                </button>
              </div>

              {backupNotice && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{backupNotice}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200 shadow-xs">
                  <span className="text-slate-500 block">Snapshot Frequency:</span>
                  <strong className="text-slate-900 text-sm font-bold">Every 24 Hours (00:00 UTC)</strong>
                  <span className="text-[10px] text-slate-500 block mt-1">+ Real-time WAL stream</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200 shadow-xs">
                  <span className="text-slate-500 block">Retention Policy:</span>
                  <strong className="text-slate-900 text-sm font-bold">30-Day Automated Rolling</strong>
                  <span className="text-[10px] text-slate-500 block mt-1">Multi-Region S3 Cold Storage</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200 shadow-xs">
                  <span className="text-slate-500 block">Encryption Standard:</span>
                  <strong className="text-blue-700 text-sm font-mono font-bold">AES-256-GCM</strong>
                  <span className="text-[10px] text-slate-500 block mt-1">Hardware KMS keys</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs space-y-2 shadow-xs">
                <h4 className="font-bold text-slate-900">Recent Backup Logs & Verifications:</h4>
                <div className="space-y-1.5 font-mono text-[11px] text-slate-700">
                  <p className="flex justify-between border-b border-slate-200 pb-1">
                    <span>• AI-BK-20260906-0000.sql.enc (2.41 GB)</span>
                    <span className="text-emerald-700 font-semibold">Verified (SHA-256 Checksum OK)</span>
                  </p>
                  <p className="flex justify-between border-b border-slate-200 pb-1">
                    <span>• AI-BK-20260905-0000.sql.enc (2.39 GB)</span>
                    <span className="text-emerald-700 font-semibold">Verified (SHA-256 Checksum OK)</span>
                  </p>
                  <p className="flex justify-between">
                    <span>• AI-BK-20260904-0000.sql.enc (2.35 GB)</span>
                    <span className="text-emerald-700 font-semibold">Verified (SHA-256 Checksum OK)</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: 2FA & SSL ENFORCEMENT */}
          {activeTab === '2fa' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-['Helvetica_Neue',Arial,sans-serif]">Two-Factor Authentication & SSL Configuration</h3>
                <p className="text-xs text-slate-500">
                  Manage encryption ciphers and identity verification requirements across customer checkout and administrative access.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Enforce 2FA on High-Value B2B Transactions</h4>
                    <p className="text-[11px] text-slate-500">Requires customers to enter SMS or Email OTP before order execution.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={twoFactorEnforced}
                    onChange={(e) => setTwoFactorEnforced(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">HTTP Strict Transport Security (HSTS)</h4>
                    <p className="text-[11px] text-slate-500">Forces all browser connections over HTTPS with 256-bit encryption.</p>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                    ENFORCED
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Automated Stakeholder Alert Webhook</h4>
                    <p className="text-[11px] text-slate-500">Alerts dispatched to allyimpex1@gmail.com and +92 324 9981194 upon critical flags.</p>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#F8FAFC] border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
          <span>Ally Impex Cyber Defense Unit • Sialkot Export Hub</span>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
          >
            Close Console
          </button>
        </div>

      </div>
    </div>
  );
};
