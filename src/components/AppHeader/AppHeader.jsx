import { Layout, Select, Space } from 'antd';
import React from "react";
import logo from "../../assets/logo.jpeg";
import { useTranslation } from "../../contexts/LanguageContext";
import "./app-header.css";

const { Header } = Layout;

export const AppHeader = () => {
    const { translate, language, changeLanguage } = useTranslation();

    return (
        <>
            <Header className="app-header-title">
                <Space>
                    <img src={logo} alt="NutriCalc Logo" className="app-logo" />
                    <h1>{translate('app.title')}</h1>
                    <Select
                        className="app-header-language-select"
                        value={language}
                        onChange={changeLanguage}
                    >
                        <Select.Option value="en">English</Select.Option>
                        <Select.Option value="he">עברית</Select.Option>
                    </Select>
                </Space>
            </Header>
        </>
    )
}