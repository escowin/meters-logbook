import { useEffect } from "react";

function Page404({ setMain }) {
    useEffect(() => setMain("error"), [setMain])

    return (
        <section>404 Page not found</section>
    )
}

export default Page404;