import NavBar from "./navbar/navbar";

export default function Layout({children}) {
    return (
        <>
            <NavBar></NavBar>
            <div>
                {children}
            </div>
        </>
    );
}