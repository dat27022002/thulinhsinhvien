function DefaultLayout({ children }) {
    return (
        <div>
            <div>
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
