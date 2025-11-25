import React, { useState, useRef } from "react";

export default function Technology() {
  const [tech, setTech] = useState(null); // 'FDM' or 'SLA'
  const [material, setMaterial] = useState(null);
  const [color, setColor] = useState(null);
  const [file, setFile] = useState(null);
  const [verified, setVerified] = useState(false);
  const fileRef = useRef(null);

  const fdmMaterials = ["PLA", "ABT", "TPN", "DEN"];
  const colors = [
    "#111827",
    "#0ea5e9",
    "#ef4444",
    "#f59e0b",
    "#10b981",
    "#8b5cf6",
  ];

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const name = f.name.toLowerCase();
    if (!name.endsWith(".stl")) {
      alert("Please upload an STL file (.stl)");
      e.target.value = "";
      return;
    }
    setFile(f);
    setVerified(false);
  }

  function resetSelections() {
    setMaterial(null);
    setColor(null);
    setFile(null);
    setVerified(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  function onSelectTech(t) {
    if (t !== tech) {
      setTech(t);
      resetSelections();
    }
  }

  const canVerify = () => {
    if (!tech) return false;
    if (tech === "FDM" && !material) return false;
    if (!color) return false;
    if (!file) return false;
    return true;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-black text-slate-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold">Choose Technology & Upload</h1>
          <p className="text-slate-400 mt-2">
            Select technology, material (FDM), color, upload STL and verify
            design.
          </p>
        </header>

        {/* Tech Selector */}
        <section className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">1. Select Technology</h2>
          <div className="flex gap-4">
            <button
              onClick={() => onSelectTech("FDM")}
              className={`px-5 py-3 rounded-xl font-semibold transition ${
                tech === "FDM"
                  ? "bg-white text-slate-900 border-transparent"
                  : "bg-slate-700/60 text-slate-200 border-slate-600"
              }`}
            >
              FDM
            </button>
            <button
              onClick={() => onSelectTech("SLA")}
              className={`px-5 py-3 rounded-xl font-semibold transition ${
                tech === "SLA"
                  ? "bg-white text-slate-900 border-transparent"
                  : "bg-slate-700/60 text-slate-200 border-slate-600"
              }`}
            >
              SLA
            </button>
          </div>
        </section>

        {/* Material (FDM) */}
        {tech === "FDM" && (
          <section className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">
              2. Choose Material (FDM)
            </h2>
            <div className="flex flex-wrap gap-3">
              {fdmMaterials.map((m) => (
                <button
                  key={m}
                  onClick={() => setMaterial(m)}
                  className={`px-4 py-2 rounded-lg border font-medium ${
                    material === m
                      ? "bg-white text-slate-900 border-transparent"
                      : "bg-slate-700/60 text-slate-200 border-slate-600"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Color Picker */}
        {tech && (
          <section className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">3. Pick a Color</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex gap-3 items-center">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    aria-label={`color-${c}`}
                    className={`w-10 h-10 rounded-full border-2 ${
                      color === c ? "border-white" : "border-slate-700"
                    }`}
                    style={{ background: c }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm text-slate-400">
                  Or choose any color:
                </label>
                <input
                  type="color"
                  value={color || "#0ea5e9"}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-10 p-0 border-0 rounded-full"
                  aria-label="custom-color"
                />
                <div className="ml-3 text-sm text-slate-300">
                  {color ? (
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ background: color }}
                      />
                      {color}
                    </span>
                  ) : (
                    "No color selected"
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* File Upload */}
        {tech && (
          <section className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">4. Upload STL File</h2>
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="px-4 py-2 bg-white text-black rounded-md font-medium shadow hover:shadow-lg"
                >
                  Choose STL File
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".stl"
                  onChange={handleFile}
                  className="hidden"
                />
              </div>

              <div className="text-sm text-slate-300">
                {file ? file.name : "No file uploaded"}
              </div>

              {file && (
                <button
                  onClick={() => {
                    setFile(null);
                    if (fileRef.current) fileRef.current.value = "";
                    setVerified(false);
                  }}
                  className="ml-auto md:ml-0 px-3 py-2 bg-slate-700 rounded-md text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Preview area (simple placeholder) */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-slate-900/50 rounded-lg border border-slate-700 p-4 h-48 flex items-center justify-center">
                {file ? (
                  <div className="text-center">
                    <div className="text-sm text-slate-300 mb-2">
                      Preview (basic)
                    </div>
                    <div className="text-xs text-slate-400">
                      Filename: {file.name}
                    </div>
                    <div className="mt-4 text-xs text-slate-400">
                      3D preview integration (model-viewer / three.js) can be
                      added later.
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-500">
                    Choose an STL to see a preview
                  </div>
                )}
              </div>

              <div className="bg-slate-900/40 rounded-lg border border-slate-700 p-4 h-48 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold">Selected</h4>
                  <p className="text-xs text-slate-400 mt-2">
                    Technology: {tech || "—"}
                  </p>
                  <p className="text-xs text-slate-400">
                    Material: {material || "—"}
                  </p>
                  <p className="text-xs text-slate-400">
                    Color:{" "}
                    {color ? (
                      <span
                        className="inline-block w-3 h-3 rounded-full align-middle mr-2"
                        style={{ background: color }}
                      />
                    ) : (
                      "—"
                    )}
                    {color || ""}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setVerified(canVerify())}
                    disabled={!canVerify()}
                    className={`w-full py-2 rounded-md text-sm font-semibold ${
                      canVerify()
                        ? "bg-linear-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-slate-700 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    Verify Design
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Final action */}
        <section className="text-center">
          <button
            disabled={!verified}
            className={`px-8 py-3 rounded-full font-semibold ${
              verified
                ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            Go to Next
          </button>
        </section>
      </div>
    </div>
  );
}
