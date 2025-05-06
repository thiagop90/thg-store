export function WrapperProduct({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-4 pb-6 min-[550px]:mx-0">
      <div className="grid grid-cols-1 overflow-hidden rounded-xl border-l border-t min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {children}
      </div>
    </div>
  )
}
