export function WrapperProduct({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-4 pb-6 min-[550px]:mx-auto">
      <div className="grid grid-cols-2 overflow-hidden border-l border-t min-[550px]:rounded-xl sm:grid-cols-3 xl:grid-cols-4">
        {children}
      </div>
    </div>
  )
}
