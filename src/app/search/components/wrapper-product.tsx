export function WrapperProduct({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-4 pb-6 sm:mx-auto">
      <div className="grid grid-cols-2 overflow-hidden border-l border-t sm:grid-cols-3 sm:rounded-xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {children}
      </div>
    </div>
  )
}
