import React, { useState } from "react";
import axios from "axios";
import InputSection from "./components/InputSection";
import Dashboard from "./components/Dashboard";
import NewsSection from "./components/NewsSection";
import "./App.css";
function App() {
  const [skillsData, setSkillsData] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);

  const analyzeHandler = async (roleName, skillInput) => {
    setBusy(true);
    setNotice(null);
    setSkillsData(null);
    setPlanData(null);

    try {
      const gap = await axios.post(
        "https://code-at-random-intern-assignment.vercel.app/api/skill-gap",
        {
          targetRole: roleName,
          currentSkills: skillInput,
        }
      );

      const roadmap = await axios.post(
        "https://code-at-random-intern-assignment.vercel.app/api/roadmap",
        {
          targetRole: roleName,
        }
      );

      setSkillsData(gap.data);
      setPlanData(roadmap.data);
    } catch (err) {
      console.error(err);
      setNotice(
        "Could not reach the server. Make sure the backend is running and the role name is valid."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page-root">
      <div className="container">
        <header className="topbar">
          <div className="title-area">
            <h1 className="main-title">Career Toolkit</h1>
            <p className="tagline">
              Quick check of your skills and a three-step plan to move forward
            </p>
          </div>

          <div className="status-area">
            <span className={`pill ${busy ? "pill-busy" : "pill-ready"}`}>
              {busy ? "Working" : "Idle"}
            </span>
          </div>
        </header>

        <main>
          <section className="input-wrap panel">
            <InputSection onAnalyze={analyzeHandler} isLoading={busy} />
          </section>

          {notice && (
            <div className="message message-error" role="alert">
              {notice}
            </div>
          )}

          <section className="grid-two">
            <div className="panel">
              <h2 className="panel-heading">Skill Report</h2>
              <Dashboard
                gapResults={skillsData}
                roadmapResults={null}
                compact
              />
            </div>

            <div className="panel">
              <h2 className="panel-heading">Plan</h2>
              <Dashboard gapResults={null} roadmapResults={planData} compact />
            </div>
          </section>

          <section className="panel news-panel">
            <h2 className="panel-heading">Tech Headlines</h2>
            <NewsSection />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
