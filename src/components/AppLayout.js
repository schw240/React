import React from 'react';
import { Menu } from 'antd';

export default function AppLayout({children}) {
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home">홈</Menu.Item>
                <Menu.Item key="Students">학생</Menu.Item>
                <Menu.Item key="Scores">점수</Menu.Item>
            </Menu>
            {children}
        </div>
    );
}