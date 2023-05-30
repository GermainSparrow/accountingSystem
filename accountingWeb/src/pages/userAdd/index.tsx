import { FC, useState, useEffect } from "react";
import { UseFetch, CachePolicies, useFetch } from "use-http";
import {
    Card, Spin
} from 'antd'
export const UserAdd: FC = () => {
    const { post, loading } = useFetch('', { cache: CachePolicies.NO_CACHE })
    useEffect(() => {

    }, [])
    return (
        <Spin spinning={loading}>
            <Card>use-Add</Card>
        </Spin>
    );
}

