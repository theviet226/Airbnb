import css from "./admin-header.module.scss"

function AdminHeader() {
    return (
        <div>
            <header className={css["header-admin"]}>
                <div className={css["navbar-header"]}>
                    <div className={css["header-content"]}>
                        <form className={css["form"]}>
                            <div className={css["header-search"]}>
                                <input type="text" className={css["form-control"]} placeholder="Search..." />
                                <span className="bx bx-search icon-sm"></span>
                            </div>
                        </form>

                    </div>

                </div>
                <div>
                    <button type="button" className="btn">
                        <img id="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg/230px-Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg.png"
                            height="16" />
                    </button>
                    <div className={css["dropdown"]}>
                       <img src="" alt="img" />
                       <span>Mai Thế Việt</span>

                    </div>
                </div>


            </header>
        </div>
    )
}

export default AdminHeader