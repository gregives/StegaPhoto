const Flow = (props) => (
    <section className="relative">
        <div className="absolute pt-32 w-full bg-gradient-to-b from-blue-900 to-gray-800 opacity-50"></div>
        <div className="relative pt-16 container mx-auto px-8">
            {props.children}
        </div>
    </section>
)

export default Flow
