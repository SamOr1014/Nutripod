export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto h-screen rounded-2xl border border-slate-800 p-5">
      {children}
    </div>
  )
}
