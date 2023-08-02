import Button from '@mui/material/Button';

export const UserPage = () => {
    const viewAllDocument = () => {
        console.log("all documents");
    }
    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <div className="row">
                <div className="col-md-8">
                    <button onClick={viewAllDocument}>View All Documents</button>
                </div>
            </div>
            <Button
                variant={"contained"}
                onClick={() => {
                    localStorage.setItem("token", null);
                    window.location = "/";
                }}
            > Logout </Button>
        </div>
    )
}