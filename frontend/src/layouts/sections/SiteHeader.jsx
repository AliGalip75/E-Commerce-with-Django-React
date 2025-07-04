const SiteHeader = ({children}) => {
    return <header className="bg-white dark:bg-zinc-900 shadow-md sticky top-0 z-[100]">{children}</header>;
}

export default SiteHeader;