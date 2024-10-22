'use client'
import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface UserData {
    [key: string]: string
}

const fetchUsers = async (): Promise<UserData[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export default function User() {
    console.log('test env', process.env.NEXT_PUBLIC_TEST)
    console.log('env', process.env.NODE_ENV)
    const { data, error, isLoading } = useQuery({
        queryKey: ["fetchUsers"],
        queryFn: () => fetchUsers()
    })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {data?.map((user: UserData) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};


