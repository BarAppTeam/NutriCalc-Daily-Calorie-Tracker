import React from "react";
import { Layout } from "antd";
import { useTranslation } from "../../contexts/LanguageContext";
import "./app-footer.css"

const { Footer } = Layout;

export const AppFooter = () => {
    const { translate } = useTranslation();

    return (
        <Footer className="app-footer">
            {translate('app.footer').replace('{year}', new Date().getFullYear())}
        </Footer>
    )
}