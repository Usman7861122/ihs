/**
 * Very soft, slowly moving colour glow for light sections. Put it first inside a
 * `relative overflow-clip` section; the section's content needs `relative` to sit above it.
 */
export default function Aurora() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="aurora-blob aurora-a -top-[10%] -left-[8%] h-[560px] w-[680px] bg-[rgba(201,111,58,0.16)]" />
      <div className="aurora-blob aurora-b top-[18%] -right-[10%] h-[620px] w-[720px] bg-[rgba(244,176,120,0.22)]" />
      <div className="aurora-blob aurora-c -bottom-[14%] left-[30%] h-[520px] w-[640px] bg-[rgba(238,130,110,0.11)]" />
    </div>
  );
}
