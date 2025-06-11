const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="px-4 py-8 max-w-5xl mx-auto space-y-6">{children}</div>
}

export default LayoutWrapper
