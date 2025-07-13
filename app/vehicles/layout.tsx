export default function Layout({ children, modal }: {
    children: React.ReactNode
    modal: React.ReactNode
}) {
    return (
        <div className="max-w-screen-lg mx-auto px-2 py-10">
            {children}
            {modal}
        </div>
    )
}