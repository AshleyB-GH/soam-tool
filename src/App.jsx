import React, { useState } from "react";
import LOGO from "./Weston_Logo.png";

const STEPS = [
  { id: 1, label: "Occurrence" },
  { id: 2, label: "SHEL/O" },
  { id: 3, label: "Barriers" },
  { id: 4, label: "SMARTER" },
  { id: 5, label: "Report" },
];

const SHELO_FACTORS = {
  S: { label: "Software", sub: "Procedures, rules, charts, publications", color: "#818cf8", bg: "rgba(129,140,248,0.15)",
    items: ["Inadequate procedure","Missing checklist","Ambiguous regulation","Outdated chart","Incorrect data","Poor documentation","Missing SOP"] },
  H: { label: "Hardware", sub: "Aircraft, equipment, tools, infrastructure", color: "#34d399", bg: "rgba(52,211,153,0.15)",
    items: ["Equipment failure","Design deficiency","Poor ergonomics","Inadequate maintenance","Missing equipment","Infrastructure fault","Tool unavailability"] },
  E: { label: "Environment", sub: "Physical & operational environment", color: "#fb923c", bg: "rgba(251,146,60,0.15)",
    items: ["Weather conditions","Noise/distraction","Poor lighting","Workspace layout","Time pressure","High workload","Shift work/fatigue"] },
  L: { label: "Liveware", sub: "Humans — pilots, controllers, crew", color: "#f472b6", bg: "rgba(244,114,182,0.15)",
    items: ["Situational awareness","Communication failure","Skill deficit","Fatigue","Complacency","Distraction","Decision error","Rule violation"] },
  O: { label: "Organisation", sub: "Policies, culture, resources, management", color: "#facc15", bg: "rgba(250,204,21,0.15)",
    items: ["Safety culture","Inadequate training","Resource constraints","Management pressure","Poor communication","Conflicting goals","Supervision failure"] },
};

const BARRIERS = [
  { id: "awareness", name: "Awareness", desc: "Was the hazard perceived or detected by those involved?", icon: "👁" },
  { id: "restriction", name: "Restriction", desc: "Were barriers in place to prevent the hazard from developing?", icon: "🚧" },
  { id: "detection", name: "Detection", desc: "Were systems in place to detect the developing failure?", icon: "📡" },
  { id: "control", name: "Control", desc: "Were controls available to manage the situation?", icon: "🎛" },
  { id: "protection", name: "Protection", desc: "Was there protection against the harmful outcome?", icon: "🛡" },
  { id: "escape", name: "Escape", desc: "Were recovery or escape options available?", icon: "🚪" },
];

export default function App() {
  const [step, setStep] = useState(1);
  const [occurrence, setOccurrence] = useState({ title: "", date: "", dept: "", description: "", severity: "", investigator: "" });
  const [shelo, setShelo] = useState({ S: [], H: [], E: [], L: [], O: [] });
  const [customFactors, setCustomFactors] = useState({ S: "", H: "", E: "", L: "", O: "" });
  const [barriers, setBarriers] = useState({});
  const [barrierNotes, setBarrierNotes] = useState({});
  const [recs, setRecs] = useState([{ id: 1, barrier: "", action: "", S: "", M: "", A: "", R: "", T: "", E2: "", R2: "" }]);

  const toggleFactor = (cat, item) => {
    setShelo(prev => ({
      ...prev,
      [cat]: prev[cat].includes(item) ? prev[cat].filter(x => x !== item) : [...prev[cat], item]
    }));
  };

  const addCustomFactor = (cat) => {
    const val = customFactors[cat].trim();
    if (!val) return;
    setShelo(prev => ({ ...prev, [cat]: [...prev[cat], val] }));
    setCustomFactors(prev => ({ ...prev, [cat]: "" }));
  };

  const toggleBarrier = (id) => {
    setBarriers(prev => ({
      ...prev,
      [id]: prev[id] === "failed" ? "intact" : prev[id] === "intact" ? undefined : "failed"
    }));
  };

  const addRec = () => {
    setRecs(prev => [...prev, { id: Date.now(), barrier: "", action: "", S: "", M: "", A: "", R: "", T: "", E2: "", R2: "" }]);
  };

  const updateRec = (id, key, val) => {
    setRecs(prev => prev.map(r => r.id === id ? { ...r, [key]: val } : r));
  };

  const deleteRec = (id) => {
    setRecs(prev => prev.filter(r => r.id !== id));
  };

  const failedBarriers = BARRIERS.filter(b => barriers[b.id] === "failed");

  const completedSteps = [
    occurrence.title && occurrence.severity,
    Object.values(shelo).some(v => v.length > 0),
    Object.keys(barriers).length > 0,
    recs.some(r => r.action),
  ];

  const styles = {
    app: { minHeight: "100vh", background: "#020817", color: "#e2e8f0", fontFamily: "'Rajdhani', sans-serif" },
    header: { background: "linear-gradient(135deg,#0f172a,#0c1931)", borderBottom: "1px solid #1e3a5f", padding: "16px 24px", display: "flex", alignItems: "center", gap: 14 },
    logo: { width: 42, height: 42, borderRadius: 10, background: "linear-gradient(135deg,#0ea5e9,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 },
    progressBar: { height: 3, background: "#1e293b" },
    layout: { display: "flex", minHeight: "calc(100vh - 75px)" },
    sidebar: { width: 200, background: "#0a0f1e", borderRight: "1px solid #1e293b", padding: "16px 0", flexShrink: 0 },
    content: { flex: 1, padding: "24px 32px", overflowY: "auto" },
    sectionTitle: { fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#94a3b8", textTransform: "uppercase", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid #1e293b" },
    fieldGroup: { marginBottom: 14 },
    fieldLabel: { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 },
    input: { width: "100%", background: "#0f172a", border: "1px solid #1e293b", borderRadius: 6, padding: "8px 12px", color: "#e2e8f0", fontSize: 13, fontFamily: "inherit", outline: "none" },
    textarea: { width: "100%", background: "#0f172a", border: "1px solid #1e293b", borderRadius: 6, padding: "8px 12px", color: "#e2e8f0", fontSize: 13, fontFamily: "inherit", outline: "none", resize: "vertical", minHeight: 70 },
    twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
    btnRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 16, borderTop: "1px solid #1e293b" },
    btnPrimary: { padding: "9px 22px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: 1, fontFamily: "inherit", background: "#0ea5e9", color: "#0f172a" },
    btnSecondary: { padding: "9px 22px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: 1, fontFamily: "inherit", background: "#1e293b", color: "#94a3b8" },
    btnSuccess: { padding: "9px 22px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: 1, fontFamily: "inherit", background: "#34d399", color: "#0f172a" },
  };

  const renderStep1 = () => (
    <div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');`}</style>
      <div style={styles.sectionTitle}>Occurrence Details</div>
      <div style={styles.twoCol}>
        <div style={styles.fieldGroup}>
          <div style={styles.fieldLabel}>Occurrence Title</div>
          <input style={styles.input} placeholder="e.g. Runway Incursion RWY25" value={occurrence.title} onChange={e => setOccurrence(p => ({...p, title: e.target.value}))} />
        </div>
        <div style={styles.fieldGroup}>
          <div style={styles.fieldLabel}>Date</div>
          <input type="date" style={styles.input} value={occurrence.date} onChange={e => setOccurrence(p => ({...p, date: e.target.value}))} />
        </div>
      </div>
      <div style={styles.twoCol}>
        <div style={styles.fieldGroup}>
          <div style={styles.fieldLabel}>Department</div>
          <select style={styles.input} value={occurrence.dept} onChange={e => setOccurrence(p => ({...p, dept: e.target.value}))}>
            <option value="">Select...</option>
            <option>ANS</option><option>ADR</option><option>Both</option>
          </select>
        </div>
        <div style={styles.fieldGroup}>
          <div style={styles.fieldLabel}>Investigator</div>
          <input style={styles.input} placeholder="Name" value={occurrence.investigator} onChange={e => setOccurrence(p => ({...p, investigator: e.target.value}))} />
        </div>
      </div>
      <div style={styles.fieldGroup}>
        <div style={styles.fieldLabel}>Occurrence Description</div>
        <textarea style={styles.textarea} placeholder="Describe what happened, when, where and who was involved..." value={occurrence.description} onChange={e => setOccurrence(p => ({...p, description: e.target.value}))} />
      </div>
      <div style={styles.fieldGroup}>
        <div style={styles.fieldLabel}>Severity Classification</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
          {[
            { l: "A", name: "Accident", req: "Mandatory SOAM", col: "#dc2626" },
            { l: "B", name: "Serious Incident", req: "Mandatory SOAM", col: "#ef4444" },
            { l: "C", name: "Major Incident", req: "Mandatory SOAM", col: "#f97316" },
            { l: "D", name: "Significant Incident", req: "Highly Desirable", col: "#facc15" },
            { l: "E", name: "No Safety Effect", req: "Information Only", col: "#34d399" },
          ].map(s => (
            <div key={s.l} onClick={() => setOccurrence(p => ({...p, severity: s.l}))}
              style={{ border: `2px solid ${occurrence.severity === s.l ? s.col : "#1e293b"}`, background: occurrence.severity === s.l ? `${s.col}18` : "transparent", borderRadius: 8, padding: 12, cursor: "pointer" }}>
              <div style={{fontSize:16,fontWeight:700,color:s.col}}>Level {s.l}</div>
              <div style={{fontSize:11,fontWeight:600,color:s.col,marginBottom:3}}>{s.name}</div>
              <div style={{fontSize:10,color:"#64748b"}}>{s.req}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.btnRow}>
        <div style={{fontSize:11,color:"#475569"}}>Step 1 of 5</div>
        <button style={styles.btnPrimary} onClick={() => setStep(2)}>Next: SHEL/O Analysis →</button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <div style={styles.sectionTitle}>SHEL/O Factor Identification</div>
      <p style={{fontSize:11,color:"#64748b",marginBottom:14}}>Select all contributing factors. Click to toggle — add custom factors as needed.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {Object.entries(SHELO_FACTORS).map(([cat, data]) => (
          <div key={cat} style={{background:"#0a0f1e",border:"1px solid #1e293b",borderTop:`2px solid ${data.color}`,borderRadius:8,padding:14}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{width:28,height:28,borderRadius:6,background:data.bg,color:data.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0}}>{cat}</div>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:"#e2e8f0"}}>{data.label}</div>
                <div style={{fontSize:10,color:"#64748b"}}>{data.sub}</div>
              </div>
            </div>
            <div>
              {data.items.map(item => (
                <span key={item} onClick={() => toggleFactor(cat, item)}
                  style={{display:"inline-flex",alignItems:"center",background:shelo[cat].includes(item)?"rgba(56,189,248,0.15)":"#1e293b",color:shelo[cat].includes(item)?"#38bdf8":"#94a3b8",borderRadius:4,padding:"3px 8px",fontSize:11,margin:2,cursor:"pointer"}}>
                  {item}
                </span>
              ))}
              {shelo[cat].filter(f => !data.items.includes(f)).map(f => (
                <span key={f} onClick={() => toggleFactor(cat, f)}
                  style={{display:"inline-flex",alignItems:"center",background:"rgba(56,189,248,0.15)",color:"#38bdf8",borderRadius:4,padding:"3px 8px",fontSize:11,margin:2,cursor:"pointer"}}>
                  {f} ×
                </span>
              ))}
              <div style={{display:"flex",alignItems:"center",gap:4,marginTop:6}}>
                <input style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:4,padding:"3px 8px",color:"#e2e8f0",fontSize:11,outline:"none",flex:1,fontFamily:"inherit"}}
                  placeholder="Add custom factor..." value={customFactors[cat]}
                  onChange={e => setCustomFactors(p=>({...p,[cat]:e.target.value}))}
                  onKeyDown={e => e.key==="Enter" && addCustomFactor(cat)} />
                <button onClick={() => addCustomFactor(cat)} style={{background:"none",border:"1px dashed #334155",borderRadius:4,padding:"3px 8px",fontSize:11,color:"#475569",cursor:"pointer"}}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.btnRow}>
        <button style={styles.btnSecondary} onClick={() => setStep(1)}>← Back</button>
        <button style={styles.btnPrimary} onClick={() => setStep(3)}>Next: Barrier Analysis →</button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <div style={styles.sectionTitle}>Failed Barrier Analysis</div>
      <p style={{fontSize:11,color:"#64748b",marginBottom:14}}>Click each barrier to mark as FAILED or INTACT. Add notes for each failed barrier.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {BARRIERS.map(b => (
          <div key={b.id} onClick={() => toggleBarrier(b.id)}
            style={{border:`2px solid ${barriers[b.id]==="failed"?"#ef4444":barriers[b.id]==="intact"?"#34d399":"#1e293b"}`,background:barriers[b.id]==="failed"?"rgba(239,68,68,0.08)":barriers[b.id]==="intact"?"rgba(52,211,153,0.08)":"transparent",borderRadius:8,padding:12,cursor:"pointer"}}>
            <div style={{fontSize:20,marginBottom:6}}>{b.icon}</div>
            <div style={{fontSize:12,fontWeight:700,color:"#e2e8f0",marginBottom:3}}>{b.name}</div>
            <div style={{fontSize:10,color:"#64748b",marginBottom:8}}>{b.desc}</div>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:1,color:barriers[b.id]==="failed"?"#ef4444":barriers[b.id]==="intact"?"#34d399":"#475569"}}>
              {barriers[b.id]==="failed"?"⚠ FAILED":barriers[b.id]==="intact"?"✓ INTACT":"○ NOT ASSESSED"}
            </div>
          </div>
        ))}
      </div>
      {failedBarriers.length > 0 && (
        <div style={{marginTop:16}}>
          <div style={{fontSize:11,color:"#ef4444",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>Failed Barrier Notes</div>
          {failedBarriers.map(b => (
            <div key={b.id} style={{marginBottom:8}}>
              <div style={{fontSize:11,color:"#ef4444",marginBottom:4}}>{b.icon} {b.name}</div>
              <textarea style={styles.textarea} placeholder={`Why did ${b.name} fail?`}
                value={barrierNotes[b.id]||""} onChange={e => setBarrierNotes(p=>({...p,[b.id]:e.target.value}))} />
            </div>
          ))}
        </div>
      )}
      <div style={styles.btnRow}>
        <button style={styles.btnSecondary} onClick={() => setStep(2)}>← Back</button>
        <button style={styles.btnPrimary} onClick={() => setStep(4)}>Next: SMARTER Recs →</button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div>
      <div style={styles.sectionTitle}>SMARTER Recommendations</div>
      <p style={{fontSize:11,color:"#64748b",marginBottom:14}}>Create Specific, Measurable, Achievable, Relevant, Time-bound, Evaluated and Reviewed actions.</p>
      {recs.map((rec, idx) => (
        <div key={rec.id} style={{background:"#0a0f1e",border:"1px solid #1e293b",borderRadius:8,padding:14,marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:12,fontWeight:700,color:"#94a3b8"}}>Recommendation {idx+1}</div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <select style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:4,padding:"4px 8px",color:"#94a3b8",fontSize:11,outline:"none",fontFamily:"inherit"}}
                value={rec.barrier} onChange={e => updateRec(rec.id,"barrier",e.target.value)}>
                <option value="">Link to barrier...</option>
                {failedBarriers.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                <option value="shelo">SHEL/O Factor</option>
                <option value="general">General</option>
              </select>
              <button onClick={() => deleteRec(rec.id)} style={{background:"none",border:"none",color:"#475569",cursor:"pointer",fontSize:16,padding:"2px 6px"}}>✕</button>
            </div>
          </div>
          <div style={styles.fieldGroup}>
            <div style={styles.fieldLabel}>Action Description</div>
            <textarea style={{...styles.textarea,minHeight:50}} placeholder="Describe the recommended action..."
              value={rec.action} onChange={e => updateRec(rec.id,"action",e.target.value)} />
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[["S","What specifically needs to be done?"],["M","How will success be measured?"],["A","Is this realistically achievable?"],["R","How does this address the root cause?"],["T","What is the target completion date?"],["E2","How will effectiveness be evaluated?"],["R2","When and how will it be reviewed?"]].map(([k,ph]) => (
              <div key={k} style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:6,padding:8}}>
                <div style={{fontSize:9,color:"#38bdf8",letterSpacing:1.5,textTransform:"uppercase",fontWeight:700,marginBottom:4}}>{k==="E2"?"E":k==="R2"?"R (Review)":k}</div>
                <textarea style={{width:"100%",background:"none",border:"none",color:"#e2e8f0",fontSize:11,fontFamily:"inherit",outline:"none",resize:"none",minHeight:40}} rows={2}
                  placeholder={ph} value={rec[k]||""} onChange={e => updateRec(rec.id,k,e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={addRec} style={{width:"100%",background:"none",border:"1px dashed #334155",borderRadius:8,padding:10,color:"#475569",fontSize:12,cursor:"pointer",fontFamily:"inherit",marginBottom:4}}>
        + Add Recommendation
      </button>
      <div style={styles.btnRow}>
        <button style={styles.btnSecondary} onClick={() => setStep(3)}>← Back</button>
        <button style={styles.btnSuccess} onClick={() => setStep(5)}>Generate Report →</button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div>
      <div style={styles.sectionTitle}>SOAM Investigation Report</div>
      <div style={{background:"#0a0f1e",border:"1px solid #1e293b",borderRadius:8,padding:16,marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <div>
            <div style={{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:1.5,marginBottom:4}}>Occurrence</div>
            <div style={{fontSize:18,fontWeight:700,color:"#f1f5f9",marginBottom:4}}>{occurrence.title||"Untitled"}</div>
            <div style={{fontSize:11,color:"#64748b"}}>{occurrence.date} · {occurrence.dept} · Investigator: {occurrence.investigator||"—"}</div>
          </div>
          {occurrence.severity && (
            <span style={{display:"inline-flex",alignItems:"center",padding:"4px 12px",borderRadius:20,fontSize:10,fontWeight:700,letterSpacing:1,background:`rgba(${occurrence.severity==="A"?"220,38,38":occurrence.severity==="B"?"239,68,68":occurrence.severity==="C"?"249,115,22":occurrence.severity==="D"?"250,204,21":"52,211,153"},0.15)`,color:occurrence.severity==="A"?"#dc2626":occurrence.severity==="B"?"#ef4444":occurrence.severity==="C"?"#f97316":occurrence.severity==="D"?"#facc15":"#34d399",border:`1px solid rgba(${occurrence.severity==="A"?"220,38,38":occurrence.severity==="B"?"239,68,68":occurrence.severity==="C"?"249,115,22":occurrence.severity==="D"?"250,204,21":"52,211,153"},0.3)`}}>
              LEVEL {occurrence.severity}
            </span>
          )}
        </div>
        <div style={{fontSize:10,color:"#64748b",marginBottom:4}}>Description</div>
        <div style={{fontSize:12,color:"#e2e8f0",lineHeight:1.6}}>{occurrence.description||"—"}</div>
      </div>
      <div style={{background:"#0a0f1e",border:"1px solid #1e293b",borderRadius:8,padding:16,marginBottom:14}}>
        <div style={{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:1.5,marginBottom:10}}>SHEL/O Contributing Factors</div>
        {Object.entries(SHELO_FACTORS).map(([cat, data]) => shelo[cat].length > 0 && (
          <div key={cat} style={{marginBottom:8}}>
            <div style={{fontSize:11,fontWeight:700,color:data.color,marginBottom:4}}>{cat} — {data.label}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {shelo[cat].map(f => <span key={f} style={{background:"#1e293b",borderRadius:4,padding:"2px 8px",fontSize:11,color:"#94a3b8"}}>{f}</span>)}
            </div>
          </div>
        ))}
        {Object.values(shelo).every(v => v.length===0) && <div style={{fontSize:12,color:"#475569"}}>No factors identified</div>}
      </div>
      <div style={{background:"#0a0f1e",border:"1px solid #1e293b",borderRadius:8,padding:16,marginBottom:14}}>
        <div style={{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:1.5,marginBottom:10}}>Barrier Analysis</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {BARRIERS.map(b => barriers[b.id] && (
            <div key={b.id} style={{background:barriers[b.id]==="failed"?"rgba(239,68,68,0.1)":"rgba(52,211,153,0.1)",border:`1px solid ${barriers[b.id]==="failed"?"#ef444433":"#34d39933"}`,borderRadius:6,padding:"6px 12px",fontSize:11}}>
              <span style={{fontWeight:700,color:barriers[b.id]==="failed"?"#ef4444":"#34d399"}}>{b.icon} {b.name}</span>
              {barriers[b.id]==="failed" && barrierNotes[b.id] && <div style={{color:"#94a3b8",marginTop:3,fontSize:10}}>{barrierNotes[b.id]}</div>}
            </div>
          ))}
        </div>
      </div>
      <div style={{background:"#0a0f1e",border:"1px solid #1e293b",borderRadius:8,padding:16,marginBottom:14}}>
        <div style={{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:1.5,marginBottom:10}}>SMARTER Recommendations ({recs.filter(r=>r.action).length})</div>
        {recs.filter(r=>r.action).map((rec,idx) => (
          <div key={rec.id} style={{borderLeft:"3px solid #0ea5e9",paddingLeft:12,marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:700,color:"#e2e8f0",marginBottom:4}}>#{idx+1} {rec.action}</div>
            {rec.barrier && <div style={{fontSize:10,color:"#64748b",marginBottom:6}}>Addresses: {BARRIERS.find(b=>b.id===rec.barrier)?.name||rec.barrier}</div>}
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {[["S",rec.S],["M",rec.M],["A",rec.A],["R",rec.R],["T",rec.T],["E",rec.E2],["Review",rec.R2]].filter(([,v])=>v).map(([k,v])=>(
                <div key={k} style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:4,padding:"3px 8px",fontSize:10}}>
                  <span style={{color:"#38bdf8",fontWeight:700}}>{k}: </span><span style={{color:"#94a3b8"}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={styles.btnRow}>
        <button style={styles.btnSecondary} onClick={() => setStep(4)}>← Back</button>
        <button style={styles.btnPrimary} onClick={() => window.print()}>Print / Export PDF</button>
      </div>
      <div style={{marginTop:20,padding:"12px 16px",background:"#0a0f1e",border:"1px solid #1e293b",borderRadius:8,borderLeft:"3px solid #334155"}}>
        <div style={{fontSize:9,color:"#475569",textTransform:"uppercase",letterSpacing:1.5,marginBottom:4}}>Source Reference</div>
        <div style={{fontSize:11,color:"#64748b",lineHeight:1.6}}>Data source: Quick Reference Guide V2</div>
        <div style={{fontSize:11,color:"#64748b",lineHeight:1.6}}>SOAM QRG Systemic Occurrence Analysis Methodology</div>
        <div style={{fontSize:11,color:"#64748b",lineHeight:1.6}}>EUROCONTROL</div>
      </div>
    </div>
  );

  return (
    <div style={styles.app}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap'); * { box-sizing: border-box; } input:focus, textarea:focus, select:focus { border-color: #38bdf8 !important; }`}</style>
      <div style={styles.header}>
        <img src={LOGO} alt="Weston Airport" style={{height:48,width:"auto",borderRadius:6}} />
        <div>
          <div style={{fontSize:18,fontWeight:700,letterSpacing:2,color:"#f1f5f9",textTransform:"uppercase"}}>SOAM Investigation Tool</div>
          <div style={{fontSize:10,color:"#64748b",letterSpacing:3,textTransform:"uppercase"}}>Weston Airport · Safety Analysis</div>
        </div>
      </div>
      <div style={styles.progressBar}>
        <div style={{height:"100%",background:"linear-gradient(90deg,#0ea5e9,#6366f1)",transition:"width 0.3s",width:`${(step/5)*100}%`}} />
      </div>
      <div style={styles.layout}>
        <div style={styles.sidebar}>
          {STEPS.map((s, idx) => (
            <button key={s.id} onClick={() => setStep(s.id)}
              style={{width:"100%",textAlign:"left",padding:"10px 16px",background:step===s.id?"#1e3a5f":"none",borderRight:step===s.id?"2px solid #38bdf8":"2px solid transparent",border:"none",borderLeft:"none",borderTop:"none",borderBottom:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:10,fontFamily:"inherit"}}>
              <div style={{width:22,height:22,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0,background:completedSteps[idx]?"#34d399":step===s.id?"#38bdf8":"#1e293b",color:completedSteps[idx]||step===s.id?"#0f172a":"#64748b"}}>
                {completedSteps[idx] ? "✓" : s.id}
              </div>
              <div style={{fontSize:11,color:step===s.id?"#e2e8f0":"#94a3b8",fontWeight:600,letterSpacing:0.5}}>{s.label}</div>
            </button>
          ))}
        </div>
        <div style={styles.content}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
        </div>
      </div>
    </div>
  );
}
