import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from '../../components/layout/Layout'

export default function HomeTemplate() {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}
