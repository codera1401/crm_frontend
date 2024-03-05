import React from "react";
import {NavbarDataForAdmin} from "../components/NavbarData";

const Menu = () => {
    return (
        <>
            <div className="container">
                <div className={"grid-container"}>
                    <div className={"block-container"}>
                        {
                            NavbarDataForAdmin.map((item) => {
                                return (
                                    <a key={item.path} href={item.path} className={"grid-item"}>
                                        {item.icon}
                                        <p>{item.title}</p>
                                    </a>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menu;
