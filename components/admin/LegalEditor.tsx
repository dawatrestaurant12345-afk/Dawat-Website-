"use client";

import { useEffect, useState } from "react";
import { loadContent, saveContent } from "@/lib/admin";
import { DEFAULT_PRIVACY, DEFAULT_TERMS, LEGAL_KEYS, type LegalDoc, type LegalSection } from "@/lib/legal";
import { mergeWithDefaults } from "@/lib/site";
import { Field, Panel, SaveBar, useToast, useUnsavedWarning } from "./ui";

type Which = keyof typeof LEGAL_KEYS;

const DOCS: { id: Which; label: string; path: string; defaults: LegalDoc }[] = [
  { id: "privacy", label: "Privacy Policy", path: "/privacy-policy", defaults: DEFAULT_PRIVACY },
  { id: "terms", label: "Terms & Conditions", path: "/terms-and-conditions", defaults: DEFAULT_TERMS },
];

const todayLabel = () =>
  new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** Admin tab for editing the Privacy Policy and Terms & Conditions pages. */
export default function LegalEditor() {
  const [which, setWhich] = useState<Which>("privacy");
  const [dirty, setDirty] = useState(false);

  const switchTo = (id: Which) => {
    if (id === which) return;
    if (dirty && !window.confirm("You have unsaved changes. Discard them?")) return;
    setDirty(false);
    setWhich(id);
  };

  const doc = DOCS.find((d) => d.id === which)!;

  return (
    <div className="admin-stack">
      <div className="admin-page-head is-split">
        <div>
          <h1>Legal Pages</h1>
          <p>Edit the Privacy Policy and Terms &amp; Conditions shown on the website.</p>
        </div>
        <div className="admin-seg" role="tablist" aria-label="Choose page">
          {DOCS.map((d) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={which === d.id}
              className={`admin-seg-btn${which === d.id ? " is-active" : ""}`}
              onClick={() => switchTo(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* key: remount (and reload) when switching documents */}
      <DocEditor key={doc.id} which={doc.id} path={doc.path} defaults={doc.defaults} onDirtyChange={setDirty} />
    </div>
  );
}

function DocEditor({
  which,
  path,
  defaults,
  onDirtyChange,
}: {
  which: Which;
  path: string;
  defaults: LegalDoc;
  onDirtyChange: (dirty: boolean) => void;
}) {
  const toast = useToast();
  const [saved, setSaved] = useState<LegalDoc | null>(null);
  const [form, setForm] = useState<LegalDoc | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent(LEGAL_KEYS[which])
      .then((value) => {
        const merged = mergeWithDefaults(defaults, value);
        setSaved(merged);
        setForm(merged);
      })
      .catch((err: Error) => toast.show("error", `Could not load: ${err.message}`));
  }, [which, defaults, toast.show]);

  const dirty = Boolean(form && saved && JSON.stringify(form) !== JSON.stringify(saved));
  useUnsavedWarning(dirty);
  useEffect(() => onDirtyChange(dirty), [dirty, onDirtyChange]);

  if (!form) return <p className="admin-muted">Loading…</p>;

  const update = (patch: Partial<LegalDoc>) => setForm((prev) => ({ ...prev!, ...patch }));

  const setSection = (i: number, patch: Partial<LegalSection>) =>
    update({ sections: form.sections.map((s, j) => (j === i ? { ...s, ...patch } : s)) });

  const moveSection = (i: number, dir: -1 | 1) => {
    const next = [...form.sections];
    if (!next[i + dir]) return;
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    update({ sections: next });
  };

  const save = async () => {
    const clean: LegalDoc = {
      title: form.title.trim() || defaults.title,
      updated: form.updated.trim(),
      intro: form.intro.trim(),
      sections: form.sections
        .map((s) => ({ heading: s.heading.trim(), body: s.body.trim() }))
        .filter((s) => s.heading || s.body),
    };
    if (!clean.sections.length) return toast.show("error", "Add at least one section.");
    if (clean.sections.some((s) => !s.heading)) return toast.show("error", "Every section needs a heading.");

    setSaving(true);
    const error = await saveContent(LEGAL_KEYS[which], clean);
    setSaving(false);
    if (error) return toast.show("error", `Could not save: ${error}`);
    setSaved(clean);
    setForm(clean);
    toast.show("success", `${clean.title} saved. The website is updated.`);
  };

  const resetToDefault = () => {
    if (!window.confirm("Replace this page with the original default text? (You still need to click Save.)")) return;
    setForm({ ...defaults, updated: todayLabel() });
  };

  return (
    <>
      <Panel title="Page details">
        <div className="admin-grid">
          <Field label="Page title">
            <input value={form.title} onChange={(e) => update({ title: e.target.value })} />
          </Field>
          <Field label="Last updated" hint="Shown at the top of the page.">
            <div className="admin-inline">
              <input value={form.updated} onChange={(e) => update({ updated: e.target.value })} />
              <button type="button" className="admin-btn is-ghost is-small" onClick={() => update({ updated: todayLabel() })}>
                Today
              </button>
            </div>
          </Field>
          <Field label="Introduction" wide>
            <textarea rows={3} value={form.intro} onChange={(e) => update({ intro: e.target.value })} />
          </Field>
          <div className="admin-field is-wide admin-inline">
            <a href={path} target="_blank" rel="noopener noreferrer" className="admin-link-btn">
              View page on website ↗
            </a>
            <button type="button" className="admin-link-btn" onClick={resetToDefault}>
              Restore default text
            </button>
          </div>
        </div>
      </Panel>

      <Panel
        title="Sections"
        description="Leave a blank line between paragraphs. Start lines with • to make a bullet list."
      >
        <div className="admin-stack is-tight">
          {form.sections.map((s, i) => (
            <div key={i} className="admin-legal-section">
              <div className="admin-legal-head">
                <span className="admin-legal-num">{i + 1}</span>
                <input
                  aria-label={`Section ${i + 1} heading`}
                  placeholder="Section heading"
                  value={s.heading}
                  onChange={(e) => setSection(i, { heading: e.target.value })}
                />
                <div className="admin-item-actions">
                  <button type="button" aria-label="Move section up" onClick={() => moveSection(i, -1)} disabled={i === 0}>
                    ↑
                  </button>
                  <button
                    type="button"
                    aria-label="Move section down"
                    onClick={() => moveSection(i, 1)}
                    disabled={i === form.sections.length - 1}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    aria-label="Delete section"
                    className="is-danger"
                    onClick={() => {
                      if (window.confirm(`Delete the section “${s.heading || "untitled"}”?`))
                        update({ sections: form.sections.filter((_, j) => j !== i) });
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
              <textarea
                aria-label={`Section ${i + 1} text`}
                rows={Math.min(14, Math.max(4, s.body.split("\n").length + 1))}
                value={s.body}
                onChange={(e) => setSection(i, { body: e.target.value })}
              />
            </div>
          ))}

          <button
            type="button"
            className="admin-btn is-ghost is-small"
            onClick={() => update({ sections: [...form.sections, { heading: "", body: "" }] })}
          >
            + Add section
          </button>
        </div>
      </Panel>

      <SaveBar dirty={dirty} saving={saving} onSave={save} onReset={() => setForm(saved)} />
      {toast.view}
    </>
  );
}
